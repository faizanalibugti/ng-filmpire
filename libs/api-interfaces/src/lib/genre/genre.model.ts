export interface Genre {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  value: string;
}

export interface GenreEntity {
  genres: Genre[];
}
