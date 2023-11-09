import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }


  logIn(username: string) {
    return this.http.post<any>('http://localhost:4200/login', { username }).pipe(
      tap(res => {
        if (res) {
          const authorized = res.filter((user: any) => user.email == username);
          if (authorized.length > 0 ) {
            alert('Usuario autorizado');
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



}
