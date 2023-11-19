import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersonInfoPage } from '../+state/person-info/models/person-info.model';
import { selectPersonInfoPage } from '../+state/person-info/views/person-info-view.selectors';

@Component({
  selector: 'ng-filmpire-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonInfoComponent implements OnInit {
  actorDetailsPage$!: Observable<PersonInfoPage>;

  constructor(private store: Store, private location: Location) {}

  ngOnInit(): void {
    this.actorDetailsPage$ = this.store.select(selectPersonInfoPage);
  }

  navigateToPreviousPage() {
    this.location.back();
  }
}
