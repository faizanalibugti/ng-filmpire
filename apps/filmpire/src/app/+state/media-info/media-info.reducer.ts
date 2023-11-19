import { Action, createReducer, on } from '@ngrx/store';

import {
  AccountStates,
  MovieDetail,
  TvShowDetail,
} from '@ng-filmpire/api-interfaces';
import * as MediaInfoActions from './media-info.actions';

export const MEDIA_INFO_FEATURE_KEY = 'mediaInfo';

export interface MediaInfoState {
  selectedId?: string | number; // which MediaInfo record has been selected
  loaded: boolean; // has the MediaInfo list been loaded
  error?: string | null; // last known error (if any)
  mediaInfo?: MovieDetail | TvShowDetail;
  accountState?: AccountStates;
}

export interface MediaInfoPartialState {
  readonly [MEDIA_INFO_FEATURE_KEY]: MediaInfoState;
}

export const initialMediaInfoState: MediaInfoState = {
  // set initial required properties
  loaded: false,
};

const reducer = createReducer(
  initialMediaInfoState,
  on(
    MediaInfoActions.mediaInfoAction.loadMovieInfo,
    MediaInfoActions.mediaInfoAction.loadTVInfo,
    (state): MediaInfoState => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    MediaInfoActions.mediaInfoApiActions.loadMovieInfoSuccess,
    MediaInfoActions.mediaInfoApiActions.loadTVInfoSuccess,
    (state, { mediaInfo }): MediaInfoState => ({
      ...state,
      loaded: true,
      mediaInfo,
    })
  ),
  on(
    MediaInfoActions.mediaInfoApiActions.loadMovieAccountInfoSuccess,
    MediaInfoActions.mediaInfoApiActions.loadTVAccountInfoSuccess,
    (state, { account }): MediaInfoState => ({
      ...state,
      accountState: account,
    })
  ),
  on(
    MediaInfoActions.mediaInfoApiActions.addToFavoriteSuccess,
    (state, { favorite }): MediaInfoState => ({
      ...state,
      accountState: state.accountState
        ? {
            ...state.accountState,
            favorite,
          }
        : undefined,
    })
  ),
  on(
    MediaInfoActions.mediaInfoApiActions.addToWatchlistSuccess,
    (state, { watchlist }): MediaInfoState => ({
      ...state,
      accountState: state.accountState
        ? {
            ...state.accountState,
            watchlist,
          }
        : undefined,
    })
  ),
  on(
    MediaInfoActions.mediaInfoApiActions.loadMovieInfoFailure,
    MediaInfoActions.mediaInfoApiActions.loadMovieAccountInfoFailure,
    MediaInfoActions.mediaInfoApiActions.loadTVInfoFailure,
    MediaInfoActions.mediaInfoApiActions.loadTVAccountInfoFailure,
    MediaInfoActions.mediaInfoApiActions.addToFavoriteFailure,
    MediaInfoActions.mediaInfoApiActions.addToWatchlistFailure,
    (state, { error }): MediaInfoState => ({
      ...state,
      error,
    })
  )
);

export function mediaInfoReducer(
  state: MediaInfoState | undefined,
  action: Action
) {
  return reducer(state, action);
}
