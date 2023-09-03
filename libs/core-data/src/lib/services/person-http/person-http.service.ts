import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonDetails } from '@ng-filmpire/api-interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonHttpService {
  /**
   * Model name for the base endpoint
   */
  private model = 'person';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient) {}

  getPersonDetails(id: number) {
    return this.http.get<PersonDetails>(`${this.baseUrl}/${id}`, {
      params: { append_to_response: 'movie_credits,tv_credits' },
    });
  }
}
