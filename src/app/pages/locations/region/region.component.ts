import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { MainGeneration, RegionDetailsResponse } from '../interfaces/RegionsDetailsResponse';
import { PokedexResponse, PokemonEntry } from '../interfaces/PokedexResponse';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SpeciesReponse } from '../interfaces/SpeciesReponse';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { PokemonDetailsResponse } from '../../pokemons/interfaces/PokemonDetailsResponse.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit, OnDestroy {

  public regionInfo: any = {};
  public pokedexes: MainGeneration[] = [];
  public pokedexInfo: PokemonEntry[] = [];
  public speciesInfo: SpeciesReponse[] = [];
  public pokemons: PokemonDetailsResponse[] = [];
  public limit: number = 0;
  public offset: number = 0;
  public loading: boolean = false
  public pkm: any[] = []
  public pokedexPokemons: PokemonDetailsResponse[] = [];
  public totalPokemons: number = 0;
  ngUnsubscribe = new Subject<void>();


  constructor(private locServ: LocationService, private actvRout: ActivatedRoute,
    private router: Router, private pokeServ: PokemonService, private location: Location) {

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    const id = this.actvRout.snapshot.params['id'];
    this.getRegionInfo(id);
  }

  getRegionInfo(id: number) {
    this.locServ.getRegionById(id).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      this.regionInfo = res
      this.pokedexes = res.pokedexes.splice(0, 3);
      // console.log(this.regionInfo)
      // console.log(this.pokedexes)
    })
  }

  goBack() {
    this.location.back();
  }

  getPokedex(url: string) {
    if (url.length === 0) { return; }
    this.loading = true;
    //Cada vez que llamemos una pokedex, reestablecemos los arrays que almacenan la informacion y el limite de la division de pokemon
    //la reestablecemos a 0 por si le habiamos dado anteriormente
    this.speciesInfo = [];
    this.pkm = [];
    this.limit = 0;
    this.pokedexPokemons = [];
    this.getInfoPokedex(url);
  }

  getInfoPokedex(url: string) {
    this.locServ.getPokedex(url).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: PokedexResponse) => {
      this.pokedexInfo = res.pokemon_entries;
      this.getInfoSpecies();

    })
  }

  getInfoSpecies() {
    const requests = this.pokedexInfo.map(res => this.pokeServ.getPokemonByQuery(res.pokemon_species.url));
    forkJoin(requests).pipe(takeUntil(this.ngUnsubscribe)).subscribe((responses: any[]) => {
      responses.forEach(res => {
        this.speciesInfo.push(res);
        this.speciesInfo.sort((a, b) => a.id - b.id);
      });
      this.getInfoPokemon();
      this.loading = false;
      this.totalPokemons = this.speciesInfo.length;
      console.log(this.pokedexPokemons)
    });
  }

  getInfoPokemon() {
    const requests = this.speciesInfo.map(res => this.pokeServ.getPokemonByQuery(res.varieties[0].pokemon.url).pipe(takeUntil(this.ngUnsubscribe)));

    forkJoin(requests).subscribe((responses: PokemonDetailsResponse[]) => {
      this.pokedexPokemons = responses;
      this.pokedexPokemons.sort((a, b) => a.id - b.id);
      console.log(this.pokedexPokemons);
    });
  }

}
