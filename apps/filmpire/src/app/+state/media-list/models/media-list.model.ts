import { Movie, TvShow, Pagination } from '@ng-filmpire/api-interfaces';

export interface MediaListPage {
  mediaList: (Movie | TvShow)[];
  pagination: Pagination | undefined;
  loaded: boolean;
}
