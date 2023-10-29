import { MaterialModule } from '@ng-filmpire/material';
import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { FeaturedMediaSliderComponent } from './featured-media-slider.component';

export default {
  title: 'FeaturedMediaSliderComponent',
  component: FeaturedMediaSliderComponent,
  decorators: [
    moduleMetadata({
      imports: [MaterialModule],
    }),
    componentWrapperDecorator(
      (story) => `<div class="grid grid-cols-card">
                    <div class="col-[1/-1] mb-10 h-[490px] cursor-pointer justify-end"> 
                      ${story}
                    </div>
                  </div>`
    ),
  ],
} as Meta<FeaturedMediaSliderComponent>;

export const Primary = {
  render: (args: FeaturedMediaSliderComponent) => ({
    props: args,
  }),
  args: {
    slides: [
      {
        backdrop_path: '/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg',
        name: 'Loki',
        original_language: 'en',
        original_name: 'Loki',
        overview:
          'After stealing the Tesseract during the events of “Avengers: Endgame,” an alternate version of Loki is brought to the mysterious Time Variance Authority, a bureaucratic organization that exists outside of time and space and monitors the timeline. They give Loki a choice: face being erased from existence due to being a “time variant” or help fix the timeline and stop a greater threat.',
        media_type: 'tv',
      },
      {
        backdrop_path: '/628Dep6AxEtDxjZoGP78TsOxYbK.jpg',
        original_language: 'en',
        original_title: 'Mission: Impossible - Dead Reckoning Part One',
        overview:
          "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.",
        popularity: 1956.457,
        poster_path: '/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
        release_date: '2023-07-08',
        title: 'Mission: Impossible - Dead Reckoning Part One',
        video: false,
        vote_average: 7.727,
        vote_count: 1888,
      },
    ],
  },
};
