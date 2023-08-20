import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseEntity, Movie } from '@ng-filmpire/api-interfaces';
import { MovieHttpService } from '@ng-filmpire/core-data';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'ng-filmpire-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  categoryOrGenreChanged$!: Observable<Params>;
  moviesList$: Observable<BaseEntity<Movie>> = this.movieHttp.getMovies();
  currentGenreOrCategory!: number | string;

  constructor(
    private movieHttp: MovieHttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryOrGenreChanged$ = this.route.params.pipe(
      tap(({ id }) => {
        this.scrollToTop();
        this.currentGenreOrCategory = Number(id) ? Number(id) : String(id);
        this.moviesList$ = this.movieHttp.getMovies(
          this.currentGenreOrCategory
        );
      })
    );
  }

  goToPage(page: PageEvent) {
    this.moviesList$ = this.movieHttp.getMovies(
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
}
