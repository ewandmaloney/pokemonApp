import { TestBed } from '@angular/core/testing';

import { LocationsService } from './location.service';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
