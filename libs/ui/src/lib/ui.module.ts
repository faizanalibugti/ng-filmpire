import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreDataModule } from '@ng-filmpire/core-data';
import { MaterialModule } from '@ng-filmpire/material';
import { FeaturedMediaSliderComponent } from './featured-media-slider/featured-media-slider.component';
import { MediaCardItemComponent } from './media-card-item/media-card-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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
    NavbarComponent,
    SidebarComponent,
    FeaturedMediaSliderComponent,
    MediaCardItemComponent,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    MediaCardItemComponent,
    FeaturedMediaSliderComponent,
  ],
})
export class UiModule {}
