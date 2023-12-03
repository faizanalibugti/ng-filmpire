import { Injectable, inject } from '@angular/core';
import {
  NotificationsService,
  PersonHttpService,
} from '@ng-filmpire/core-data';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import {
  selectRouteParams,
  selectUrlFragments,
} from '../router/router.selectors';
import * as PersonInfoActions from './person-info.actions';

@Injectable()
export class PersonInfoEffects {
  private actions$ = inject(Actions);
  private readonly store = inject(Store);
  private personHttp = inject(PersonHttpService);
  private notifications = inject(NotificationsService);

  onNavigateToActorPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      concatLatestFrom(() => [
        this.store.select(selectRouteParams),
        this.store.select(selectUrlFragments),
      ]),
      filter(([, , urlFragments]) => urlFragments[0] === 'actor'),
      map(([, { id }]) => ({
        id: Number(id),
      })),
      filter(({ id }) => !!id),
      map(({ id }) => PersonInfoActions.personInfoAction.loadPersonInfo({ id }))
    );
  });

  loadPersonInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PersonInfoActions.personInfoAction.loadPersonInfo),
      switchMap(({ id }) =>
        this.personHttp.getPersonDetails(id).pipe(
          map((personInfo) =>
            PersonInfoActions.personInfoApiActions.loadPersonInfoSuccess({
              personInfo,
            })
          ),
          catchError((e) =>
            of(PersonInfoActions.personInfoApiActions.loadPersonInfoFailure(e))
          )
        )
      )
    );
  });
}
