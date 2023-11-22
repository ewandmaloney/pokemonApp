import { TestBed } from '@angular/core/testing';

import { InfoDialogsService } from './info-dialogs.service';

describe('InfoDialogsService', () => {
  let service: InfoDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
