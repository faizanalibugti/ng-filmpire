import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
  BaseEntity,
  Movie,
  SelectedMedia,
  TvShow,
} from '@ng-filmpire/api-interfaces';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  /**
   * Model name for the base endpoint
   */
  private model = 'account';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  accountId = this.auth.user?.id;
  sessionId = this.auth.sessionId as string;

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient, private auth: AuthService) {}

  getFavoriteMovies(
    accountId: number,
    session_id: string = this.sessionId,
    page: number = 1
  ) {
    return this.http.get<BaseEntity<Movie>>(
      `${this.baseUrl}/${accountId}/favorite/movies`,
      {
        params: { page, session_id },
      }
    );
  }

  getFavouriteTV(
    accountId: number,
    session_id: string = this.sessionId,
    page: number = 1
  ) {
    return this.http.get<BaseEntity<TvShow>>(
      `${this.baseUrl}/${accountId}/favorite/tv`,
      {
        params: { page, session_id },
      }
    );
  }

  getWatchListMovies(
    accountId: number,
    session_id: string = this.sessionId,
    page: number = 1
  ) {
    return this.http.get<BaseEntity<Movie>>(
      `${this.baseUrl}/${accountId}/watchlist/movies`,
      {
        params: { page, session_id },
      }
    );
  }

  getWatchListTV(
    accountId: number,
    session_id: string = this.sessionId,
    page: number = 1
  ) {
    return this.http.get<BaseEntity<TvShow>>(
      `${this.baseUrl}/${accountId}/watchlist/tv`,
      {
        params: { page, session_id },
      }
    );
  }

  addToFavourite(
    media_id: number,
    media_type: SelectedMedia,
    favorite: boolean,
    session_id: string = this.sessionId
  ) {
    return this.http.post(
      `${this.baseUrl}/${this.accountId}/favorite`,
      {
        media_id,
        media_type,
        favorite,
      },
      {
        params: { session_id },
      }
    );
  }

  addToWatchList(
    media_id: number,
    media_type: SelectedMedia,
    watchlist: boolean,
    session_id: string = this.sessionId
  ) {
    return this.http.post(
      `${this.baseUrl}/${this.accountId}/watchlist`,
      {
        media_id,
        media_type,
        watchlist,
      },
      {
        params: { session_id },
      }
    );
  }
}
