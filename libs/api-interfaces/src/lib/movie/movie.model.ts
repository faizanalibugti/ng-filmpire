import {
  BaseEntity,
  Collection,
  Company,
  Country,
  Credits,
  Genre,
  Language,
  VideoEnity,
} from '../api-interfaces';

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: Date;
  genre_ids: number[];
  original_language: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  media_type: 'movie';
}

export interface MovieDetail extends Movie {
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  recommendations: BaseEntity<Movie>;
  videos: VideoEnity;
  credits: Credits;
}
