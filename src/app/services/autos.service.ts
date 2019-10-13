import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jwt } from '../interfaces/jwt';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutosService {

  /* URL = 'http://34.231.146.47:3000/api/auth/pruebas@terantbwa.com.mx/Vpz6zPv:i!35LDs'; */

  API_URL = 'http://34.231.146.47:3000/api/vehicles/';

  authsubject = new BehaviorSubject(false);

  private token: string;

  autos: any[] = [];

  constructor(private http: HttpClient) {
    this.getAllAutos();
   }

   register(user: User): Observable<Jwt> {
     return this.http.post<Jwt>(`${this.API_URL}/register`,
     user).pipe(tap(
       (res: Jwt) => {
         if(res) {
           // guardar token
           this.saveToken(res.dataUser.token, res.dataUser.expiresIn);
         }
       }
     ));
   }

   login(user: User): Observable<Jwt> {
     return this.http.post<Jwt>(`${this.API_URL}/auth`,
     user).pipe(tap(
       (res: Jwt) => {
         if(res) {
           // guardar token
           this.saveToken(res.dataUser.token, res.dataUser.expiresIn);
         }
       }
     ));
   }

   logout(): void {
     this.token = '';
     localStorage.removeItem("ACCESS_TOKEN");
     localStorage.removeItem("EXPIRES_IN");
   }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }


  private getAllAutos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get(this.API_URL + this.token)
          .subscribe( (resp: any[]) => {
            this.autos = resp;
            resolve();
            console.log(resp);
          });

    });

  }

}
