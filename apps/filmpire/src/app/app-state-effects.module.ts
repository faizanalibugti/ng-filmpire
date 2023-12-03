import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './+state/auth/auth.effects';
import { GlobalEffects } from './+state/global/global.effects';
import { MediaListEffects } from './+state/media-list/media-list.effects';
import { ProfileEffects } from './+state/profile/profile.effects';
import { MediaInfoEffects } from './+state/media-info/media-info.effects';
import { PersonInfoEffects } from './+state/person-info/person-info.effects';

@NgModule({
  imports: [
    EffectsModule.forFeature([
      AuthEffects,
      GlobalEffects,
      MediaListEffects,
      MediaInfoEffects,
      ProfileEffects,
      PersonInfoEffects,
    ]),
  ],
  exports: [EffectsModule],
})
export class AppStateEffectsModule {}
