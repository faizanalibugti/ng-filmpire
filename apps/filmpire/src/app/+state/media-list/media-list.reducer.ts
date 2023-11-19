import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Movie, Pagination, TvShow } from '@ng-filmpire/api-interfaces';
import * as MediaListActions from './media-list.actions';

export const MEDIA_LIST_FEATURE_KEY = 'mediaList';

export interface MediaListState extends EntityState<Movie | TvShow> {
  selectedId?: string | number; // which MediaList record has been selected
  loaded: boolean; // has the MediaList list been loaded
  error?: string | null; // last known error (if any)
  pagination?: Pagination;
}

export interface MediaListPartialState {
  readonly [MEDIA_LIST_FEATURE_KEY]: MediaListState;
}

export const mediaListAdapter: EntityAdapter<Movie | TvShow> =
  createEntityAdapter<Movie | TvShow>();

export const initialMediaListState: MediaListState =
  mediaListAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialMediaListState,
  on(
    MediaListActions.mediaListAction.loadMovieList,
    MediaListActions.mediaListAction.loadTVList,
    (state): MediaListState => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    MediaListActions.mediaListApiActions.loadTVListSuccess,
    MediaListActions.mediaListApiActions.loadMovieListSuccess,
    (state, { mediaList }) =>
      mediaListAdapter.setAll(mediaList.results, {
        ...state,
        loaded: true,
        pagination: {
          page: mediaList.page,
          total_pages: mediaList.total_pages,
          total_results: mediaList.total_results,
        },
      })
  ),
  on(
    MediaListActions.mediaListApiActions.changePageSuccess,
    (state, { mediaList }) =>
      mediaListAdapter.addMany(mediaList.results, {
        ...state,
        loaded: true,
        pagination: {
          page: mediaList.page,
          total_pages: mediaList.total_pages,
          total_results: mediaList.total_results,
        },
      })
  ),
  on(
    MediaListActions.mediaListApiActions.loadMovieListFailure,
    MediaListActions.mediaListApiActions.loadTVListFailure,
    MediaListActions.mediaListApiActions.changePageFailure,
    (state, { error }): MediaListState => ({
      ...state,
      error,
    })
  )
);

export function mediaListReducer(
  state: MediaListState | undefined,
  action: Action
) {
  return reducer(state, action);
}
