import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationResponse } from '../pages/locations/interfaces/LocationResponse';
import { PokedexResponse } from '../pages/locations/interfaces/PokedexResponse';
import { RegionDetailsResponse } from '../pages/locations/interfaces/RegionsDetailsResponse';
import { LocationDetailsResponse } from '../pages/locations/interfaces/LocationDetailsResponse';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {

  }

  getRegions(): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${baseUrl}region`);
  }

  getRegionById(id: number): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${baseUrl}region/${id}`);
  }

  getPokedex(url: string): Observable<PokedexResponse> {
    return this.http.get<PokedexResponse>(url);
  }

  getSpecificRegion(query: string): Observable<RegionDetailsResponse> {
    return this.http.get<RegionDetailsResponse>(query);
  }

  getLocations(): Observable<LocationResponse> {
    return this.http.get<LocationResponse>(`${baseUrl}location`)
  }

  getSpecificLocation(query: string): Observable<LocationDetailsResponse> {
    return this.http.get<LocationDetailsResponse>(query);
  }

}

const baseUrl: string = 'https://pokeapi.co/api/v2/';