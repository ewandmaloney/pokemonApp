import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InfoDialogsService {

  constructor() { }


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
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
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
