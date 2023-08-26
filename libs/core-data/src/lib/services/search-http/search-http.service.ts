import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseEntity, SearchResults } from '@ng-filmpire/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class SearchHttpService {
  /**
   * Model name for the base endpoint
   */
  private model = 'search';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient) {}

  getMultiSearchResults(query: string) {
    return this.http.get<BaseEntity<SearchResults>>(`${this.baseUrl}/multi`, {
      params: { query, include_adult: false },
    });
  }
}
