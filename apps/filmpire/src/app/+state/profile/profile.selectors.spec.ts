import { ProfileEntity } from './profile.models';
import {
  profileAdapter,
  ProfilePartialState,
  initialProfileState,
} from './profile.reducer';
import * as ProfileSelectors from './profile.selectors';

describe('Profile Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProfileId = (it: ProfileEntity) => it.id;
  const createProfileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProfileEntity);

  let state: ProfilePartialState;

  beforeEach(() => {
    state = {
      profile: profileAdapter.setAll(
        [
          createProfileEntity('PRODUCT-AAA'),
          createProfileEntity('PRODUCT-BBB'),
          createProfileEntity('PRODUCT-CCC'),
        ],
        {
          ...initialProfileState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Profile Selectors', () => {
    it('selectAllProfile() should return the list of Profile', () => {
      const results = ProfileSelectors.selectAllProfile(state);
      const selId = getProfileId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ProfileSelectors.selectEntity(state) as ProfileEntity;
      const selId = getProfileId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectProfileLoaded() should return the current "loaded" status', () => {
      const result = ProfileSelectors.selectProfileLoaded(state);

      expect(result).toBe(true);
    });

    it('selectProfileError() should return the current "error" state', () => {
      const result = ProfileSelectors.selectProfileError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
