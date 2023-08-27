import { Renderer2 } from '@angular/core';
import { ThemeDirective } from './theme.directive';

describe('ThemeDirective', () => {
  let directive: ThemeDirective;
  let documentMock: Partial<Document>;
  let rendererMock: Renderer2;

  beforeEach(() => {
    documentMock = {
      body: document.createElement('body'),
    };

    rendererMock = {
      addClass: jest.fn(),
      removeClass: jest.fn(),
    } as unknown as Renderer2;

    directive = new ThemeDirective(documentMock as Document, rendererMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
