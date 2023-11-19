import { Action } from '@ngrx/store';

import * as MediaInfoActions from './media-info.actions';
import { MediaInfoEntity } from './media-info.models';
import {
  MediaInfoState,
  initialMediaInfoState,
  mediaInfoReducer,
} from './media-info.reducer';

describe('MediaInfo Reducer', () => {
  const createMediaInfoEntity = (id: string, name = ''): MediaInfoEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid MediaInfo actions', () => {
    it('loadMediaInfoSuccess should return the list of known MediaInfo', () => {
      const mediaInfo = [
        createMediaInfoEntity('PRODUCT-AAA'),
        createMediaInfoEntity('PRODUCT-zzz'),
      ];
      const action = MediaInfoActions.loadMediaInfoSuccess({ mediaInfo });

      const result: MediaInfoState = mediaInfoReducer(
        initialMediaInfoState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = mediaInfoReducer(initialMediaInfoState, action);

      expect(result).toBe(initialMediaInfoState);
    });
  });
});
