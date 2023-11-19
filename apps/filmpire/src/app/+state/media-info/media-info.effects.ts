import { Injectable, inject } from '@angular/core';
import {
  AccountService,
  MovieHttpService,
  NotificationsService,
  TvHttpService,
} from '@ng-filmpire/core-data';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import * as GlobalSelectors from '../global/global.selectors';
import * as GlobalActions from '../global/global.actions';
import * as AuthSelectors from '../auth/auth.selectors';
import {
  selectRouteParams,
  selectUrlFragments,
} from '../router/router.selectors';
import * as MediaInfoActions from './media-info.actions';
import { SelectedMedia } from '@ng-filmpire/api-interfaces';

@Injectable()
export class MediaInfoEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private movieHttp = inject(MovieHttpService);
  private tvHttp = inject(TvHttpService);
  private accountHttp = inject(AccountService);
  private notifications = inject(NotificationsService);

  onNavigateToMediaInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(selectRouteParams),
        this.store.select(selectUrlFragments),
      ]),
      filter(
        ([, , urlFragments]) =>
          urlFragments[0] === 'movie' || urlFragments[0] === 'tv'
      ),
      map(([, { id }, urlFragments]) => ({
        currentMedia: urlFragments[0] as SelectedMedia,
        id: Number(id),
      })),
      filter(({ currentMedia, id }) => !!currentMedia && !!id),
      switchMap(({ currentMedia, id }) => [
        currentMedia === 'movie'
          ? MediaInfoActions.mediaInfoAction.loadMovieInfo({ id })
          : MediaInfoActions.mediaInfoAction.loadTVInfo({ id }),
        GlobalActions.globalAction.setCurrentMedia({ currentMedia }),
      ])
    );
  });

  loadAccountState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(AuthSelectors.selectIsAuthenticated),
        this.store.select(GlobalSelectors.selectCurrentMedia),
        this.store.select(selectRouteParams),
        this.store.select(selectUrlFragments),
      ]),
      filter(
        ([, , , , urlFragments]) =>
          urlFragments[0] === 'movie' || urlFragments[0] === 'tv'
      ),
      map(([isAuthenticated, , currentMedia, { id }]) => ({
        currentMedia,
        id: Number(id),
        isAuthenticated,
      })),
      filter(
        ({ isAuthenticated, currentMedia, id }) =>
          isAuthenticated && !!currentMedia && !!id
      ),
      map(({ currentMedia, id }) =>
        currentMedia === 'movie'
          ? MediaInfoActions.mediaInfoAction.loadMovieAccountInfo({ id })
          : MediaInfoActions.mediaInfoAction.loadTVAccountInfo({ id })
      )
    );
  });

  loadMovieInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaInfoActions.mediaInfoAction.loadMovieInfo),
      filter(({ id }) => !!id),
      switchMap(({ id }) =>
        this.movieHttp.getMovieDetails(id).pipe(
          map((mediaInfo) =>
            MediaInfoActions.mediaInfoApiActions.loadMovieInfoSuccess({
              mediaInfo,
            })
          ),
          catchError((e) =>
            of(MediaInfoActions.mediaInfoApiActions.loadMovieInfoFailure(e))
          )
        )
      )
    );
  });

  loadMovieAccountState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaInfoActions.mediaInfoAction.loadMovieAccountInfo),
      concatLatestFrom(() => [
        this.store.select(AuthSelectors.selectIsAuthenticated),
        this.store.select(GlobalSelectors.selectCurrentMedia),
      ]),
      filter(([{ id }, isAuthenticated]) => !!id && isAuthenticated),
      map(([{ id }]) => ({
        id: Number(id),
        sessionId: localStorage.getItem('session_id') as string,
      })),
      switchMap(({ id, sessionId }) =>
        this.movieHttp.getMovieAccountState(id, sessionId).pipe(
          map((account) =>
            MediaInfoActions.mediaInfoApiActions.loadMovieAccountInfoSuccess({
              account,
            })
          ),
          catchError((e) =>
            of(
              MediaInfoActions.mediaInfoApiActions.loadMovieAccountInfoFailure(
                e
              )
            )
          )
        )
      )
    );
  });

  loadTVInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaInfoActions.mediaInfoAction.loadTVInfo),
      filter(({ id }) => !!id),
      switchMap(({ id }) =>
        this.tvHttp.getTVShowDetails(id).pipe(
          map((mediaInfo) =>
            MediaInfoActions.mediaInfoApiActions.loadTVInfoSuccess({
              mediaInfo,
            })
          ),
          catchError((e) =>
            of(MediaInfoActions.mediaInfoApiActions.loadTVInfoFailure(e))
          )
        )
      )
    );
  });

  loadTVAccountState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaInfoActions.mediaInfoAction.loadTVAccountInfo),
      concatLatestFrom(() => [
        this.store.select(AuthSelectors.selectIsAuthenticated),
        this.store.select(GlobalSelectors.selectCurrentMedia),
      ]),
      filter(([{ id }, isAuthenticated]) => !!id && isAuthenticated),
      map(([{ id }]) => ({
        id: Number(id),
        sessionId: localStorage.getItem('session_id') as string,
      })),
      switchMap(({ id, sessionId }) =>
        this.tvHttp.getTVAccountState(id, sessionId).pipe(
          map((account) =>
            MediaInfoActions.mediaInfoApiActions.loadTVAccountInfoSuccess({
              account,
            })
          ),
          catchError((e) =>
            of(MediaInfoActions.mediaInfoApiActions.loadTVAccountInfoFailure(e))
          )
        )
      )
    );
  });

  addToFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaInfoActions.mediaInfoAction.addToFavorite),
      concatLatestFrom(() => [
        this.store.select(GlobalSelectors.selectCurrentMedia),
        this.store.select(AuthSelectors.selectUser),
      ]),
      filter(([, currentMedia, user]) => !!user && !!currentMedia),
      map(([{ mediaId, favorite }, currentMedia, user]) => ({
        id: Number(mediaId),
        mediaType: currentMedia,
        favorite,
        sessionId: localStorage.getItem('session_id') as string,
        accountId: String(user?.id) as string,
      })),
      switchMap(({ id, mediaType, favorite, sessionId, accountId }) =>
        this.accountHttp
          .addToFavourite(id, mediaType, favorite, sessionId, accountId)
          .pipe(
            map(() =>
              MediaInfoActions.mediaInfoApiActions.addToFavoriteSuccess({
                favorite,
              })
            )
          )
      )
    );
  });

  addToWatchlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaInfoActions.mediaInfoAction.addToWatchlist),
      concatLatestFrom(() => [
        this.store.select(GlobalSelectors.selectCurrentMedia),
        this.store.select(AuthSelectors.selectUser),
      ]),
      filter(([, currentMedia, user]) => !!user && !!currentMedia),
      map(([{ mediaId, watchlist }, currentMedia, user]) => ({
        id: Number(mediaId),
        mediaType: currentMedia,
        watchlist,
        sessionId: localStorage.getItem('session_id') as string,
        accountId: String(user?.id) as string,
      })),
      switchMap(({ id, mediaType, watchlist, sessionId, accountId }) =>
        this.accountHttp
          .addToFavourite(id, mediaType, watchlist, sessionId, accountId)
          .pipe(
            map(() =>
              MediaInfoActions.mediaInfoApiActions.addToWatchlistSuccess({
                watchlist,
              })
            )
          )
      )
    );
  });

  mediaInfoError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          MediaInfoActions.mediaInfoApiActions.addToFavoriteFailure,
          MediaInfoActions.mediaInfoApiActions.addToWatchlistFailure,
          MediaInfoActions.mediaInfoApiActions.loadMovieAccountInfoFailure,
          MediaInfoActions.mediaInfoApiActions.loadMovieInfoFailure,
          MediaInfoActions.mediaInfoApiActions.loadTVAccountInfoFailure,
          MediaInfoActions.mediaInfoApiActions.loadTVInfoFailure
        ),
        tap(() =>
          this.notifications.openSnackBar(
            'Failed to load media info. Please try again later'
          )
        )
      );
    },
    { dispatch: false }
  );
}
