import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { GenreHttpService, NotificationsService } from '@ng-filmpire/core-data';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  fromEvent,
  map,
  merge,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { selectRouteParams } from '../router/router.selectors';
import * as GlobalActions from './global.actions';
import {
  selectCurrentMedia,
  selectMovieGenres,
  selectTVGenres,
} from './global.selectors';

@Injectable()
export class GlobalEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);
  private genreHttp = inject(GenreHttpService);
  private notifications = inject(NotificationsService);

  initGlobal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => this.store.select(selectRouteParams)),
      filter(([, { media, id }]) => id && media),
      map(([, { media, id }]) => ({
        id: Number(id) ? Number(id) : String(id),
        media,
      })),
      switchMap(({ media, id }) => [
        GlobalActions.globalAction.setCurrentMedia({ currentMedia: media }),
        GlobalActions.globalAction.setGenreCategory({ genreOrCategory: id }),
      ])
    );
  });

  isMobile$ = createEffect(() => {
    return this.breakpointObserver
      .observe(['(max-width: 640px)'])
      .pipe(
        switchMap((mediaQuery) =>
          of(mediaQuery.matches).pipe(
            map((isMobile) =>
              GlobalActions.globalAction.setMobileBreakpoint({ isMobile })
            )
          )
        )
      );
  });

  internetConnectivity$ = createEffect(() => {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    ).pipe(
      map((online) =>
        online
          ? GlobalActions.globalAction.setConnectivity({ network: 'online' })
          : GlobalActions.globalAction.setConnectivity({ network: 'offline' })
      )
    );
  });

  loadGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED, GlobalActions.globalAction.setCurrentMedia),
      concatLatestFrom(() => [
        this.store.select(selectCurrentMedia),
        this.store.select(selectMovieGenres),
        this.store.select(selectTVGenres),
      ]),
      map(([, currentMedia, movieGenres, tvGenres]) => [
        currentMedia,
        movieGenres,
        tvGenres,
      ]),
      filter(
        ([currentMedia, movieGenres, tvGenres]) =>
          (currentMedia === 'movie' && movieGenres.length === 0) ||
          (currentMedia === 'tv' && tvGenres.length === 0)
      ),
      map(([currentMedia]) =>
        currentMedia === 'movie'
          ? GlobalActions.globalAction.loadMovieGenres()
          : GlobalActions.globalAction.loadTVGenres()
      )
    );
  });

  loadMovieGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GlobalActions.globalAction.loadMovieGenres),
      switchMap(() =>
        this.genreHttp.getMovieGenres().pipe(
          map(({ genres }) =>
            GlobalActions.globalApiActions.loadMovieGenresSuccess({
              genres: genres,
            })
          ),
          catchError((error) =>
            of(GlobalActions.globalApiActions.loadMovieGenresFailure({ error }))
          )
        )
      )
    );
  });

  loadTVGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GlobalActions.globalAction.loadTVGenres),
      switchMap(() =>
        this.genreHttp.getTVGenres().pipe(
          map(({ genres }) =>
            GlobalActions.globalApiActions.loadTVGenresSuccess({
              genres: genres,
            })
          ),
          catchError((error) =>
            of(GlobalActions.globalApiActions.loadTVGenresFailure({ error }))
          )
        )
      )
    );
  });

  loadGenreError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          GlobalActions.globalApiActions.loadMovieGenresFailure,
          GlobalActions.globalApiActions.loadTVGenresFailure
        ),
        tap(() =>
          this.notifications.openSnackBar(
            'Failed to load genres. Please try again later'
          )
        )
      );
    },
    { dispatch: false }
  );

  showConnectivityMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GlobalActions.globalAction.setConnectivity),
        tap(({ network }) =>
          this.notifications.openSnackBar(
            network === 'offline'
              ? "You're offline. Check your connection."
              : 'Internet connected. Please refresh the page'
          )
        )
      );
    },
    { dispatch: false }
  );
}
