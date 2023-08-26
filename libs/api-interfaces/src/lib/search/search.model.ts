import { Movie, Person, TvShow } from '../api-interfaces';

type SearchMedia = {
  media_type: 'movie' | 'person' | 'tv';
};

type SearchResult<T extends SearchMedia['media_type']> = T extends 'movie'
  ? Movie & { media_type: 'movie' }
  : T extends 'person'
  ? Person & { media_type: 'person' }
  : T extends 'tv'
  ? TvShow & { media_type: 'tv' }
  : never;

export type SearchResults = SearchResult<SearchMedia['media_type']>[];
