import { PersonInfoEntity } from './person-info.models';
import {
  personInfoAdapter,
  PersonInfoPartialState,
  initialPersonInfoState,
} from './person-info.reducer';
import * as PersonInfoSelectors from './person-info.selectors';

describe('PersonInfo Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getPersonInfoId = (it: PersonInfoEntity) => it.id;
  const createPersonInfoEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as PersonInfoEntity);

  let state: PersonInfoPartialState;

  beforeEach(() => {
    state = {
      personInfo: personInfoAdapter.setAll(
        [
          createPersonInfoEntity('PRODUCT-AAA'),
          createPersonInfoEntity('PRODUCT-BBB'),
          createPersonInfoEntity('PRODUCT-CCC'),
        ],
        {
          ...initialPersonInfoState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('PersonInfo Selectors', () => {
    it('selectAllPersonInfo() should return the list of PersonInfo', () => {
      const results = PersonInfoSelectors.selectAllPersonInfo(state);
      const selId = getPersonInfoId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = PersonInfoSelectors.selectEntity(
        state
      ) as PersonInfoEntity;
      const selId = getPersonInfoId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectPersonInfoLoaded() should return the current "loaded" status', () => {
      const result = PersonInfoSelectors.selectPersonInfoLoaded(state);

      expect(result).toBe(true);
    });

    it('selectPersonInfoError() should return the current "error" state', () => {
      const result = PersonInfoSelectors.selectPersonInfoError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
