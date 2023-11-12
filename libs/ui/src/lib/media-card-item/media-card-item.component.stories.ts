import { CoreDataModule } from '@ng-filmpire/core-data';
import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { MediaCardItemComponent } from './media-card-item.component';
import { MaterialModule } from '@ng-filmpire/material';

export default {
  title: 'MediaCardItem',
  component: MediaCardItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CoreDataModule, MaterialModule],
    }),
    componentWrapperDecorator(
      (story) => `<div class="grid grid-cols-card">${story}</div>`
    ),
  ],
} as Meta<MediaCardItemComponent>;

export const Movie = {
  args: {
    media: {
      original_title: 'Mission: Impossible - Dead Reckoning Part One',
      overview:
        "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.",
      poster_path: '/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
      release_date: '2023-07-08',
      title: 'Mission: Impossible - Dead Reckoning Part One',
      vote_average: 7.727,
    },
  },
};

export const TV = {
  args: {
    media: {
      name: 'Loki',
      original_language: 'en',
      original_name: 'Loki',
      first_air_date: '2021-06-09',
      poster_path: '/voHUmluYmKyleFkTu3lOXQG702u.jpg',
      media_type: 'tv',
      vote_average: 8.164,
    },
  },
};

export const ImageLoading = {
  args: {
    media: {
      name: 'Loki',
      original_name: 'Loki',
      poster_path: 'image',
      media_type: 'tv',
      first_air_date: '2021-06-09',
      vote_average: 8.164,
    },
    imageLoading: true,
  },
};

export const FallbackImage = {
  args: {
    media: {
      name: 'Loki',
      original_name: 'Loki',
      poster_path: '',
      media_type: 'tv',
      first_air_date: '2021-06-09',
      vote_average: 8.164,
    },
    imageLoading: false,
  },
};
