import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '@ng-filmpire/material';

export default {
  title: 'SidebarComponent',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [MaterialModule],
    }),
    componentWrapperDecorator(
      (story) => `
    <mat-sidenav-container
      class="absolute bottom-0 left-0 right-0 top-0 flex h-screen flex-col"
    >
      <mat-sidenav  
        mode="'side'"
        position="'start'"
        opened="true"
        class="w-[240px] overflow-y-hidden dark:bg-[#121212]"
      >
        ${story}
      </mat-sidenav>
    </mat-sidenav-container>
    `
    ),
  ],
} as Meta<SidebarComponent>;

export const Movie = {
  render: (args: SidebarComponent) => ({
    props: args,
  }),
  args: {
    darkMode: false,
    currentMedia: 'movie',
    genres: [
      {
        id: 28,
        name: 'Action',
      },
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 80,
        name: 'Crime',
      },
      {
        id: 99,
        name: 'Documentary',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
      {
        id: 36,
        name: 'History',
      },
      {
        id: 27,
        name: 'Horror',
      },
      {
        id: 10402,
        name: 'Music',
      },
      {
        id: 9648,
        name: 'Mystery',
      },
      {
        id: 10749,
        name: 'Romance',
      },
      {
        id: 878,
        name: 'Science Fiction',
      },
      {
        id: 10770,
        name: 'TV Movie',
      },
      {
        id: 53,
        name: 'Thriller',
      },
      {
        id: 10752,
        name: 'War',
      },
      {
        id: 37,
        name: 'Western',
      },
    ],
  },
};

export const TV = {
  render: (args: SidebarComponent) => ({
    props: args,
  }),
  args: {
    darkMode: false,
    currentMedia: 'tv',
    genres: [
      {
        id: 10759,
        name: 'Action & Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 35,
        name: 'Comedy',
      },
      {
        id: 80,
        name: 'Crime',
      },
      {
        id: 99,
        name: 'Documentary',
      },
      {
        id: 18,
        name: 'Drama',
      },
      {
        id: 10751,
        name: 'Family',
      },
      {
        id: 10762,
        name: 'Kids',
      },
      {
        id: 9648,
        name: 'Mystery',
      },
      {
        id: 10763,
        name: 'News',
      },
      {
        id: 10764,
        name: 'Reality',
      },
      {
        id: 10765,
        name: 'Sci-Fi & Fantasy',
      },
      {
        id: 10766,
        name: 'Soap',
      },
      {
        id: 10767,
        name: 'Talk',
      },
      {
        id: 10768,
        name: 'War & Politics',
      },
      {
        id: 37,
        name: 'Western',
      },
    ],
  },
};

export const genres_loading = {
  render: (args: SidebarComponent) => ({
    props: args,
  }),
  args: {
    darkMode: false,
    currentMedia: 'tv',
    genres: undefined,
  },
};
