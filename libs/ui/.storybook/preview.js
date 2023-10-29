import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata } from '@storybook/angular';

export const decorators = [
  moduleMetadata({
    imports: [
      BrowserAnimationsModule,
      ReactiveFormsModule,
      RouterTestingModule,
      HttpClientTestingModule,
    ],
  }),
];
