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
    path: 'tv/:id',
    component: MovieInformationComponent,
  },
  {
    path: 'actor/:id',
    component: ActorsComponent,
  },
  {
    path: 'genre/:media/:id',
    component: MoviesComponent,
  },
  {
    path: 'category/:media/:id',
    component: MoviesComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  { path: '', redirectTo: 'category/movie/popular', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
