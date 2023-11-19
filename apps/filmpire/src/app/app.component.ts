import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SelectedMedia } from '@ng-filmpire/api-interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authAction } from './+state/auth/auth.actions';
import { globalAction } from './+state/global/global.actions';
import { GlobalPage } from './+state/global/models/global.model';
import { selectGlobalPage } from './+state/global/views/global-view.selectors';

@Component({
  selector: 'ng-filmpire-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild('snav') mobileSidenav!: MatSidenav;

  globalPage$!: Observable<GlobalPage>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.globalPage$ = this.store.select(selectGlobalPage);
  }

  toggleDarkMode() {
    this.store.dispatch(globalAction.toggleDarkMode());
  }

  toggleMobileSidenav() {
    this.mobileSidenav.toggle();
  }

  setGenres(media: SelectedMedia) {
    this.store.dispatch(globalAction.setCurrentMedia({ currentMedia: media }));
  }

  logIn() {
    this.store.dispatch(authAction.login());
  }
}
