import { createSelector } from '@ngrx/store';
import {
  selectPersonDetails,
  selectPersonInfoLoaded,
} from '../person-info.selectors';
import { PersonDetails } from '@ng-filmpire/api-interfaces';
import { PersonInfoPage } from '../models/person-info.model';

export const selectPersonInfoPage = createSelector(
  selectPersonDetails,
  selectPersonInfoLoaded,
  (personDetails: PersonDetails, loaded: boolean) => ({
    personDetails,
    loaded,
  }) as PersonInfoPage
);
