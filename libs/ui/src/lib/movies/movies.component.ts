import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BaseEntity, Movie } from '@ng-filmpire/api-interfaces';
import { MovieHttpService } from '@ng-filmpire/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-filmpire-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  @ViewChild('topOfPage') topOfPage!: ElementRef;

  moviesList$: Observable<BaseEntity<Movie>> =
    this.movieHttp.loadPopularMovies();

  constructor(private movieHttp: MovieHttpService) {}

  goToPage(page: PageEvent) {
    this.moviesList$ = this.movieHttp.loadPopularMovies(page.pageIndex + 1);

    this.topOfPage.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
