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
    CookieModule.withOptions()

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
