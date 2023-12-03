import { PersonDetails } from '@ng-filmpire/api-interfaces';
import { createActionGroup, props } from '@ngrx/store';

export const personInfoAction = createActionGroup({
  source: 'Person Info',
  events: {
    'Load Person Info': props<{ id: number }>(),
  },
});

export const personInfoApiActions = createActionGroup({
  source: 'Person Info/API',
  events: {
    'Load Person Info Success': props<{ personInfo: PersonDetails }>(),
    'Load Person Info Failure': props<{ error: any }>(),
  },
});
