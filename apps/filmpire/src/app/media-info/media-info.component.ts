import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetail, TvShowDetail, Video } from '@ng-filmpire/api-interfaces';
import { MediaVideosDialogComponent } from '@ng-filmpire/ui';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mediaInfoAction } from '../+state/media-info/media-info.actions';
import { MediaInfoPage } from '../+state/media-info/models/media-info.model';
import { selectMediaInfoPage } from '../+state/media-info/views/media-info-view.selectors';

@Component({
  selector: 'ng-filmpire-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.scss'],
})
export class MediaInfoComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  mediaInfoPage!: Observable<MediaInfoPage>;

  languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.mediaInfoPage = this.store.select(selectMediaInfoPage);
  }

  openVideosDialog(videos: Video[]) {
    this.dialog.open(MediaVideosDialogComponent, {
      data: {
        videos,
      },
    });
  }

  addToFavorite(mediaId: number, favorite: boolean) {
    this.store.dispatch(mediaInfoAction.addToFavorite({ mediaId, favorite }));
  }

  addToWatchlist(mediaId: number, watchlist: boolean) {
    this.store.dispatch(mediaInfoAction.addToWatchlist({ mediaId, watchlist }));
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
