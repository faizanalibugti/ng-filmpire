export interface Genre {
  id: number;
  name: string;
}

export interface MovieGenre {
  genres: Genre[];
}
