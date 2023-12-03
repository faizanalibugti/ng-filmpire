import { AuthEntity } from './auth.models';
import {
  authAdapter,
  AuthPartialState,
  initialAuthState,
} from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuthId = (it: AuthEntity) => it.id;
  const createAuthEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuthEntity);

  let state: AuthPartialState;

  beforeEach(() => {
    state = {
      auth: authAdapter.setAll(
        [
          createAuthEntity('PRODUCT-AAA'),
          createAuthEntity('PRODUCT-BBB'),
          createAuthEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAuthState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Auth Selectors', () => {
    it('selectAllAuth() should return the list of Auth', () => {
      const results = AuthSelectors.selectAllAuth(state);
      const selId = getAuthId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AuthSelectors.selectEntity(state) as AuthEntity;
      const selId = getAuthId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAuthLoaded() should return the current "loaded" status', () => {
      const result = AuthSelectors.selectAuthLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAuthError() should return the current "error" state', () => {
      const result = AuthSelectors.selectAuthError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
