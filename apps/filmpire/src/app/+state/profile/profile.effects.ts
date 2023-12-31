import { Injectable, inject } from '@angular/core';
import { ProfileData } from '@ng-filmpire/api-interfaces';
import { AccountService, NotificationsService } from '@ng-filmpire/core-data';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, concatMap, filter, forkJoin, map, of, tap } from 'rxjs';
import * as AuthSelectors from '../auth/auth.selectors';
import { selectUrlFragments } from '../router/router.selectors';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private accountHttp = inject(AccountService);
  private notifications = inject(NotificationsService);

  onNavigateToProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(AuthSelectors.selectUser),
        this.store.select(selectUrlFragments),
      ]),
      filter(
        ([, user, urlFragments]) =>
          urlFragments.includes('profile') && !!user?.id
      ),
      map(([, user]) =>
        user
          ? ProfileActions.profileAction.loadProfile({ user })
          : ProfileActions.profileApiActions.loadProfileFailure({
              error: 'Please login to acccess your profile',
            })
      )
    );
  });

  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.profileAction.loadProfile),
      map(({ user }) => ({
        user,
        sessionId: localStorage.getItem('session_id') as string,
      })),
      filter(({ sessionId }) => !!sessionId),
      concatMap(({ user, sessionId }) =>
        forkJoin({
          favoriteMovies: this.accountHttp
            .getFavoriteMovies(user.id, sessionId)
            .pipe(
              catchError((error) => {
                // Handle error for getFavoriteMovies
                return of({
                  page: 0,
                  total_pages: 0,
                  total_results: 0,
                  results: [],
                });
              })
            ),
          favoriteTV: this.accountHttp.getFavouriteTV(user.id, sessionId).pipe(
            catchError((error) => {
              // Handle error for getFavoriteMovies
              return of({
                page: 0,
                total_pages: 0,
                total_results: 0,
                results: [],
              });
            })
          ),
          watchListMovies: this.accountHttp
            .getWatchListMovies(user.id, sessionId)
            .pipe(
              catchError((error) => {
                // Handle error for getFavoriteMovies
                return of({
                  page: 0,
                  total_pages: 0,
                  total_results: 0,
                  results: [],
                });
              })
            ),
          watchListTV: this.accountHttp.getWatchListTV(user.id, sessionId).pipe(
            catchError((error) => {
              // Handle error for getFavoriteMovies
              return of({
                page: 0,
                total_pages: 0,
                total_results: 0,
                results: [],
              });
            })
          ),
        }).pipe(
          map((profileData: ProfileData) =>
            ProfileActions.profileApiActions.loadProfileSuccess({
              profileData,
            })
          ),
          catchError((error) =>
            of(
              ProfileActions.profileApiActions.loadProfileFailure({
                error,
              })
            )
          )
        )
      )
    );
  });

  loadProfileError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProfileActions.profileApiActions.loadProfileFailure),
        tap(() =>
          this.notifications.openSnackBar(
            'Failed to load profile info. Please try again later'
          )
        )
      );
    },
    { dispatch: false }
  );
}
