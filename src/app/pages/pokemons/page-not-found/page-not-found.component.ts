import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {


  constructor(private router: Router, private logServ: LoginService, private dialogs: InfoDialogsService) { }

  backHome() {
    this.router.navigate(['pokemons/all']);
  }

  logIn() {
    const userEmail = this.logServ.getCookieUser();
    if (userEmail) {
      this.dialogs.showError('Error', 'You are already logged in')
      this.router.navigate(['pokemons/all']);
    } else {
      this.router.navigate(['login']);
    }
  }

}
