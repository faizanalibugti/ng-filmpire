import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { GenreHttpService } from '@ng-filmpire/core-data';

@Component({
  selector: 'ng-filmpire-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('snav') mobileSidenav!: MatSidenav;

  darkMode = false;
  activeGenreOrCategory: string | number = 'popular';
  moiveGenres$ = this.genreHttp.getMovieGenres();

  constructor(private genreHttp: GenreHttpService) {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  toggleMobileSidenav() {
    this.mobileSidenav.toggle();
  }
}
