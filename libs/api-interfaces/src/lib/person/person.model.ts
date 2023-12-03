import { Credits, Movie } from '../api-interfaces';

export interface Person {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  gender: number;
  adult: boolean;
  popularity: number;
  media_type: 'person';
  known_for_department: string;
  known_for: Movie[];
}

export interface PersonDetails extends Person {
  also_known_as: string[];
  biography: string;
  birthday: string; // Date
  deathday: string; // Date
  homepage: string;
  imdb_id: string;
  place_of_birth: string;
  movie_credits: Credits;
  tv_credits: Credits;
  age?: number;
}
