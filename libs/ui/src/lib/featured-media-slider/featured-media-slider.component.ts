import { Component, Input } from '@angular/core';
import { Movie, TvShow } from '@ng-filmpire/api-interfaces';

@Component({
  selector: 'ng-filmpire-featured-media-slider',
  templateUrl: './featured-media-slider.component.html',
  styleUrls: ['./featured-media-slider.component.scss'],
})
export class FeaturedMediaSliderComponent {
  @Input() slides: (Movie | TvShow)[] = [];

  currentIndex = 0;

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url(https://image.tmdb.org/t/p/w780${
      this.slides[this.currentIndex].backdrop_path
    })`;
  }

  isMovie(media: Movie | TvShow): media is Movie {
    return (media as Movie).release_date !== undefined;
  }
}
