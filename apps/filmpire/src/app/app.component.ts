import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SelectedMedia } from '@ng-filmpire/api-interfaces';
import { GenreHttpService } from '@ng-filmpire/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-filmpire-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild('snav') mobileSidenav!: MatSidenav;

  darkMode = false;
  currentMedia: SelectedMedia = 'movie';
  activeGenreOrCategory: string | number = 'popular';
  mediaGenres$ = this.genreHttp.getMovieGenres();
  mediaQuery$: Observable<BreakpointState> = this.breakpointObserver.observe([
    '(max-width: 640px)',
  ]);

  constructor(
    private genreHttp: GenreHttpService,
    private breakpointObserver: BreakpointObserver
  ) {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  toggleMobileSidenav() {
    this.mobileSidenav.toggle();
  }

  setGenres(media: SelectedMedia) {
    if (media === 'movie') {
      this.mediaGenres$ = this.genreHttp.getMovieGenres();
    } else {
      this.mediaGenres$ = this.genreHttp.getTVGenres();
    }

    this.currentMedia = media;
  }
}
