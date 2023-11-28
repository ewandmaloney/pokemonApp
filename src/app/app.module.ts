import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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
    ResgisterModule
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
