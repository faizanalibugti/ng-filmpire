import { Route } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { MediaInfoComponent } from './media-info/media-info.component';
import { MediaListComponent } from './media-list/media-list.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { PageNotFoundComponent } from '@ng-filmpire/ui';

export const appRoutes: Route[] = [
  {
    path: 'movie/:id',
    component: MediaInfoComponent,
  },
  {
    path: 'tv/:id',
    component: MediaInfoComponent,
  },
  {
    path: 'actor/:id',
    component: PersonInfoComponent,
  },
  {
    path: 'genre/:media/:id',
    component: MediaListComponent,
  },
  {
    path: 'category/:media/:id',
    component: MediaListComponent,
  },
  {
    path: 'profile/:id',
    component: AccountComponent,
  },
  { path: '', redirectTo: 'category/movie/popular', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
