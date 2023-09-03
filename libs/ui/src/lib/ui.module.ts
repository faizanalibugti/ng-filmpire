import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreDataModule } from '@ng-filmpire/core-data';
import { MaterialModule } from '@ng-filmpire/material';
import { ActorsComponent } from './actors/actors.component';
import { MovieInformationComponent } from './movie-information/movie-information.component';
import { MoviesComponent } from './movies/movies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FeaturedMediaSliderComponent } from './featured-media-slider/featured-media-slider.component';
import { MediaCardItemComponent } from './media-card-item/media-card-item.component';
@NgModule({
  imports: [
    CommonModule,
    CoreDataModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    NgOptimizedImage,
  ],
  declarations: [
    ActorsComponent,
    MovieInformationComponent,
    MoviesComponent,
    NavbarComponent,
    ProfileComponent,
    SidebarComponent,
    FeaturedMediaSliderComponent,
    MediaCardItemComponent,
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
