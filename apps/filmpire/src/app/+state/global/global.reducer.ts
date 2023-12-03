import { Action, createReducer, on } from '@ngrx/store';

import { Genre, SelectedMedia } from '@ng-filmpire/api-interfaces';
import * as GlobalActions from './global.actions';

export const GLOBAL_FEATURE_KEY = 'global';

export interface GlobalState {
  loaded: boolean; // has the Genres list been loaded
  error?: string | null; // last known error (if any)
  darkMode: boolean;
  isMobileDevice: boolean;
  currentMedia: SelectedMedia;
  activeGenreOrCategory: string | number;
  movieGenres: Genre[];
  tvGenres: Genre[];
}

export interface GlobalPartialState {
  readonly [GLOBAL_FEATURE_KEY]: GlobalState;
}

export const initialGlobalState: GlobalState = {
  // set initial required properties
  loaded: false,
  darkMode: false,
  isMobileDevice: false,
  currentMedia: 'movie',
  activeGenreOrCategory: 'popular',
  movieGenres: [],
  tvGenres: [],
};

const reducer = createReducer(
  initialGlobalState,
  on(
    GlobalActions.globalAction.loadMovieGenres,
    GlobalActions.globalAction.loadTVGenres,
    (state): GlobalState => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    GlobalActions.globalAction.toggleDarkMode,
    (state): GlobalState => ({
      ...state,
      darkMode: !state.darkMode,
    })
  ),
  on(
    GlobalActions.globalAction.setMobileBreakpoint,
    (state, { isMobile }): GlobalState => ({
      ...state,
      isMobileDevice: isMobile,
    })
  ),
  on(
    GlobalActions.globalAction.setCurrentMedia,
    (state, { currentMedia }): GlobalState => ({
      ...state,
      currentMedia,
    })
  ),
  on(
    GlobalActions.globalAction.setGenreCategory,
    (state, { genreOrCategory }): GlobalState => ({
      ...state,
      activeGenreOrCategory: genreOrCategory,
    })
  ),
  on(
    GlobalActions.globalApiActions.loadMovieGenresSuccess,
    (state, { genres }): GlobalState => ({
      ...state,
      movieGenres: genres,
    })
  ),
  on(
    GlobalActions.globalApiActions.loadTVGenresSuccess,
    (state, { genres }): GlobalState => ({
      ...state,
      tvGenres: genres,
    })
  ),
  on(
    GlobalActions.globalApiActions.loadMovieGenresFailure,
    GlobalActions.globalApiActions.loadTVGenresFailure,
    (state, { error }): GlobalState => ({
      ...state,
      error,
    })
  )
);

export function globalReducer(state: GlobalState | undefined, action: Action) {
  return reducer(state, action);
}
