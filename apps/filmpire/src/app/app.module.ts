import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  AuthInterceptor,
  CachingInterceptor,
  CoreDataModule,
} from '@ng-filmpire/core-data';
import { MaterialModule } from '@ng-filmpire/material';
import { UiModule } from '@ng-filmpire/ui';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterState,
  StoreRouterConnectingModule,
  routerReducer,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AccountComponent } from './account/account.component';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { MediaInfoComponent } from './media-info/media-info.component';
import { MediaListComponent } from './media-list/media-list.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { environment } from '@ng-filmpire/core-data';

@NgModule({
  declarations: [
    AppComponent,
    MediaListComponent,
    MediaInfoComponent,
    PersonInfoComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    UiModule,
    CoreDataModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
