import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListComponent } from './pokemon-list.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieOptions, CookieOptionsProvider, CookieService } from 'ngx-cookie';
import { InjectionToken } from '@angular/core';
import { of } from 'rxjs';
import { Database } from '@angular/fire/database';
import { Ability, GameIndex, Move, PokemonDetailsResponse, Species, Sprites, Stat, Type } from 'src/app/pages/pokemons/interfaces/PokemonDetailsResponse.interface';

describe('PokemonCardComponent', () => {
  let component: PokemonListComponent;
  let fixture: ComponentFixture<PokemonListComponent>;
  let firebase: FirebaseService;

  class MockCookieService {
    // Add methods as needed based on the usage of CookieService in your component
    get() {
      return of('mock value');
    }
  }

  class MockPokemonDetailsResponse implements PokemonDetailsResponse {
    abilities: Ability[] = [];
    base_experience!: number;
    forms: Species[] = [];
    game_indices: GameIndex[] = [];
    height!: number;
    held_items: any[] = [];
    id!: number;
    is_default: boolean = false;
    location_area_encounters!: string;
    moves: Move[] = [];
    name!: string;
    order!: number;
    past_abilities: any[] = [];
    past_types: any[] = [];
    species!: Species;
    sprites!: Sprites;
    stats: Stat[] = [];
    types: Type[] = [];
    weight!: number;
  }

  class MockDatabase {
    // Add methods as needed based on the usage of CookieService in your component
    get() {
      return of('mock value');
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [PokemonListComponent],
      providers: [
        FirebaseService,
        TranslateService,
        { provide: CookieService, useClass: MockCookieService }, // replace CookieService with the mock
        { provide: Database, useClass: MockDatabase }
      ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()]
    });
    firebase = TestBed.inject(FirebaseService);
    fixture = TestBed.createComponent(PokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Comprueba que se muestre un mensaje cuando no hay pokemons. El fixture.detectChanges() es para que se actualice la vista
  it('show message when there are no pokemons', () => {
    component.pokemons = [];
    component.personalPokedex = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Your pokedex is empty!');
  })

  //No funciona
  it('show message PERSONAL POKEDEX when there are pokemons', () => {
    component.pokemons = [{} as any];
    component.personalPokedex = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Personal pokedex');
  });

  //Comprueba que funcione el deletePokemon. El spyOn es para comprobar que se llama a la función
  it('should call deletePokemonFromPokedex', () => {
    spyOn(component.deletePokemonFromPokedex, 'emit');
    component.deletePokemon(1);
    expect(component.deletePokemonFromPokedex.emit).toHaveBeenCalled();
  })

  //Comprueba que funcione el addPokemon. El spyOn es para comprobar que se llama a la función
  it('should call addPokemon', () => {
    spyOn(component.addPokemon, 'emit');
    //Introduzco un objeto simulando un pokemon
    component.addPokemonToPokedex({} as any);
    expect(component.addPokemon.emit).toHaveBeenCalled();
  })

  //Espia la funcion detailsPokemon en lugar de espiar el emit de la funcion
  it('should call detailsPokemon', () => {
    spyOn(component, 'detailsPokemon');
    component.detailsPokemon(1);
    expect(component.detailsPokemon).toHaveBeenCalled();
  })


});
