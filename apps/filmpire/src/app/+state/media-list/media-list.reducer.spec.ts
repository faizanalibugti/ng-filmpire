import { Action } from '@ngrx/store';

import * as MediaListActions from './media-list.actions';
import { MediaListEntity } from './media-list.models';
import {
  MediaListState,
  initialMediaListState,
  mediaListReducer,
} from './media-list.reducer';

describe('MediaList Reducer', () => {
  const createMediaListEntity = (id: string, name = ''): MediaListEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid MediaList actions', () => {
    it('loadMediaListSuccess should return the list of known MediaList', () => {
      const mediaList = [
        createMediaListEntity('PRODUCT-AAA'),
        createMediaListEntity('PRODUCT-zzz'),
      ];
      const action = MediaListActions.loadMediaListSuccess({ mediaList });

      const result: MediaListState = mediaListReducer(
        initialMediaListState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = mediaListReducer(initialMediaListState, action);

      expect(result).toBe(initialMediaListState);
    });
  });
});
