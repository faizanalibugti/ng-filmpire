import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  MovieDetail,
  SelectedMedia,
  TvShowDetail,
  Video,
} from '@ng-filmpire/api-interfaces';
import { MovieHttpService, TvHttpService } from '@ng-filmpire/core-data';
import { MediaVideosDialogComponent } from '@ng-filmpire/ui';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ng-filmpire-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaInfoComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  currentSelectedMedia!: SelectedMedia;
  mediaDetails$!: Observable<TvShowDetail | MovieDetail>;

  languageNames = new Intl.DisplayNames(['en'], { type: 'language' });

  constructor(
    private movieHttp: MovieHttpService,
    private tvHttp: TvHttpService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
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
  }

  openVideosDialog(videos: Video[]) {
    this.dialog.open(MediaVideosDialogComponent, {
      data: {
        videos,
      },
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
