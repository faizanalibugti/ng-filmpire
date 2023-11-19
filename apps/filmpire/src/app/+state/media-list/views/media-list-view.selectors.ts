import { createSelector } from '@ngrx/store';
import {
  selectAllMediaList,
  selectMediaListLoaded,
  selectPagination,
} from '../media-list.selectors';
import { MediaListPage } from '../models/media-list.model';

export const selectMediaListPage = createSelector(
  selectAllMediaList,
  selectPagination,
  selectMediaListLoaded,
  (mediaList, pagination, loaded) =>
    ({
      mediaList,
      pagination,
      loaded,
    } as MediaListPage)
);
