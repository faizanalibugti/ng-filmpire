import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MEDIA_LIST_FEATURE_KEY,
  MediaListState,
  mediaListAdapter,
} from './media-list.reducer';

// Lookup the 'MediaList' feature state managed by NgRx
export const selectMediaListState = createFeatureSelector<MediaListState>(
  MEDIA_LIST_FEATURE_KEY
);

const { selectAll, selectEntities } = mediaListAdapter.getSelectors();

export const selectMediaListLoaded = createSelector(
  selectMediaListState,
  (state: MediaListState) => state.loaded
);

export const selectMediaListError = createSelector(
  selectMediaListState,
  (state: MediaListState) => state.error
);

export const selectAllMediaList = createSelector(
  selectMediaListState,
  (state: MediaListState) => selectAll(state)
);

export const selectMediaListEntities = createSelector(
  selectMediaListState,
  (state: MediaListState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectMediaListState,
  (state: MediaListState) => state.selectedId
);

export const selectEntity = createSelector(
  selectMediaListEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);

export const selectPagination = createSelector(
  selectMediaListState,
  (state: MediaListState) => state.pagination
);
