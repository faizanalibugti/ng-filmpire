import { ElementRef, Renderer2 } from '@angular/core';
import { IntersectionObserverDirective } from './intersection-observer.directive';

describe('IntersectionObserverDirective', () => {
  let directive: IntersectionObserverDirective;
  let elMock: ElementRef;
  let rendererMock: Renderer2;
  let intersectionObserverMock: IntersectionObserver;

  beforeEach(() => {
    elMock = {
      nativeElement: document.createElement('div'),
    } as ElementRef;

    rendererMock = {
      addClass: jest.fn(),
      removeClass: jest.fn(),
    } as unknown as Renderer2;

    intersectionObserverMock = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    } as unknown as IntersectionObserver;

    directive = new IntersectionObserverDirective(elMock, rendererMock);

    (global as any).IntersectionObserver = jest.fn((callback, options) => {
      callback([{ intersectionRatio: 0.3, target: elMock.nativeElement }]);
      return intersectionObserverMock;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set up IntersectionObserver on initialization', () => {
    directive.ngOnInit();
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    expect(intersectionObserverMock.observe).toHaveBeenCalledWith(
      elMock.nativeElement
    );
  });

  it('should add class "visible" when intersectionRatio is greater than 0.25', () => {
    directive.ngOnInit();
    expect(rendererMock.addClass).toHaveBeenCalledWith(
      elMock.nativeElement,
      'visible'
    );
  });

  it('should remove class "visible" when intersectionRatio is between 0 and 0.25', () => {
    (global as any).IntersectionObserver = jest.fn((callback, options) => {
      callback([{ intersectionRatio: 0.2, target: elMock.nativeElement }]);
      return intersectionObserverMock;
    });

    directive.ngOnInit();
    expect(rendererMock.removeClass).toHaveBeenCalledWith(
      elMock.nativeElement,
      'visible'
    );
  });

  it('should disconnect IntersectionObserver on ngOnDestroy', () => {
    directive.ngOnInit();
    directive.ngOnDestroy();
    expect(intersectionObserverMock.disconnect).toHaveBeenCalled();
  });
});
