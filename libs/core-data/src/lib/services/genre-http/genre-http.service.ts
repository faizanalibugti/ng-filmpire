import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { GenreEntity } from '@ng-filmpire/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class GenreHttpService {
  /**
   * Model name for the base endpoint
   */
  private model = 'genre';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient) {}

  getMovieGenres() {
    return this.http.get<GenreEntity>(`${this.baseUrl}/movie/list`);
  }

  getTVGenres() {
    return this.http.get<GenreEntity>(`${this.baseUrl}/tv/list`);
  }
}
