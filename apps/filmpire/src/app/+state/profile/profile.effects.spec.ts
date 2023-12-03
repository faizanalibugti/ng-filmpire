import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ProfileActions from './profile.actions';
import { ProfileEffects } from './profile.effects';

describe('ProfileEffects', () => {
  let actions: Observable<Action>;
  let effects: ProfileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProfileEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ProfileEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProfileActions.initProfile() });

      const expected = hot('-a-|', {
        a: ProfileActions.loadProfileSuccess({ profile: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
