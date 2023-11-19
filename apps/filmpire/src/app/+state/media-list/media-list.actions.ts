import { BaseEntity, Movie, TvShow } from '@ng-filmpire/api-interfaces';
import { createActionGroup, props } from '@ngrx/store';

export const mediaListAction = createActionGroup({
  source: 'Media List',
  events: {
    'Load Movie List': props<{ genre: string | number }>(),
    'Load TV List': props<{ genre: string | number }>(),
    'Change Page': props<{ page: number }>(),
  },
});

export const mediaListApiActions = createActionGroup({
  source: 'Media List/API',
  events: {
    'Load Movie List Success': props<{ mediaList: BaseEntity<Movie> }>(),
    'Load Movie List Failure': props<{ error: any }>(),
    'Load TV List Success': props<{ mediaList: BaseEntity<TvShow> }>(),
    'Load TV List Failure': props<{ error: any }>(),
    'Change Page Success': props<{
      mediaList: BaseEntity<Movie | TvShow>;
    }>(),
    'Change Page Failure': props<{
      error: any;
    }>(),
  },
});
