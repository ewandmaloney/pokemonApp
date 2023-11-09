import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private cookie: CookieService) { }


  logIn(username: string) {
    return this.http.post<any>('http://localhost:4200/login', { username }).pipe(
      tap(res => {
        if (res) {
          const authorized = res.filter((user: any) => user.email == username);
          if (authorized.length > 0) {
            const userEmail = authorized[0].email
            alert('Usuario autorizado');
            this.saveCookie(userEmail);
            this.router.navigate(['/pokemons']);
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
    ).subscribe();
  }

  saveCookie(email: string) {
    this.cookie.put('user', email);
  }


  getAllUsers() {
    return this.http.get('assets/users.json');
  }

  getCookie() {
    return this.cookie.get('user');
  }

  logout() {
    this.deleteCookie();
  }

  deleteCookie() {
    if (this.getCookie()) {
      console.log('Cookie borrada')
      this.cookie.remove('user');
      this.router.navigate(['/login']);
    } else {
      console.log('No hay cookie que borrar')
    }
  }



}
