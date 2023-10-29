import { Meta, moduleMetadata } from '@storybook/angular';
import { NavbarComponent } from './navbar.component';
import { MaterialModule } from '@ng-filmpire/material';

export default {
  title: 'NavbarComponent',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [MaterialModule],
    }),
  ],
} as Meta<NavbarComponent>;

export const Primary = {
  render: (args: NavbarComponent) => ({
    props: args,
  }),
  args: {
    darkMode: false,
  },
};
