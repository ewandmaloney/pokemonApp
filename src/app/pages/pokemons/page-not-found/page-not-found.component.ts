import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {


  constructor(private router: Router) { }

  backHome() {
    this.router.navigate(['pokeApp/pokemons/all']);
  }
  logIn() {
    this.router.navigate(['pokeApp/login']);
  }

}