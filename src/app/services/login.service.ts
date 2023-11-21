import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl: string | null = null;
  //Es un tipo de observable que mantiene un valor y lo emite a los nuevos subscriptores
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) { }


  logIn(username: string) {
    return this.http.post<any>('http://localhost:4200/login', { username }).pipe(
      tap(res => {
        if (res) {
          const authorized = res.filter((user: any) => user.email == username);
          if (authorized.length > 0) {
            const userEmail = authorized[0].email
            const userId = authorized[0].id
            // alert('Usuario autorizado');
            this.saveCookie(userEmail, userId);
            if (this.redirectUrl) {
              this.router.navigate([this.redirectUrl]);
              this.redirectUrl = null;
            } else {
              this.router.navigate(['pokemons/all']);
            }
          } else {
            alert('Usuario no autorizado');
          }
        } else {
          alert('No se han recogido los usuarios del interceptor');
        }
      }),
      catchError((error) => {
        alert('Ocurrio un error durante la autenticacion');
        console.log('Error:', error);
        throw error;
      })
    );
  }

  saveCookie(email: string, id: number) {
    this.cookie.put('user', email);
    this.cookie.put('id', id.toString());
    //Con el next actualizo su valor
    this.loggedIn.next(true);
  }


  getAllUsers() {
    return this.http.get('assets/users.json');
  }

  getCookieUser() {
    return this.cookie.get('user');
  }

  getCookieId() {
    return this.cookie.get('id');
  }

  makeSubjectGoTrue() {
    return this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    this.deleteCookie();
  }

  deleteCookie() {
    if (this.getCookieUser()) {
      console.log('Cookie borrada')
      this.cookie.remove('user');
      this.cookie.remove('id');
      this.router.navigate(['login']);
    } else {
      console.log('No hay cookie que borrar')
    }
  }



}
