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
  //Mandar al componente infinitescroll


  //Esto se queda
  public regionInfo: any = {};
  public pokedexes: MainGeneration[] = [];

  public loading: boolean = false
  public pokedexID: any;
  public showNextComponent: boolean = false;
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
    this.showNextComponent = false;
    this.pokedexID = url
    this.showNextComponent = true;
    //Cada vez que llamemos una pokedex, reestablecemos los arrays que almacenan la informacion y el limite de la division de pokemon
    //la reestablecemos a 0 por si le habiamos dado anteriormente
  }



}
