import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorsComponent } from './actors/actors.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';
import { MoviesComponent } from './movies/movies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '@ng-filmpire/material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterModule],
  declarations: [
    ActorsComponent,
    MovieInformationComponent,
    MoviesComponent,
    NavbarComponent,
    ProfileComponent,
    SidebarComponent,
  ],
  exports: [
    ActorsComponent,
    MovieInformationComponent,
    MoviesComponent,
    NavbarComponent,
    ProfileComponent,
    SidebarComponent,
  ],
})
export class UiModule {}
