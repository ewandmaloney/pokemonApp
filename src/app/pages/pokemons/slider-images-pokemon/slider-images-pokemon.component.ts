import { Component, Input } from '@angular/core';
import { PokemonDetailsResponse } from '../interfaces/PokemonDetailsResponse.interface';

@Component({
  selector: 'app-slider-images-pokemon',
  templateUrl: './slider-images-pokemon.component.html',
  styleUrls: ['./slider-images-pokemon.component.css']
})
export class SliderImagesPokemonComponent {

  @Input() pokemon: any = {}
 
}
