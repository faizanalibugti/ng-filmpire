import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonDetails } from '@ng-filmpire/api-interfaces';
import { PersonHttpService } from '@ng-filmpire/core-data';
import { Observable, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'ng-filmpire-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  actorDetails$!: Observable<PersonDetails>;

  constructor(
    private personHttp: PersonHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actorDetails$ = this.route.params.pipe(
      filter(({ id }) => !!id),
      map(({ id }) => Number(id)),
      switchMap((id: number) => this.personHttp.getPersonDetails(id)),
      map((personDetails) => ({
        ...personDetails,
        age: this.calculateAge(personDetails.birthday),
      }))
    );
  }

  // Calculate actor's age
  calculateAge(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    return today.getFullYear() - birthDate.getFullYear();
  }
}
