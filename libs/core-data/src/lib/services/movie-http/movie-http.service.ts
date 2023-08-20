import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BaseEntity, Movie } from '@ng-filmpire/api-interfaces';

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

  loadPopularMovies(page: number = 1) {
    return this.http.get<BaseEntity<Movie>>(`${this.baseUrl}/popular`, {
      params: { page },
    });
  }
}
