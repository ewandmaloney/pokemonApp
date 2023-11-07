import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { MainGeneration, RegionDetailsResponse } from '../interfaces/RegionsDetailsResponse';
import { PokedexResponse, PokemonEntry } from '../interfaces/PokedexResponse';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SpeciesReponse } from '../interfaces/SpeciesReponse';
import { PokemonDetailsResponse } from 'src/app/components/interfaces/PokemonDetailsResponse.interface';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  public regionInfo: any = {};
  public pokedexes: MainGeneration[] = [];
  public pokedexInfo: PokemonEntry[] = [];
  public speciesInfo: SpeciesReponse[] = [];
  public pokemons: PokemonDetailsResponse[] = [];
  public limit: number = 0;
  public offset: number = 0;
  public loading: boolean = false
  public pkm: any[] = []

  constructor(private locServ: LocationService, private actvRout: ActivatedRoute,
    private router: Router, private pokeServ: PokemonService) {

  }

  ngOnInit(): void {
    const id = this.actvRout.snapshot.params['id'];
    this.getRegionInfo(id);
  }

  getRegionInfo(id: number) {
    this.locServ.getRegionById(id).subscribe((res: any) => {
      this.regionInfo = res
      this.pokedexes = res.pokedexes.splice(0, 3);
      console.log(this.regionInfo)
      console.log(this.pokedexes)
    })
  }

  goBack() {
    this.router.navigate(['locations']);
  }

  getPokedex(url: string) {
    if (url.length === 0) { return; }
    this.getInfoPokedex(url);
    console.log(this.speciesInfo)
    //console.log(this.speciesInfo[0].varieties[0].pokemon.url)
  }

  getInfoPokedex(url: string) {
    this.locServ.getPokedex(url).subscribe((res: PokedexResponse) => {
      this.loading = true;
      this.pokedexInfo = res.pokemon_entries;
      this.getInfoSpecies();
      this.loading = false;
    })
  }

  getInfoSpecies() {
    const requests = this.pokedexInfo.map(res => this.pokeServ.getPokemonByQuery(res.pokemon_species.url));
    forkJoin(requests).subscribe((responses: any[]) => {
      responses.forEach(res => {
        this.speciesInfo.push(res);
        this.speciesInfo.sort((a, b) => a.id - b.id);
      });
      this.getPokemons(); // Llamamos a getPokemons una vez se hayan completado todas las llamadas
    });
  }

  getPokemon() {

  }


  getPokemons() {
    //Divido el species de 10 en 10 
    this.limit += 10;
    this.speciesInfo.splice(this.offset, this.limit).forEach(res => {
      this.pkm.push(res)
      console.log(this.pkm)
    })
    this.offset += 10;
  }

}
