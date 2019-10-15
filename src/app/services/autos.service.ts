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

  AUTH: string = 'http://34.231.146.47:3000/api/auth/';
  API_URL: string = 'http://34.231.146.47:3000/api/vehicles/';

  authSubject = new BehaviorSubject(false);

  private token: string;

  autos: any[] = [];

  constructor(private http: HttpClient) {
    this.getAllAutos();
   }

/*    register(user: User): Observable<Jwt> {
     return this.http.post<Jwt>(`${this.API_URL}/register`,
     user).pipe(tap(
       (res: Jwt) => {
         if(res) {
           this.saveToken(res.dataUser.token);
         }
       }
     ));
   } */

   login(user: User): Observable<Jwt> {
     return this.http.get<Jwt>(`${this.AUTH}${user.email}/${user.password}`).pipe(tap(
       (res: Jwt) => {
         if (res) {
          this.saveToken(res.token);
         }
       }
     ));
   }

   logout(): void {
     this.token = '';
     localStorage.removeItem("ACCESS_TOKEN");
   }

  private saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }


  private getAllAutos() {

  if(this.token) {
    //return new Promise( ( resolve, reject ) => {
      this.http.get(this.API_URL + '?token=' + this.token)
          .subscribe( (resp: any[]) => {
            this.autos = resp.vehicles;
            //resolve();
            console.log(this.autos);
           });
      //});
    } else {
      console.log('No hay token');
    }
  }

}
