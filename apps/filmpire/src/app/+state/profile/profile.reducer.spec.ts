import { Action } from '@ngrx/store';

import * as ProfileActions from './profile.actions';
import { ProfileEntity } from './profile.models';
import {
  ProfileState,
  initialProfileState,
  profileReducer,
} from './profile.reducer';

describe('Profile Reducer', () => {
  const createProfileEntity = (id: string, name = ''): ProfileEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Profile actions', () => {
    it('loadProfileSuccess should return the list of known Profile', () => {
      const profile = [
        createProfileEntity('PRODUCT-AAA'),
        createProfileEntity('PRODUCT-zzz'),
      ];
      const action = ProfileActions.loadProfileSuccess({ profile });

      const result: ProfileState = profileReducer(initialProfileState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = profileReducer(initialProfileState, action);

      expect(result).toBe(initialProfileState);
    });
  });
});
