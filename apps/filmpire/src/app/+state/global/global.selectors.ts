import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GLOBAL_FEATURE_KEY, GlobalState } from './global.reducer';

// Lookup the 'Global' feature state managed by NgRx
export const selectGlobalState =
  createFeatureSelector<GlobalState>(GLOBAL_FEATURE_KEY);

export const selectDarkMode = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.darkMode
);

export const selectCurrentMedia = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.currentMedia
);

export const selectMovieGenres = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.movieGenres
);

export const selectTVGenres = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.tvGenres
);

export const selectActiveGenreCategory = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.activeGenreOrCategory
);

export const selectIsMobileDevice = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.isMobileDevice
);

export const selectGenres = createSelector(
  selectCurrentMedia,
  selectMovieGenres,
  selectTVGenres,
  (currentMedia, movieGenres, tvGenres) =>
    currentMedia === 'movie' ? movieGenres : tvGenres
);
