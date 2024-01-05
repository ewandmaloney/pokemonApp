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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonCardComponent } from 'src/app/shared/components/pokemon-card/pokemon-card.component';

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
class MockFirebase {

  public firebaseData: any[] = [];

  createPokedexArray(pokedexObj: any) {

    let pokedex: any[] = []
    if (pokedexObj) {
      this.firebaseData = Object.values(pokedexObj)
      const data: any[] = Object.values(pokedexObj)
      if (pokedexObj === null) { return []; }
      data.forEach((pkm: any) => {
        pokedex = Object.values(pkm)
      })
    }
    return pokedex;
  }

  leerDatosPokedex() {
    return of({
      "pokemons": {
        "0": {
          "id": 32,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png",
          "name": "nidoran-m"
        },
        "-NkoFK75_FajWxOci8Lr": {
          "id": 73,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png",
          "name": "tentacruel"
        },
        "-NktlXwhmEo8GESYraUt": {
          "id": 1,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          "name": "bulbasaur"
        }
      }
    })
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
        { provide: Auth, useClass: MockAuth },
        { provide: FirebaseService, useClass: MockFirebase },
      ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), InfiniteScrollModule, PokemonCardComponent
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
    const leerDatosPokedex = spyOn(firebase, 'leerDatosPokedex').and.returnValue(of({}))
    const createPokedexArray = spyOn(firebase, 'createPokedexArray').and.returnValue([])
    component.pokedexID = 'bhdjas-3123-312das'
    component.ngOnInit();
    component.pokemons = []
    expect(leerDatosPokedex).toHaveBeenCalled();
    expect(createPokedexArray).toHaveBeenCalled();
  });
});
