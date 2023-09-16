import { SafeResourceUrl } from '@angular/platform-browser';

export interface BaseEntity<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type SelectedMedia = 'movie' | 'tv';

export interface Collection {
  id: number;
  backdrop_path: string;
  name: string;
  poster_path: string;
}

export interface Company {
  id: number;
  logo_path: string;
  name: string;
}

export interface Network {
  id: number;
  name: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface Language {
  iso_639_1: string;
  name: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  release_date: Date;
  first_air_date: Date;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  videoURL?: SafeResourceUrl;
}

export interface VideoEnity {
  results: Video[];
}
