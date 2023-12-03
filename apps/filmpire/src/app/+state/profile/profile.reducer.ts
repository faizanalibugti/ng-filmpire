import { Action, createReducer, on } from '@ngrx/store';

import * as ProfileActions from './profile.actions';
import { ProfileData } from '@ng-filmpire/api-interfaces';

export const PROFILE_FEATURE_KEY = 'profile';

export interface ProfileState extends Partial<ProfileData> {
  selectedId?: string | number; // which Profile record has been selected
  loaded: boolean; // has the Profile list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProfilePartialState {
  readonly [PROFILE_FEATURE_KEY]: ProfileState;
}

export const initialProfileState: ProfileState = {
  // set initial required properties
  loaded: false,
};

const reducer = createReducer(
  initialProfileState,
  on(
    ProfileActions.profileAction.loadProfile,
    (state): ProfileState => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    ProfileActions.profileApiActions.loadProfileSuccess,
    (state, { profileData }): ProfileState => ({
      ...state,
      ...profileData,
      loaded: true,
    })
  ),
  on(
    ProfileActions.profileApiActions.loadProfileFailure,
    (state, { error }): ProfileState => ({
      ...state,
      error,
    })
  )
);

export function profileReducer(
  state: ProfileState | undefined,
  action: Action
) {
  return reducer(state, action);
}
