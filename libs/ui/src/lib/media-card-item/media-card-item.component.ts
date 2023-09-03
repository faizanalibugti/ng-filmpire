import { Component, Input } from '@angular/core';
import { Movie, TvShow } from '@ng-filmpire/api-interfaces';

@Component({
  selector: 'ng-filmpire-media-card-item',
  templateUrl: './media-card-item.component.html',
  styleUrls: ['./media-card-item.component.scss'],
})
export class MediaCardItemComponent {
  @Input() media!: Movie | TvShow;

  isMovie(media: Movie | TvShow): media is Movie {
    return (media as Movie).release_date !== undefined;
  }

  isTVShow(media: Movie | TvShow): media is TvShow {
    return (media as TvShow).first_air_date !== undefined;
  }
}
