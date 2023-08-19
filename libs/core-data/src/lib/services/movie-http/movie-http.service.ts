import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

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

  loadPopularMovies(page: number = 1): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/popular`, { params: { page } });
  }
}
