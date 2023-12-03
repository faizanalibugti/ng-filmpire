import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as PersonInfoActions from './person-info.actions';
import { PersonInfoEffects } from './person-info.effects';

describe('PersonInfoEffects', () => {
  let actions: Observable<Action>;
  let effects: PersonInfoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        PersonInfoEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(PersonInfoEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: PersonInfoActions.initPersonInfo() });

      const expected = hot('-a-|', {
        a: PersonInfoActions.loadPersonInfoSuccess({ personInfo: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
