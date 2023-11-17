import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {

  public loggedIn : boolean = true;

  constructor(private logServ: LoginService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit(): void {

  }

  logout() {
    this.loggedIn = false;
    this.logServ.logout();
  }

}
