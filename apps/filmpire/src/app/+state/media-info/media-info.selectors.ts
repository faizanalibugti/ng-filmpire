import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MEDIA_INFO_FEATURE_KEY, MediaInfoState } from './media-info.reducer';
import {
  AccountStates,
  MovieDetail,
  TvShowDetail,
} from '@ng-filmpire/api-interfaces';

// Lookup the 'MediaInfo' feature state managed by NgRx
export const selectMediaInfoState = createFeatureSelector<MediaInfoState>(
  MEDIA_INFO_FEATURE_KEY
);

export const selectMediaInfoLoaded = createSelector(
  selectMediaInfoState,
  (state: MediaInfoState) => state.loaded
);

export const selectMediaInfoError = createSelector(
  selectMediaInfoState,
  (state: MediaInfoState) => state.error
);

export const selectMediaInfo = createSelector(
  selectMediaInfoState,
  (state: MediaInfoState) =>
    ({
      ...state.mediaInfo,
      videos: {
        results: state.mediaInfo?.videos.results
          ? structuredClone(state.mediaInfo.videos.results)
          : [],
      },
    } as MovieDetail | TvShowDetail)
);

export const selectAccountState = createSelector(
  selectMediaInfoState,
  (state: MediaInfoState) => state.accountState as AccountStates
);
