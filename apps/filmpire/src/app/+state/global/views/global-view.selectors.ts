import { createSelector } from '@ngrx/store';
import { selectUser } from '../../auth/auth.selectors';
import {
  selectCurrentMedia,
  selectDarkMode,
  selectGenres,
  selectIsMobileDevice,
} from '../global.selectors';
import { GlobalPage } from '../models/global.model';

export const selectGlobalPage = createSelector(
  selectDarkMode,
  selectIsMobileDevice,
  selectCurrentMedia,
  selectGenres,
  selectUser,
  (darkMode, isMobile, currentMedia, genres, user) => ({
    darkMode,
    isMobile,
    currentMedia,
    genres,
    user,
  }) as GlobalPage
);
