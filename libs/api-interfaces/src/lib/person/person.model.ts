import { Credits } from '../api-interfaces';

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  adult: boolean;
  popularity: number;
  media_type: 'person';
}

export interface PersonDetails extends Person {
  also_known_as: string[];
  biography: string;
  birthday: string; // Date
  deathday: string; // Date
  gender: number;
  homepage: string;
  imdb_id: string;
  place_of_birth: string;
  movie_credits: Credits;
  tv_credits: Credits;
  age?: number;
}
