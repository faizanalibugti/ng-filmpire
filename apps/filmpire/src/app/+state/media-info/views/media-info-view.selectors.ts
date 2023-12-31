import { createSelector } from '@ngrx/store';
import {
  selectAccountState,
  selectMediaInfo,
  selectMediaInfoLoaded,
} from '../media-info.selectors';
import { selectCurrentMedia } from '../../global/global.selectors';
import { MediaInfoPage } from '../models/media-info.model';
import { selectIsAuthenticated } from '../../auth/auth.selectors';

export const selectMediaInfoPage = createSelector(
  selectMediaInfo,
  selectAccountState,
  selectCurrentMedia,
  selectIsAuthenticated,
  selectMediaInfoLoaded,
  (mediaInfo, accountState, currentMedia, isLoggedIn, loaded) =>
    ({
      mediaInfo,
      accountState,
      currentMedia,
      isLoggedIn,
      loaded,
    } as MediaInfoPage)
);
