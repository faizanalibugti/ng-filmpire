import { Injectable, inject } from '@angular/core';
import {
  MovieHttpService,
  NotificationsService,
  TvHttpService,
} from '@ng-filmpire/core-data';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  fromEvent,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs';
import * as GlobalActions from '../global/global.actions';
import * as GlobalSelectors from '../global/global.selectors';
import { selectUrlFragments } from '../router/router.selectors';
import * as MediaListActions from './media-list.actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { selectAllMediaList, selectPagination } from './media-list.selectors';

@Injectable()
export class MediaListEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private movieHttp = inject(MovieHttpService);
  private tvHttp = inject(TvHttpService);
  private notifications = inject(NotificationsService);

  loadMediaList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GlobalActions.globalAction.setGenreCategory),
      concatLatestFrom(() => [
        this.store.select(GlobalSelectors.selectCurrentMedia),
        this.store.select(selectUrlFragments),
      ]),
      filter(
        ([, , urlFragments]) =>
          urlFragments.includes('genre') || urlFragments.includes('category')
      ),
      map(([{ genreOrCategory }, currentMedia]) => ({
        currentMedia,
        genre: genreOrCategory,
      })),
      filter(({ currentMedia, genre }) => !!currentMedia && !!genre),
      map(({ currentMedia, genre }) =>
        currentMedia === 'movie'
          ? MediaListActions.mediaListAction.loadMovieList({ genre })
          : MediaListActions.mediaListAction.loadTVList({ genre })
      )
    );
  });

  loadMovieList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaListActions.mediaListAction.loadMovieList),
      switchMap(({ genre }) =>
        this.movieHttp.getMovies(genre).pipe(
          map((mediaList) =>
            MediaListActions.mediaListApiActions.loadMovieListSuccess({
              mediaList,
            })
          ),
          catchError((error) =>
            of(
              MediaListActions.mediaListApiActions.loadMovieListFailure({
                error,
              })
            )
          )
        )
      )
    );
  });

  loadTVList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaListActions.mediaListAction.loadTVList),
      switchMap(({ genre }) =>
        this.tvHttp.getTVShows(genre).pipe(
          map((mediaList) =>
            MediaListActions.mediaListApiActions.loadTVListSuccess({
              mediaList,
            })
          ),
          catchError((error) =>
            of(
              MediaListActions.mediaListApiActions.loadTVListFailure({
                error,
              })
            )
          )
        )
      )
    );
  });

  infiniteScroll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [this.store.select(selectUrlFragments)]),
      filter(
        ([, urlFragments]) =>
          urlFragments.includes('genre') || urlFragments.includes('category')
      ),
      switchMap(() => {
        const mainContainer = document.querySelector(
          '.mat-sidenav-content'
        ) as Element;

        return fromEvent(mainContainer, 'scroll').pipe(
          throttleTime(10), // only emit every 10 ms
          map(
            () =>
              mainContainer.scrollHeight -
              mainContainer.scrollTop -
              mainContainer.clientHeight
          ), // get vertical scroll position
          filter((distanceFromBottom) => distanceFromBottom <= 150),
          concatLatestFrom(() => [
            this.store.select(selectPagination),
            this.store.select(selectAllMediaList),
          ]),
          filter(([, pagination, mediaList]) =>
            mediaList.length > 0 && pagination
              ? pagination?.page + 1 <= pagination?.total_pages
              : false
          ),
          map(([, pagination]) =>
            MediaListActions.mediaListAction.changePage({
              page: pagination?.page ? pagination.page + 1 : 1,
            })
          ),
          takeUntil(
            this.actions$.pipe(
              ofType(ROUTER_NAVIGATED),
              (concatLatestFrom(() => [this.store.select(selectUrlFragments)]),
              filter(
                ([, urlFragments]) =>
                  !urlFragments.includes('genre') ||
                  !urlFragments.includes('category')
              ))
            )
          )
        );
      })
    );
  });

  changePage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MediaListActions.mediaListAction.changePage),
      concatLatestFrom(() => [
        this.store.select(GlobalSelectors.selectCurrentMedia),
        this.store.select(GlobalSelectors.selectActiveGenreCategory),
      ]),
      map(([{ page }, currentMedia, genre]) => ({
        page,
        currentMedia,
        genre,
      })),
      filter(({ currentMedia, genre }) => !!currentMedia && !!genre),
      switchMap(({ page, currentMedia, genre }) =>
        currentMedia === 'movie'
          ? this.movieHttp.getMovies(genre, page).pipe(
              map((mediaList) =>
                MediaListActions.mediaListApiActions.changePageSuccess({
                  mediaList,
                })
              ),
              catchError((error) =>
                of(
                  MediaListActions.mediaListApiActions.changePageFailure({
                    error,
                  })
                )
              )
            )
          : this.tvHttp.getTVShows(genre, page).pipe(
              map((mediaList) =>
                MediaListActions.mediaListApiActions.changePageSuccess({
                  mediaList,
                })
              ),
              catchError((error) =>
                of(
                  MediaListActions.mediaListApiActions.changePageFailure({
                    error,
                  })
                )
              )
            )
      )
    );
  });

  loadMediaListError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          MediaListActions.mediaListApiActions.loadMovieListFailure,
          MediaListActions.mediaListApiActions.loadTVListFailure,
          MediaListActions.mediaListApiActions.changePageFailure
        ),
        tap(() =>
          this.notifications.openSnackBar(
            'Failed to load media list. Please try again later'
          )
        )
      );
    },
    { dispatch: false }
  );
}
