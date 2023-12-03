import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROFILE_FEATURE_KEY, ProfileState } from './profile.reducer';
import { ProfileData } from '@ng-filmpire/api-interfaces';

// Lookup the 'Profile' feature state managed by NgRx
export const selectProfileState =
  createFeatureSelector<ProfileState>(PROFILE_FEATURE_KEY);

export const selectProfileLoaded = createSelector(
  selectProfileState,
  (state: ProfileState) => state.loaded
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state: ProfileState) => state.error
);

export const selectSelectedId = createSelector(
  selectProfileState,
  (state: ProfileState) => state.selectedId
);

export const selectFavoriteMovies = createSelector(
  selectProfileState,
  (state: ProfileState) => state.favoriteMovies
);

export const selectFavoriteTV = createSelector(
  selectProfileState,
  (state: ProfileState) => state.favoriteTV
);

export const selectWatchListMovies = createSelector(
  selectProfileState,
  (state: ProfileState) => state.watchListMovies
);

export const selectWatchListTV = createSelector(
  selectProfileState,
  (state: ProfileState) => state.watchListTV
);

export const selectProfileData = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    const { loaded, error, ...profileData } = state;

    return profileData as ProfileData;
  }
);
