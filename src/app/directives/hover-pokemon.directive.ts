import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[hoverPokemon]',
  standalone: true
})
export class HoverPokemonDirective {

  private _color: string = 'transparent';

  private colorMap = {
    'grass': '#78C850',
    'fire': '#F08030',
    'water': '#6890F0',
    'bug': '#A8B820',
    'normal': '#D69F76',
    'poison': '#A040A0',
    'electric': '#F8D030',
    'ground': '#E0C068',
    'rock': '#B8A038',
    'fairy': '#EE99AC',
    'fighting': '#C03028',
    'psychic': '#F85888',
    'ghost': '#705898',
    'ice': '#98D8D8',
    'dragon': '#7038F8',
    'dark': '#705848',
    'steel': '#B8B8D0',
    'flying': '#A890F0'
  };

  @Input() set color(value: string) {
    this._color = this.colorMap[value as keyof typeof this.colorMap];
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  onmouseenter(eventData: Event) {
    if (this.element.nativeElement) {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', this._color);
    }
  }

  @HostListener('mouseleave')
  onmouseleave(eventData: Event) {
    if (this.element.nativeElement) {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', 'transparent');
    }
  }
}

