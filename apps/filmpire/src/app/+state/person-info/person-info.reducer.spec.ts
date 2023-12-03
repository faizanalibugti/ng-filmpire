import { Action } from '@ngrx/store';

import * as PersonInfoActions from './person-info.actions';
import { PersonInfoEntity } from './person-info.models';
import {
  PersonInfoState,
  initialPersonInfoState,
  personInfoReducer,
} from './person-info.reducer';

describe('PersonInfo Reducer', () => {
  const createPersonInfoEntity = (id: string, name = ''): PersonInfoEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid PersonInfo actions', () => {
    it('loadPersonInfoSuccess should return the list of known PersonInfo', () => {
      const personInfo = [
        createPersonInfoEntity('PRODUCT-AAA'),
        createPersonInfoEntity('PRODUCT-zzz'),
      ];
      const action = PersonInfoActions.loadPersonInfoSuccess({ personInfo });

      const result: PersonInfoState = personInfoReducer(
        initialPersonInfoState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = personInfoReducer(initialPersonInfoState, action);

      expect(result).toBe(initialPersonInfoState);
    });
  });
});
