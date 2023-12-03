import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as MediaInfoActions from './media-info.actions';
import { MediaInfoEffects } from './media-info.effects';

describe('MediaInfoEffects', () => {
  let actions: Observable<Action>;
  let effects: MediaInfoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MediaInfoEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(MediaInfoEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MediaInfoActions.initMediaInfo() });

      const expected = hot('-a-|', {
        a: MediaInfoActions.loadMediaInfoSuccess({ mediaInfo: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
