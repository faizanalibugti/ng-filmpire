import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PERSON_INFO_FEATURE_KEY,
  PersonInfoState,
} from './person-info.reducer';
import {
  calculateAge,
  removeDuplicates,
  sortMediaByReleaseDate,
} from './utils/person-info.utils';
import { PersonDetails } from '@ng-filmpire/api-interfaces';

// Lookup the 'PersonInfo' feature state managed by NgRx
export const selectPersonInfoState = createFeatureSelector<PersonInfoState>(
  PERSON_INFO_FEATURE_KEY
);

export const selectPersonInfoLoaded = createSelector(
  selectPersonInfoState,
  (state: PersonInfoState) => state.loaded
);

export const selectPersonInfoError = createSelector(
  selectPersonInfoState,
  (state: PersonInfoState) => state.error
);

export const selectPersonDetails = createSelector(
  selectPersonInfoState,
  (state: PersonInfoState) => {
    const { personInfo } = state;

    const personDetails: PersonDetails | undefined = personInfo
      ? {
          ...personInfo,
          age: personInfo.birthday
            ? calculateAge(personInfo.birthday)
            : undefined,
          movie_credits: {
            ...personInfo.movie_credits,
            cast: removeDuplicates(personInfo.movie_credits.cast, 'id').sort(
              sortMediaByReleaseDate
            ),
            crew: personInfo.movie_credits?.crew,
          },
          tv_credits: {
            ...personInfo.tv_credits,
            cast: removeDuplicates(personInfo.tv_credits.cast, 'id').sort(
              sortMediaByReleaseDate
            ),
            crew: personInfo.tv_credits?.crew,
          },
        }
      : undefined;

    return personDetails as PersonDetails;
  }
);
