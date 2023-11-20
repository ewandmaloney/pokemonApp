import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPokedexComponent } from './my-pokedex.component';

describe('MyPokedexComponent', () => {
  let component: MyPokedexComponent;
  let fixture: ComponentFixture<MyPokedexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPokedexComponent]
    });
    fixture = TestBed.createComponent(MyPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
