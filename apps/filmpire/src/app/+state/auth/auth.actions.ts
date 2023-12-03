import { AuthToken, User } from '@ng-filmpire/api-interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authAction = createActionGroup({
  source: 'Auth',
  events: {
    Login: emptyProps(),
    'Set User': emptyProps(),
    Logout: emptyProps(),
  },
});

export const authApiActions = createActionGroup({
  source: 'Auth/API',
  events: {
    'Login Success': props<{ token: AuthToken }>(),
    'Login Failure': props<{ error: any }>(),
    'Set User Success': props<{ user: User | null }>(),
    'Set User Failure': props<{ error: any }>(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: any }>(),
    'Create Session Failure': props<{ error: any }>(),
  },
});
