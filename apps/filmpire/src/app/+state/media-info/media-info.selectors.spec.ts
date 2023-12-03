import { MediaInfoEntity } from './media-info.models';
import {
  mediaInfoAdapter,
  MediaInfoPartialState,
  initialMediaInfoState,
} from './media-info.reducer';
import * as MediaInfoSelectors from './media-info.selectors';

describe('MediaInfo Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMediaInfoId = (it: MediaInfoEntity) => it.id;
  const createMediaInfoEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MediaInfoEntity);

  let state: MediaInfoPartialState;

  beforeEach(() => {
    state = {
      mediaInfo: mediaInfoAdapter.setAll(
        [
          createMediaInfoEntity('PRODUCT-AAA'),
          createMediaInfoEntity('PRODUCT-BBB'),
          createMediaInfoEntity('PRODUCT-CCC'),
        ],
        {
          ...initialMediaInfoState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('MediaInfo Selectors', () => {
    it('selectAllMediaInfo() should return the list of MediaInfo', () => {
      const results = MediaInfoSelectors.selectAllMediaInfo(state);
      const selId = getMediaInfoId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = MediaInfoSelectors.selectEntity(state) as MediaInfoEntity;
      const selId = getMediaInfoId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectMediaInfoLoaded() should return the current "loaded" status', () => {
      const result = MediaInfoSelectors.selectMediaInfoLoaded(state);

      expect(result).toBe(true);
    });

    it('selectMediaInfoError() should return the current "error" state', () => {
      const result = MediaInfoSelectors.selectMediaInfoError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
