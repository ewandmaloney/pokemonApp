import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderImagesPokemonComponent } from './slider-images-pokemon.component';

describe('SliderImagesPokemonComponent', () => {
  let component: SliderImagesPokemonComponent;
  let fixture: ComponentFixture<SliderImagesPokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderImagesPokemonComponent]
    });
    fixture = TestBed.createComponent(SliderImagesPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
