import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as MediaListActions from './media-list.actions';
import { MediaListEffects } from './media-list.effects';

describe('MediaListEffects', () => {
  let actions: Observable<Action>;
  let effects: MediaListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MediaListEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(MediaListEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MediaListActions.initMediaList() });

      const expected = hot('-a-|', {
        a: MediaListActions.loadMediaListSuccess({ mediaList: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
