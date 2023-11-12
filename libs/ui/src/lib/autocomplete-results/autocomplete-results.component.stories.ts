import type { Meta, StoryObj } from '@storybook/angular';
import { AutocompleteResultsComponent } from './autocomplete-results.component';

const meta: Meta<AutocompleteResultsComponent> = {
  component: AutocompleteResultsComponent,
  title: 'AutocompleteResultsComponent',
};
export default meta;
type Story = StoryObj<AutocompleteResultsComponent>;

export const Movie: Story = {
  args: {
    result: {
      adult: false,
      backdrop_path: '/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
      id: 872585,
      title: 'Oppenheimer',
      original_language: 'en',
      original_title: 'Oppenheimer',
      overview:
        'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
      poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      media_type: 'movie',
      genre_ids: [18, 36],
      popularity: 704.491,
      release_date: new Date('2023-07-19'),
      video: false,
      vote_average: 8.241,
      vote_count: 4124,
    },
  },
};

export const TvShow: Story = {
  args: {
    result: {
      adult: false,
      backdrop_path: '/foGkPxpw9h8zln81j63mix5B7m8.jpg',
      id: 71912,
      name: 'The Witcher',
      original_language: 'en',
      original_name: 'The Witcher',
      overview:
        'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
      poster_path: '/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
      media_type: 'tv',
      genre_ids: [18, 10759, 10765],
      popularity: 274.113,
      first_air_date: new Date('2019-12-20'),
      vote_average: 8.122,
      vote_count: 5240,
      origin_country: ['US'],
    },
  },
};

export const Person: Story = {
  args: {
    result: {
      adult: false,
      id: 73968,
      name: 'Henry Cavill',
      original_name: 'Henry Cavill',
      media_type: 'person',
      popularity: 59.828,
      gender: 2,
      known_for_department: 'Acting',
      profile_path: '/iWdKjMry5Pt7vmxU7bmOQsIUyHa.jpg',
      known_for: [
        {
          adult: false,
          backdrop_path: '/69EFgWWPFWbRNHmQgYdSnyJ94Ge.jpg',
          id: 49521,
          title: 'Man of Steel',
          original_language: 'en',
          original_title: 'Man of Steel',
          overview:
            'A young boy learns that he has extraordinary powers and is not of this earth. As a young man, he journeys to discover where he came from and what he was sent here to do. But the hero in him must emerge if he is to save the world from annihilation and become the symbol of hope for all mankind.',
          poster_path: '/dksTL9NXc3GqPBRHYHcy1aIwjS.jpg',
          media_type: 'movie',
          genre_ids: [28, 12, 878],
          popularity: 48.081,
          release_date: new Date('2013-06-12'),
          video: false,
          vote_average: 6.616,
          vote_count: 14391,
        },
        {
          adult: false,
          backdrop_path: '/5fX1oSGuYdKgwWmUTAN5MNSQGzr.jpg',
          id: 209112,
          title: 'Batman v Superman: Dawn of Justice',
          original_language: 'en',
          original_title: 'Batman v Superman: Dawn of Justice',
          overview:
            'Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior, while the world wrestles with what sort of hero it really needs. And with Batman and Superman at war with one another, a new threat quickly arises, putting mankind in greater danger than it’s ever known before.',
          poster_path: '/5UsK3grJvtQrtzEgqNlDljJW96w.jpg',
          media_type: 'movie',
          genre_ids: [28, 12, 14],
          popularity: 77.355,
          release_date: new Date('2016-03-23'),
          video: false,
          vote_average: 5.955,
          vote_count: 17163,
        },
        {
          adult: false,
          backdrop_path: '/2nyaeISu2xIxIgZYNpX4UayY8PN.jpg',
          id: 141052,
          title: 'Justice League',
          original_language: 'en',
          original_title: 'Justice League',
          overview:
            "Fuelled by his restored faith in humanity and inspired by Superman's selfless act, Bruce Wayne and Diana Prince assemble a team of metahumans consisting of Barry Allen, Arthur Curry and Victor Stone to face the catastrophic threat of Steppenwolf and the Parademons who are on the hunt for three Mother Boxes on Earth.",
          poster_path: '/eifGNCSDuxJeS1loAXil5bIGgvC.jpg',
          media_type: 'movie',
          genre_ids: [28, 12, 878],
          popularity: 64.035,
          release_date: new Date('2017-11-15'),
          video: false,
          vote_average: 6.095,
          vote_count: 12316,
        },
      ],
    },
  },
};
