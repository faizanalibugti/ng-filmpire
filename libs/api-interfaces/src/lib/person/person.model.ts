import { Movie } from '../api-interfaces';
import { TvShow } from '../tv/tv.model';

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  adult: boolean;
  popularity: number;
  known_for: Array<Movie | TvShow>;
}

export interface PersonDetails extends Person {
  also_known_as: string[];
  biography: string;
  birthday: Date;
  deathday: Date;
  gender: number;
  homepage: string;
  imdb_id: string;
  place_of_birth: string;
}
