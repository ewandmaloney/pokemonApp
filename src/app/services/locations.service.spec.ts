import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('LocationsService', () => {
  let service: LocationService;
  let http: HttpClient
  let httpController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        
      ],
      imports: [
       HttpClientTestingModule 
      ]
    });
    service = TestBed.inject(LocationService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getRegions', () => {
    service.getRegions().subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/region');
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('json');
    req.flush(httpController)
  })

  it('should call getRegionById', () => {
    service.getRegionById(1).subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/region/1');
    expect(req.request.method).toEqual('GET');
  })

  it('should call getPokedex', () => {
    service.getPokedex('https://pokeapi.co/api/v2/pokedex/1').subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/pokedex/1');
    expect(req.request.method).toEqual('GET');
  })

  it('should call getSpecificRegion', () => {
    service.getSpecificRegion('https://pokeapi.co/api/v2/region/1').subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/region/1');
    expect(req.request.method).toEqual('GET');
  })

  it('should call getLocations', () => {
    service.getLocations().subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/location');
    expect(req.request.method).toEqual('GET');
  })

  it('should call getSpecificLocation', () => {
    service.getSpecificLocation('https://pokeapi.co/api/v2/location/1').subscribe();
    const req = httpController.expectOne('https://pokeapi.co/api/v2/location/1');
    expect(req.request.method).toEqual('GET');
  })


});
