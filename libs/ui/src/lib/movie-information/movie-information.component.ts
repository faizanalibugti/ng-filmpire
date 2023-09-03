import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MovieDetail,
  SelectedMedia,
  TvShowDetail,
} from '@ng-filmpire/api-interfaces';
import { MovieHttpService, TvHttpService } from '@ng-filmpire/core-data';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'ng-filmpire-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.scss'],
})
export class MovieInformationComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  currentSelectedMedia!: SelectedMedia;
  mediaDetails$!: Observable<TvShowDetail | MovieDetail>;

  constructor(
    private movieHttp: MovieHttpService,
    private tvHttp: TvHttpService,
    private route: ActivatedRoute
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

  scrollToTop() {
    this.topOfPage?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  isMovie(media: MovieDetail | TvShowDetail): media is MovieDetail {
    return (media as MovieDetail).release_date !== undefined;
  }

  isTV(media: MovieDetail | TvShowDetail): media is TvShowDetail {
    return (media as TvShowDetail).first_air_date !== undefined;
  }
}
