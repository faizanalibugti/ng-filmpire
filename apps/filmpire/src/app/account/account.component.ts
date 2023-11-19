import { Component, OnInit } from '@angular/core';
import { ProfileData } from '@ng-filmpire/api-interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authAction } from '../+state/auth/auth.actions';
import { selectProfileData } from '../+state/profile/profile.selectors';

@Component({
  selector: 'ng-filmpire-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  profileData$!: Observable<ProfileData>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.profileData$ = this.store.select(selectProfileData);
  }

  logout() {
    this.store.dispatch(authAction.logout());
  }
}
