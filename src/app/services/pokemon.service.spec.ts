import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('PokemonService', () => {
  let service: PokemonService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Comprueba que llame a la url y que sea un get
  it('should call getPokemonList', () => {
    service.getPokemons(151, 0).subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
    expect(req.request.method).toEqual('GET');
  });

  it('should call getPokemonById', () => {
    service.getPokemonById(1).subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toEqual('GET');
  });

  it('should call getPokemonByQuery', () => {
    service.getPokemonByQuery('https://pokeapi.co/api/v2/pokemon/1').subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toEqual('GET');
  });

  it('should call pokemonType', () => {
    service.pokemonType(1).subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(req.request.method).toEqual('GET');
  });
});
