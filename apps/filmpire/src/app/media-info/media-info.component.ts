import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  AccountStates,
  MovieDetail,
  SelectedMedia,
  TvShowDetail,
  Video,
} from '@ng-filmpire/api-interfaces';
import {
  AccountService,
  MovieHttpService,
  TvHttpService,
} from '@ng-filmpire/core-data';
import { MediaVideosDialogComponent } from '@ng-filmpire/ui';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ng-filmpire-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.scss'],
})
export class MediaInfoComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  currentSelectedMedia!: SelectedMedia;
  mediaDetails$!: Observable<TvShowDetail | MovieDetail>;
  accountState!: AccountStates;

  languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

  accountId!: number | undefined;

  constructor(
    private movieHttp: MovieHttpService,
    private tvHttp: TvHttpService,
    private accountHttp: AccountService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.accountId = this.accountHttp.accountId;

    const firstUrlSegment = this.route.snapshot.url[0];

    if (firstUrlSegment) {
      this.currentSelectedMedia = firstUrlSegment.path as SelectedMedia;
    }

    this.mediaDetails$ = this.route.params.pipe(
      filter(({ id }) => !!id),
      map(({ id }) => Number(id)),
      switchMap((id: number) =>
        this.currentSelectedMedia === 'tv'
          ? this.tvHttp.getTVShowDetails(id)
          : this.movieHttp.getMovieDetails(id)
      ),
      tap(() => {
        this.scrollToTop();
      })
    );

    if (this.accountId) {
      this.route.params
        .pipe(
          filter(({ id }) => !!id),
          map(({ id }) => Number(id)),
          switchMap((id: number) =>
            this.currentSelectedMedia === 'tv'
              ? this.tvHttp.getTVAccountState(id)
              : this.movieHttp.getMovieAccountState(id)
          )
        )
        .subscribe((data) => (this.accountState = data));
    }
  }

  openVideosDialog(videos: Video[]) {
    this.dialog.open(MediaVideosDialogComponent, {
      data: {
        videos,
      },
    });
  }

  addToFavorite(mediaId: number, media: SelectedMedia, favorite: boolean) {
    this.accountHttp.addToFavourite(mediaId, media, favorite).subscribe(() => {
      this.accountState = {
        ...this.accountState,
        favorite,
      };
    });
  }

  addToWatchlist(mediaId: number, media: SelectedMedia, watchlist: boolean) {
    this.accountHttp.addToWatchList(mediaId, media, watchlist).subscribe(() => {
      this.accountState = {
        ...this.accountState,
        watchlist,
      };
    });
  }

  scrollToTop() {
    this.topOfPage?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  navigateToPreviousPage() {
    this.location.back();
  }

  isMovie(media: MovieDetail | TvShowDetail): media is MovieDetail {
    return (media as MovieDetail).release_date !== undefined;
  }

  isTV(media: MovieDetail | TvShowDetail): media is TvShowDetail {
    return (media as TvShowDetail).first_air_date !== undefined;
  }
}
