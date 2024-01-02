import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfoComponent } from './location-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import { MainGeneration, Name, RegionDetailsResponse } from '../interfaces/RegionsDetailsResponse';

class MockRegionDetailsResponse implements RegionDetailsResponse {
  id!: number;
  locations!: MainGeneration[];
  main_generation!: MainGeneration | null;
  name!: string;
  names!: Name[];
  pokedexes!: MainGeneration[];
  version_groups!: MainGeneration[];
}

describe('LocationInfoComponent', () => {
  let component: LocationInfoComponent;
  let fixture: ComponentFixture<LocationInfoComponent>;
  let locService: LocationService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationInfoComponent,
      ],
      providers: [TranslateService],
      imports: [HttpClientTestingModule,
        TranslateModule.forRoot()]
    });
    fixture = TestBed.createComponent(LocationInfoComponent);
    router = TestBed.inject(Router);
    locService = TestBed.inject(LocationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnDestroy should unsubscribe', () => {
    component.ngOnDestroy();
    expect(component.ngUnsubscribe).toBeTruthy();
    expect(component.ngUnsubscribe.closed).not.toBeTruthy();
  });

  it('#ngOnInit should call #getAllRegions', () => {
    spyOn(component, 'getAllRegions');
    component.ngOnInit();
    expect(component.getAllRegions).toHaveBeenCalledTimes(1);
  });

  it('#getAllRegions should be called', () => {
    spyOn(component, 'getAllRegions');
    component.getAllRegions();
    expect(component.getAllRegions).toHaveBeenCalledTimes(1);
  });

  it('#getInfoRegion should be called', () => {
    spyOn(component, 'getInfoRegion');
    component.getInfoRegion();
    expect(component.getInfoRegion).toHaveBeenCalledTimes(1);
  });

  it('should call goToRegionInfo', () => {
    spyOn(router, 'navigate');
    component.goToRegionInfo(1);
    expect(router.navigate).toHaveBeenCalledWith(['locations/region', 1]);
  })

  it('#orderById sort by descending', () => {
    const region1 = new MockRegionDetailsResponse();
    region1.id = 1
    const region2 = new MockRegionDetailsResponse();
    region2.id = 25
    const region3 = new MockRegionDetailsResponse();
    region3.id = 3
    component.orderId = false;
    component.copyRegions = [
      region1,
      region2,
      region3
    ]
    component.orderById();
    expect(component.orderId).toBeTrue();
    expect(component.regions).toEqual([
      region2,
      region3,
      region1
    ])
  });

  it('#orderById sort by ascending', () => {
    const region1 = new MockRegionDetailsResponse();
    region1.id = 1
    const region2 = new MockRegionDetailsResponse();
    region2.id = 25
    const region3 = new MockRegionDetailsResponse();
    region3.id = 3
    component.orderId = true;
    component.copyRegions = [
      region1,
      region2,
      region3
    ]
    component.orderById();
    expect(component.orderId).toBeFalse();
    expect(component.regions).toEqual([
      region1,
      region3,
      region2
    ])
  });

  it('#orderByName should be called and sort regions in descending order', () => {
    const region1 = new MockRegionDetailsResponse();
    region1.name = 'S'
    const region2 = new MockRegionDetailsResponse();
    region2.name = 'A'
    const region3 = new MockRegionDetailsResponse();
    region3.name = 'E'
    component.orderName = false;
    component.copyRegions = [
      region1,
      region2,
      region3
    ]
    component.orderByName();
    expect(component.orderName).toBeTrue();
    expect(component.regions).toEqual([
      region1,
      region3,
      region2
    ])
  });

  it('#orderByName should be called and sort regions in ascending order', () => {
    const region1 = new MockRegionDetailsResponse();
    region1.name = 'S'
    const region2 = new MockRegionDetailsResponse();
    region2.name = 'A'
    const region3 = new MockRegionDetailsResponse();
    region3.name = 'E'
    component.orderName = true;
    component.copyRegions = [
      region1,
      region2,
      region3
    ]
    component.orderByName();
    expect(component.orderName).toBeFalse();
    expect(component.regions).toEqual([
      region2,
      region3,
      region1
    ])
  });

});


