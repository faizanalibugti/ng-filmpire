import {
  MovieDetail,
  TvShowDetail,
  AccountStates,
  SelectedMedia,
} from '@ng-filmpire/api-interfaces';

export interface MediaInfoPage {
  mediaInfo: MovieDetail | TvShowDetail;
  accountState: AccountStates;
  currentMedia: SelectedMedia;
  isLoggedIn: boolean;
  loaded: boolean;
}
