import { Movie, Person, TvShow } from '../api-interfaces';

export type SearchMedia = {
  media_type: 'movie' | 'person' | 'tv';
};

export type SearchResults = Movie | TvShow | Person;
