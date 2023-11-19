import { ProfileData, User } from '@ng-filmpire/api-interfaces';
import { createActionGroup, props } from '@ngrx/store';

export const profileAction = createActionGroup({
  source: 'Profile',
  events: {
    'Load Profile': props<{ user: User }>(),
  },
});

export const profileApiActions = createActionGroup({
  source: 'Profile/API',
  events: {
    'Load Profile Success': props<{ profileData: ProfileData }>(),
    'Load Profile Failure': props<{ error: any }>(),
  },
});
