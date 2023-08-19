import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'ng-filmpire-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('snav') mobileSidenav!: MatSidenav;

  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  toggleMobileSidenav() {
    this.mobileSidenav.toggle();
  }
}
