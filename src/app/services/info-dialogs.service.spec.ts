import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InfoDialogsService } from './info-dialogs.service';
import Swal from 'sweetalert2';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockTranslateService {
  instant(key: string) {
    return key;
  }
}

class MockCallback {
  callback() { }
}

describe('InfoDialogsService', () => {
  let service: InfoDialogsService;
  let translateService: TranslateService;
  let swalSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoDialogsService,
        { provide: TranslateService, useClass: MockTranslateService }
      ],
      imports: [
        TranslateModule.forRoot(), HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InfoDialogsService);
    translateService = TestBed.inject(TranslateService);

    swalSpy = spyOn(Swal, 'fire').and.stub();
    spyOn(Swal, 'showLoading').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show information', () => {
    service.showInformation('testTitle', 'testText');
    expect(swalSpy).toHaveBeenCalledWith({
      title: 'testTitle',
      text: 'testText',
      icon: 'info',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  });

  it('should show error', () => {
    service.showError('testTitle', 'testText');
    expect(swalSpy).toHaveBeenCalledWith({
      title: 'testTitle',
      text: 'testText',
      icon: 'error',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  });

  it('should show success', () => {
    service.showSuccess('testTitle', 'testText');
    expect(swalSpy).toHaveBeenCalledWith({
      title: 'testTitle',
      text: 'testText',
      icon: 'success',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  });

});