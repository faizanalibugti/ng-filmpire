import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSession, AuthToken, User } from '@ng-filmpire/api-interfaces';
import { tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private model = 'authentication';

  private API_ENDPOINT = environment.apiEnpoint;

  private get baseUrl(): string {
    return `${this.API_ENDPOINT}/${this.model}`;
  }

  /**
   *
   * @param http {HttpClient}
   */
  constructor(private http: HttpClient) {}

  createRequestToken() {
    return this.http.get<AuthToken>(`${this.baseUrl}/token/new`).pipe(
      tap(({ success, request_token }) => {
        if (success) {
          localStorage.setItem('request_token', request_token);

          location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${location.origin}`;
        }
      })
    );
  }

  createSessionId(token: string) {
    return this.http
      .post<AuthSession>(`${this.baseUrl}/session/new`, {
        request_token: token,
      })
      .pipe(
        tap(({ success, session_id }) => {
          if (success) {
            localStorage.setItem('session_id', session_id);
          }
        })
      );
  }

  getUserDetails(sessionId: string) {
    return this.http.get<User>(`${this.API_ENDPOINT}/account`, {
      params: {
        session_id: sessionId,
      },
    });
  }

  deleteSession(sessionId: string) {
    return this.http.delete<{ success: boolean }>(`${this.baseUrl}/session`, {
      body: {
        session_id: sessionId,
      },
    });
  }

  logOut() {
    localStorage.clear();
  }
}
