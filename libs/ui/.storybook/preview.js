import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

export const decorators = [
  applicationConfig({
    imports: [ReactiveFormsModule, RouterModule, HttpClientTestingModule],
    providers: [provideAnimations()],
  }),
];
