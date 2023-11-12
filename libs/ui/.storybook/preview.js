import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

export const decorators = [
  applicationConfig({
    imports: [ReactiveFormsModule, RouterModule],
    providers: [provideAnimations(), provideHttpClient()],
  }),
];
