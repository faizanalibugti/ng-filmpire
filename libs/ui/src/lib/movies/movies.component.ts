import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import {
  BaseEntity,
  Movie,
  SelectedMedia,
  TvShow,
} from '@ng-filmpire/api-interfaces';
import { MovieHttpService, TvHttpService } from '@ng-filmpire/core-data';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ng-filmpire-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  mediaList$!: Observable<BaseEntity<TvShow | Movie>>;

  currentGenreOrCategory!: number | string;
  currentSelectedMedia!: SelectedMedia;

  constructor(
    private movieHttp: MovieHttpService,
    private tvHttp: TvHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mediaList$ = this.route.params.pipe(
      filter(({ media, id }) => !!media && !!id),
      map(({ media, id }) => ({
        id: Number(id) ? Number(id) : String(id),
        media,
      })),
      tap(({ media, id }) => {
        this.currentSelectedMedia = media;
        this.currentGenreOrCategory = id;
      }),
      switchMap(({ id, media }) =>
        (media as SelectedMedia) === 'tv'
          ? this.tvHttp.getTVShows(id)
          : this.movieHttp.getMovies(id)
      ),
      tap(() => {
        this.scrollToTop();
      })
    );
  }

  goToPage(page: PageEvent) {
    this.mediaList$ =
      this.currentSelectedMedia === 'tv'
        ? this.tvHttp.getTVShows(
            this.currentGenreOrCategory,
            page.pageIndex + 1
          )
        : this.movieHttp.getMovies(
            this.currentGenreOrCategory,
            page.pageIndex + 1
          );

    this.scrollToTop();
  }

  scrollToTop() {
    this.topOfPage?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  isMovie(media: Movie | TvShow): media is Movie {
    return (media as Movie).release_date !== undefined;
  }

  isTVShow(media: Movie | TvShow): media is TvShow {
    return (media as TvShow).first_air_date !== undefined;
  }
}
