import { MediaListEntity } from './media-list.models';
import {
  mediaListAdapter,
  MediaListPartialState,
  initialMediaListState,
} from './media-list.reducer';
import * as MediaListSelectors from './media-list.selectors';

describe('MediaList Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMediaListId = (it: MediaListEntity) => it.id;
  const createMediaListEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MediaListEntity);

  let state: MediaListPartialState;

  beforeEach(() => {
    state = {
      mediaList: mediaListAdapter.setAll(
        [
          createMediaListEntity('PRODUCT-AAA'),
          createMediaListEntity('PRODUCT-BBB'),
          createMediaListEntity('PRODUCT-CCC'),
        ],
        {
          ...initialMediaListState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('MediaList Selectors', () => {
    it('selectAllMediaList() should return the list of MediaList', () => {
      const results = MediaListSelectors.selectAllMediaList(state);
      const selId = getMediaListId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = MediaListSelectors.selectEntity(state) as MediaListEntity;
      const selId = getMediaListId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectMediaListLoaded() should return the current "loaded" status', () => {
      const result = MediaListSelectors.selectMediaListLoaded(state);

      expect(result).toBe(true);
    });

    it('selectMediaListError() should return the current "error" state', () => {
      const result = MediaListSelectors.selectMediaListError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
