import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';
import { authGuard } from './guards/auth.guard';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CookieModule } from 'ngx-cookie';

import { ServicesModule } from './services/services.module';
import { LoginModule } from './pages/login/login.module';
import { UserPokedexModule } from './pages/user-pokedex/user-pokedex.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ResgisterModule } from './pages/resgister/register.module';
import { InputFieldComponent } from './components/forms/input-field/input-field.component';
import { RadioFieldComponent } from './components/forms/radio-field/radio-field.component';
import { SelectFieldComponent } from './components/forms/select-field/select-field.component';
import { DirectivesModule } from './directives/directives.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { pokedexReducer } from './states/reducers/pokedex.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PokedexEffects } from './states/effects/pokedex.effects';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    PipesModule,
    LoginModule,
    ServicesModule,
    UserPokedexModule,
    CookieModule.withOptions(),
    provideFirebaseApp(() => initializeApp({ "projectId": "angular-test-request-project", "appId": "1:435090426922:web:dcaed200fbbbcf46bf0753", "databaseURL": "https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app", "storageBucket": "angular-test-request-project.appspot.com", "apiKey": "AIzaSyDCyGC_vQk3oelDOMSmWaYn09g8IMWhvI0", "authDomain": "angular-test-request-project.firebaseapp.com", "messagingSenderId": "435090426922", "measurementId": "G-0CTEXTL3KC" })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    InputFieldComponent,
    RadioFieldComponent,
    SelectFieldComponent,
    ResgisterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({ pokedex: pokedexReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    EffectsModule.forRoot(PokedexEffects)
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}