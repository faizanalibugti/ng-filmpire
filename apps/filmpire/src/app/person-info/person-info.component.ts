import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Cast, PersonDetails } from '@ng-filmpire/api-interfaces';
import { PersonHttpService } from '@ng-filmpire/core-data';
import { Observable, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'ng-filmpire-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonInfoComponent implements OnInit {
  actorDetails$!: Observable<PersonDetails>;

  constructor(
    private personHttp: PersonHttpService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.actorDetails$ = this.route.params.pipe(
      filter(({ id }) => !!id),
      map(({ id }) => Number(id)),
      switchMap((id: number) => this.personHttp.getPersonDetails(id)),
      map((personDetails) => ({
        ...personDetails,
        age: this.calculateAge(personDetails.birthday),
        movie_credits: {
          ...personDetails.movie_credits,
          cast: this.removeDuplicates(
            personDetails.movie_credits.cast,
            'id'
          ).sort(this.sortMediaByReleaseDate),
        },
        tv_credits: {
          ...personDetails.tv_credits,
          cast: this.removeDuplicates(personDetails.tv_credits.cast, 'id').sort(
            this.sortMediaByReleaseDate
          ),
        },
      }))
    );
  }

  removeDuplicates<T, K extends keyof T>(arr: T[], property: K): T[] {
    const uniqueMap = new Map<T[K], T>();

    for (const item of arr) {
      // Use the specified property as the key in the Map
      uniqueMap.set(item[property], item);
    }

    return Array.from(uniqueMap.values());
  }

  // Calculate actor's age
  calculateAge(birthday: string) {
    const today = new Date();
    const birthDate = new Date(birthday);
    return today.getFullYear() - birthDate.getFullYear();
  }

  navigateToPreviousPage() {
    this.location.back();
  }

  sortMediaByReleaseDate(mediaA: Cast, mediaB: Cast) {
    const dateA = mediaA.release_date || mediaA.first_air_date;
    const dateB = mediaB.release_date || mediaB.first_air_date;

    // Handle media without release dates
    if (!dateA && !dateB) {
      return 0; // Both media items are missing release dates
    } else if (!dateA) {
      return -1; // mediaA (no release date) comes before mediaB
    } else if (!dateB) {
      return 1; // mediaB (no release date) comes before mediaA
    }

    // Convert date strings to Date objects
    const dateObjA = new Date(dateA);
    const dateObjB = new Date(dateB);

    // Compare dates in descending order
    if (dateObjA > dateObjB) {
      return -1; // mediaA comes before mediaB
    } else if (dateObjA < dateObjB) {
      return 1; // mediaA comes after mediaB
    } else {
      return 0; // dates are equal
    }
  }
}
