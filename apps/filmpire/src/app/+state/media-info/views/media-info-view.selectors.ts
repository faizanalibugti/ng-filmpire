import { createSelector } from '@ngrx/store';
import {
  selectAccountState,
  selectMediaInfo,
  selectMediaInfoLoaded,
} from '../media-info.selectors';
import { selectCurrentMedia } from '../../global/global.selectors';
import { MediaInfoPage } from '../models/media-info.model';

export const selectMediaInfoPage = createSelector(
  selectMediaInfo,
  selectAccountState,
  selectCurrentMedia,
  selectMediaInfoLoaded,
  (mediaInfo, accountState, currentMedia, loaded) =>
    ({
      mediaInfo,
      accountState,
      currentMedia,
      loaded,
    } as MediaInfoPage)
);
