import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { InfoDialogsService } from 'src/app/services/info-dialogs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean = true;

  constructor(private logServ: LoginService, private dialog: InfoDialogsService, private auth: FirebaseAuthService) {
  }

  ngOnInit(): void {
    let userLoggedIn: boolean = this.logServ.getCookieUser() ? true : false;
    if (userLoggedIn) {
      this.logServ.makeSubjectGoTrue();
    }
    this.logServ.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
  }

  logout() {
    this.dialog.showConfirmationDialog('Logout', 'Are you sure you want to logout?', () => {
      this.auth.logout().then(() => {
        this.logServ.logout();
      }).catch((error) => {
        console.log(error)
      });
    });
  }

}
