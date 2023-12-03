import { SelectedMedia, Genre, User } from '@ng-filmpire/api-interfaces';

export interface GlobalPage {
  darkMode: boolean;
  isMobile: boolean;
  currentMedia: SelectedMedia;
  genres: Genre[];
  user: User | null;
}
