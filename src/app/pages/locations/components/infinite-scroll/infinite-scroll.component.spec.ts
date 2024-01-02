import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollComponent } from './infinite-scroll.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { of } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { LoginService } from 'src/app/services/login.service';
import { Database, getDatabase, provideDatabase } from '@angular/fire/database';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

class MockCookieService {
  get() {
    return of('mock value');
  }
}

class MockDatabase {
  get() {
    return of('mock value');
  }
}

class MockAuth {
  get() {
    return of('mock value');
  }
}

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;
  let firebase: FirebaseService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfiniteScrollComponent, PokemonListComponent],
      providers: [
        FirebaseService,
        TranslateService,
        LoginService,
        { provide: CookieService, useClass: MockCookieService },
        { provide: Database, useClass: MockDatabase },
        { provide: Auth, useClass: MockAuth }
      ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(),
        provideFirebaseApp(() => initializeApp({ "projectId": "angular-test-request-project", "appId": "1:435090426922:web:dcaed200fbbbcf46bf0753", "databaseURL": "https://angular-test-request-project-default-rtdb.europe-west1.firebasedatabase.app", "storageBucket": "angular-test-request-project.appspot.com", "apiKey": "AIzaSyDCyGC_vQk3oelDOMSmWaYn09g8IMWhvI0", "authDomain": "angular-test-request-project.firebaseapp.com", "messagingSenderId": "435090426922", "measurementId": "G-0CTEXTL3KC" })),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
      ]
    });
    firebase = TestBed.inject(FirebaseService);
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    component.pokedexID = 'bhdjas'
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
