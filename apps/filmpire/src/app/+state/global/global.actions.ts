import { Genre, SelectedMedia } from '@ng-filmpire/api-interfaces';
import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const globalAction = createActionGroup({
  source: 'Global',
  events: {
    'Toggle Dark Mode': emptyProps(),
    'Set Current Media': props<{ currentMedia: SelectedMedia }>(),
    'Set Genre Category': props<{ genreOrCategory: string | number }>(),
    'Set Mobile Breakpoint': props<{ isMobile: boolean }>(),
    'Load Movie Genres': emptyProps(),
    'Load TV Genres': emptyProps(),
  },
});

export const globalApiActions = createActionGroup({
  source: 'Global/Genres/API',
  events: {
    'Load Movie Genres Success': props<{ genres: Genre[] }>(),
    'Load Movie Genres Failure': props<{ error: any }>(),
    'Load TV Genres Success': props<{ genres: Genre[] }>(),
    'Load TV Genres Failure': props<{ error: any }>(),
  },
});
