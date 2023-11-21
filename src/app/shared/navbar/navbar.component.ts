import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = true;

  constructor(private logServ: LoginService) {
  }

  ngOnInit(): void {
    this.logServ.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  logout() {
    this.logServ.logout();
  }

}
