import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './+state/auth/auth.reducer';
import * as fromGlobal from './+state/global/global.reducer';
import * as fromMediaInfo from './+state/media-info/media-info.reducer';
import * as fromMediaList from './+state/media-list/media-list.reducer';
import * as fromPersonInfo from './+state/person-info/person-info.reducer';
import * as fromProfile from './+state/profile/profile.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
    StoreModule.forFeature(
      fromGlobal.GLOBAL_FEATURE_KEY,
      fromGlobal.globalReducer
    ),
    StoreModule.forFeature(
      fromMediaList.MEDIA_LIST_FEATURE_KEY,
      fromMediaList.mediaListReducer
    ),
    StoreModule.forFeature(
      fromProfile.PROFILE_FEATURE_KEY,
      fromProfile.profileReducer
    ),
    StoreModule.forFeature(
      fromMediaInfo.MEDIA_INFO_FEATURE_KEY,
      fromMediaInfo.mediaInfoReducer
    ),
    StoreModule.forFeature(
      fromPersonInfo.PERSON_INFO_FEATURE_KEY,
      fromPersonInfo.personInfoReducer
    ),
  ],
  exports: [StoreModule],
})
export class AppStateFeaturesModule {}
