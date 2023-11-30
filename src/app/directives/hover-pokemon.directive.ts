import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[hoverPokemon]',
  standalone: true
})
export class HoverPokemonDirective {

  private _color: string = 'transparent';

  @Input() set color(value: string) {
    if (value === 'grass') {
      this._color = '#18F121';
    } else if (value === 'fire') {
      this._color = '#F54F2C';
    } else if (value === 'water') {
      this._color = '#20AAF3';
    } else if (value === 'bug') {
      this._color = '#9FE124';
    } else if (value === 'normal') {
      this._color = '#C8C4BC';
    } else if (value === 'poison') {
      this._color = '#B000F9';
    } else if (value === 'electric') {
      this._color = '#F9E100';
    } else if (value === 'ground') {
      this._color = '#F9C100';
    }
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

