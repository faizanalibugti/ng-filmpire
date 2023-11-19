import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@ng-filmpire/api-interfaces';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  // set initial required properties
  isAuthenticated: false,
  user: null,
  loaded: false,
};

const reducer = createReducer(
  initialAuthState,
  on(
    AuthActions.authAction.login,
    (state): AuthState => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    AuthActions.authApiActions.setUserSuccess,
    (state, { user }): AuthState => ({
      ...state,
      user,
      isAuthenticated: true,
    })
  ),
  on(
    AuthActions.authApiActions.logoutSuccess,
    (state): AuthState => ({
      ...state,
      isAuthenticated: false,
      user: null,
    })
  ),
  on(
    AuthActions.authApiActions.loginFailure,
    AuthActions.authApiActions.createSessionFailure,
    AuthActions.authApiActions.setUserFailure,
    AuthActions.authApiActions.logoutFailure,
    (state, { error }): AuthState => ({
      ...state,
      error,
    })
  )
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
