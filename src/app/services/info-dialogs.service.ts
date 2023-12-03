import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InfoDialogsService {

  constructor(private translateService: TranslateService) { }


  showInformation(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  }

  showError(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  }

  showSuccess(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Ok',
      allowOutsideClick: false
    });
  }

  showConfirmationDialog(title: string, text: string, callback: () => void) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('Yes'),
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  showConfirmationDialog2(title: string, text: string, confirmButtonText: string, callback: () => void, callback2: () => void) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      } else {
        callback2();
      }
    });
  }

  showLoading(title: string) {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    });
  }

}
