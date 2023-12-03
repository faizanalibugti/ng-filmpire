import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken, User } from '@ng-filmpire/api-interfaces';
import { AuthService, NotificationsService } from '@ng-filmpire/core-data';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { selectQueryParams } from '../router/router.selectors';
import * as AuthActions from './auth.actions';
import { selectIsAuthenticated } from './auth.selectors';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notifications = inject(NotificationsService);

  initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => this.store.select(selectIsAuthenticated)),
      map(([, isAuthenticated]) => ({
        sessionId: localStorage.getItem('session_id') as string,
        isAuthenticated,
      })),
      filter(
        ({ isAuthenticated, sessionId }) => !isAuthenticated && !!sessionId
      ),
      map(() => AuthActions.authAction.setUser())
    );
  });

  createRequestToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authAction.login),
      switchMap(() =>
        this.authService.createRequestToken().pipe(
          map((token: AuthToken) =>
            AuthActions.authApiActions.loginSuccess({ token })
          ),
          catchError((e) => of(AuthActions.authApiActions.loginFailure(e)))
        )
      )
    );
  });

  createSessionId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => this.store.select(selectQueryParams)),
      filter(([, { request_token, approved }]) => approved && request_token),
      switchMap(([, { request_token }]) =>
        this.authService.createSessionId(request_token).pipe(
          map(() => AuthActions.authAction.setUser()),
          catchError((e) => of(AuthActions.authApiActions.setUserFailure(e)))
        )
      )
    );
  });

  setUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authAction.setUser),
      map(() => ({
        sessionId: localStorage.getItem('session_id') as string,
      })),
      filter(({ sessionId }) => !!sessionId),
      switchMap(({ sessionId }) =>
        this.authService.getUserDetails(sessionId).pipe(
          map((user: User) =>
            AuthActions.authApiActions.setUserSuccess({ user })
          ),
          catchError((e) => of(AuthActions.authApiActions.setUserFailure(e)))
        )
      )
    );
  });

  onLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.authAction.logout),
      map(() => ({
        sessionId: localStorage.getItem('session_id') as string,
      })),
      filter(({ sessionId }) => !!sessionId),
      switchMap(({ sessionId }) =>
        this.authService.deleteSession(sessionId).pipe(
          map(() => AuthActions.authApiActions.logoutSuccess()),
          catchError((e) => of(AuthActions.authApiActions.logoutFailure(e)))
        )
      )
    );
  });

  clearLocalStorageOnLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authApiActions.logoutSuccess),
        tap(() => {
          this.authService.logOut();
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  authError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          AuthActions.authApiActions.loginFailure,
          AuthActions.authApiActions.createSessionFailure,
          AuthActions.authApiActions.setUserFailure,
          AuthActions.authApiActions.logoutFailure
        ),
        tap(() =>
          this.notifications.openSnackBar(
            'Authentication Failed. Please try again.'
          )
        )
      );
    },
    { dispatch: false }
  );
}
