import {
  AccountStates,
  MovieDetail,
  TvShowDetail,
} from '@ng-filmpire/api-interfaces';
import { createActionGroup, props } from '@ngrx/store';

export const mediaInfoAction = createActionGroup({
  source: 'Media Info',
  events: {
    'Load Movie Info': props<{ id: number }>(),
    'Load Movie Account Info': props<{ id: number }>(),
    'Load TV Info': props<{ id: number }>(),
    'Load TV Account Info': props<{ id: number }>(),
    'Add To Favorite': props<{ mediaId: number; favorite: boolean }>(),
    'Add To Watchlist': props<{ mediaId: number; watchlist: boolean }>(),
  },
});

export const mediaInfoApiActions = createActionGroup({
  source: 'Media Info/API',
  events: {
    'Load Movie Info Success': props<{ mediaInfo: MovieDetail }>(),
    'Load Movie Info Failure': props<{ error: any }>(),
    'Load Movie Account Info Success': props<{ account: AccountStates }>(),
    'Load Movie Account Info Failure': props<{ error: number }>(),
    'Load TV Info Success': props<{ mediaInfo: TvShowDetail }>(),
    'Load TV Info Failure': props<{ error: any }>(),
    'Load TV Account Info Success': props<{ account: AccountStates }>(),
    'Load TV Account Info Failure': props<{ error: any }>(),
    'Add To Favorite Success': props<{ favorite: boolean }>(),
    'Add To Favorite Failure': props<{ error: any }>(),
    'Add To Watchlist Success': props<{ watchlist: boolean }>(),
    'Add To Watchlist Failure': props<{ error: any }>(),
  },
});
