import { Pipe, PipeTransform } from '@angular/core';
import { Sprites } from '../pages/pokemons/interfaces/PokemonDetailsResponse.interface';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: Sprites | undefined ): any {
    
    if(value?.other?.['official-artwork'].front_default){
      return value.other?.['official-artwork'].front_default;
    }else{
      return '../../assets/no-image.PNG';
    }
    
  }

}
