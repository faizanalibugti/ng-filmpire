import {
  Genre,
  Network,
  Company,
  BaseEntity,
  VideoEnity,
  Credits,
} from '../api-interfaces';
import { Person } from '../person/person.model';

export interface TvShow {
  id: number;
  name: string;
  original_name: string;
  poster_path: string;
  popularity: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  first_air_date: Date;
  media_type: 'tv';
}

export interface Season {
  id: number;
  episode_count: number;
  poster_path: string;
  season_number: number;
  air_date: Date;
}

export interface TvShowDetail extends TvShow {
  created_by: Person[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  in_production: boolean;
  languages: string[];
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Company[];
  seasons: Season[];
  status: string;
  type: string;
  last_air_date?: Date;
  tagline: string;
  recommendations: BaseEntity<TvShow>;
  videos: VideoEnity;
  credits: Credits;
}
