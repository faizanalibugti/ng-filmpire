import { Route } from '@angular/router';
import {
  ActorsComponent,
  MovieInformationComponent,
  MoviesComponent,
  ProfileComponent,
} from '@ng-filmpire/ui';

export const appRoutes: Route[] = [
  {
    path: 'movie/:id',
    component: MovieInformationComponent,
  },
  {
    path: 'actor/:id',
    component: ActorsComponent,
  },
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
];
