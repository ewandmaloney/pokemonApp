import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PipesModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {

  @Input() pokemon: any = {};
  @Output() detailPokemon: EventEmitter<number> = new EventEmitter();


  detailsPokemon(id: number) {
    this.detailPokemon.emit(id);
  }

}
