import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEntity, Movie, MovieDetail } from '@ng-filmpire/api-interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieHttpService {
  /**
   * Model name for the base endpoint
   */
  private model = 'movie';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient) {}

  getMovies(
    genreIdOrCategoryName: string | number = 'popular',
    page: number = 1
  ) {
    // Get Movies by Category
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
      if (genreIdOrCategoryName === 'trending') {
        return this.http.get<BaseEntity<Movie>>(
          `${this.API_ENDPOINT}/${genreIdOrCategoryName}/${this.model}/day`,
          {
            params: { page },
          }
        );
      } else {
        return this.http.get<BaseEntity<Movie>>(
          `${this.baseUrl}/${genreIdOrCategoryName}`,
          {
            params: { page },
          }
        );
      }
    }

    // Get Movies by Genre
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
      return this.http.get<BaseEntity<Movie>>(
        `${this.API_ENDPOINT}/discover/movie`,
        {
          params: { with_genres: genreIdOrCategoryName, page },
        }
      );
    }

    return this.http.get<BaseEntity<Movie>>(`${this.baseUrl}/popular`, {
      params: { page },
    });
  }

  getMovieDetails(id: number) {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${id}`, {
      params: { append_to_response: 'recommendations,videos,credits' },
    });
  }
}
