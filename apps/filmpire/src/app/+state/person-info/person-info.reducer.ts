import { Action, createReducer, on } from '@ngrx/store';

import { PersonDetails } from '@ng-filmpire/api-interfaces';
import * as PersonInfoActions from './person-info.actions';

export const PERSON_INFO_FEATURE_KEY = 'personInfo';

export interface PersonInfoState {
  selectedId?: string | number; // which PersonInfo record has been selected
  loaded: boolean; // has the PersonInfo list been loaded
  error?: string | null; // last known error (if any)
  personInfo?: PersonDetails;
}

export interface PersonInfoPartialState {
  readonly [PERSON_INFO_FEATURE_KEY]: PersonInfoState;
}

export const initialPersonInfoState: PersonInfoState = {
  // set initial required properties
  loaded: false,
};

const reducer = createReducer(
  initialPersonInfoState,
  on(
    PersonInfoActions.personInfoAction.loadPersonInfo,
    (state): PersonInfoState => ({
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(
    PersonInfoActions.personInfoApiActions.loadPersonInfoSuccess,
    (state, { personInfo }): PersonInfoState => ({
      ...state,
      loaded: true,
      personInfo,
    })
  ),
  on(
    PersonInfoActions.personInfoApiActions.loadPersonInfoFailure,
    (state, { error }): PersonInfoState => ({
      ...state,
      error,
    })
  )
);

export function personInfoReducer(
  state: PersonInfoState | undefined,
  action: Action
) {
  return reducer(state, action);
}
