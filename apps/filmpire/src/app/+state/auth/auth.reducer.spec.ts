import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState, authReducer } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('valid Auth actions', () => {
    it('loadAuthSuccess should return the list of known Auth', () => {
      const action = AuthActions.authAction.login();

      const result: AuthState = authReducer(initialAuthState, action);

      expect(result.loaded).toBe(true);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = authReducer(initialAuthState, action);

      expect(result).toBe(initialAuthState);
    });
  });
});
