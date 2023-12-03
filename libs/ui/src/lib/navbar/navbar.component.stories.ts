import { CoreDataModule } from '@ng-filmpire/core-data';
import { MaterialModule } from '@ng-filmpire/material';
import { Meta, moduleMetadata } from '@storybook/angular';
import { AutocompleteResultsComponent } from '../autocomplete-results/autocomplete-results.component';
import { NavbarComponent } from './navbar.component';

export default {
  title: 'NavbarComponent',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [MaterialModule, CoreDataModule],
      declarations: [AutocompleteResultsComponent],
    }),
  ],
} as Meta<NavbarComponent>;

export const Primary = {
  render: (args: NavbarComponent) => ({
    props: args,
  }),
  args: {
    darkMode: false,
    user: null,
  },
};

export const IsLoggedIn = {
  render: (args: NavbarComponent) => ({
    props: args,
  }),
  args: {
    darkMode: false,
    user: {
      id: 1,
      avatar: {
        gravatar: { hash: '' },
        tmdb: {
          avatar_path: '',
        },
      },
      include_adult: false,
      iso_3166_1: '',
      iso_639_1: '',
      name: 'User',
      username: 'user',
    },
  },
};
