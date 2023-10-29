import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
  AccountStates,
  BaseEntity,
  TvShow,
  TvShowDetail,
} from '@ng-filmpire/api-interfaces';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TvHttpService {
  /**
   * Model name for the base endpoint
   */
  private model = 'tv';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient, private auth: AuthService) {}

  getTVShows(
    genreIdOrCategoryName: string | number = 'popular',
    page = 1
  ) {
    // Get TV Shows by Category
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
      if (genreIdOrCategoryName === 'trending') {
        return this.http.get<BaseEntity<TvShow>>(
          `${this.API_ENDPOINT}/${genreIdOrCategoryName}/${this.model}/day`,
          {
            params: { page },
          }
        );
      } else {
        return this.http.get<BaseEntity<TvShow>>(
          `${this.baseUrl}/${genreIdOrCategoryName}`,
          {
            params: { page },
          }
        );
      }
    }

    // Get TVShows by Genre
    if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
      return this.http.get<BaseEntity<TvShow>>(
        `${this.API_ENDPOINT}/discover/tv`,
        {
          params: { with_genres: genreIdOrCategoryName, page },
        }
      );
    }

    return this.http.get<BaseEntity<TvShow>>(`${this.baseUrl}/popular`, {
      params: { page },
    });
  }

  getTVShowDetails(id: number) {
    return this.http.get<TvShowDetail>(`${this.baseUrl}/${id}`, {
      params: {
        append_to_response: 'recommendations,videos,credits',
      },
    });
  }

  getTVAccountState(id: number) {
    const session_id = this.auth.sessionId as string;

    return this.http.get<AccountStates>(
      `${this.baseUrl}/${id}/account_states`,
      {
        params: {
          session_id,
        },
      }
    );
  }
}
