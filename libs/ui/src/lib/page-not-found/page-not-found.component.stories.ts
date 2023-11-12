import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PageNotFoundComponent } from './page-not-found.component';
import { MaterialModule } from '@ng-filmpire/material';

const meta: Meta<PageNotFoundComponent> = {
  component: PageNotFoundComponent,
  title: 'PageNotFoundComponent',
  decorators: [
    moduleMetadata({
      imports: [MaterialModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<PageNotFoundComponent>;

export const Primary: Story = {
  args: {},
};
