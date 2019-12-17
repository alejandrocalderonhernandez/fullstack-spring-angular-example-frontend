import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'localhost:8090/api/';
  private credencials = btoa('angular-app:4ngul4r');
  private user: User;
  private token: string;

  constructor( private http: HttpClient, private router: Router ) { }


  public getUser(): User {
    if ( this.user != null ) {
      return this.user;
    } else if ( this.user == null && sessionStorage.getItem('user')) {
     this.user = JSON.parse(sessionStorage.getItem('user')) as User;
    }
    return this.user;
  }

  public getToken(): string {
    if ( this.token != null ) {
      return this.token;
    } else if ( this.user == null && sessionStorage.getItem('user')) {
     this.token = sessionStorage.getItem('user');
    }
    return this.token;
  }

  public login( user: User ): Observable<any> {
    const url = `${this.baseUrl}oauth/token`;
    return this.http.post<any>( url, this.getParams( user ), this.getHeaders() );
  }

  public logout(): void {
   this.token = null;
   this.user = null;
   sessionStorage.removeItem('user');
   sessionStorage.removeItem('token');
   this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const payload = this.getPayload(this.getToken());
    return ( payload != null && payload.user_name > 0 ) ? true : false;
  }

  public hasRole( role: string ): boolean {
    const roles = this.user.roles;
    roles.forEach( r => {
      if ( r === role ) {
        return true;
      }
    });
    return false;
  }

  public saveUser( accesToken: string ): void {
    const payload = this.getPayload( accesToken );
    this.user = new User();
    this.user.name = payload.name;
    this.user.lastname = payload.lastname;
    this.user.email = payload.email;
    this.user.username = payload.user_name;
    this.user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  public saveToken( accessToken: string ): void {
    this.token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public getPayload( accessToken: string ): any {
    if ( accessToken != null ) {
      return JSON.parse( atob( accessToken.split('.')[1] ) );
    }
    return null;
  }

  private getParams( user: User ): string {
    const params =  new URLSearchParams();
    params.set('grant_type', 'password');
    params.set( 'username', user.username);
    params.set( 'password', user.password );
    return params.toString();
  }

  private getHeaders(): {headers: HttpHeaders} {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/x-www-form-urlencoder');
    httpHeaders.set('Authorization', 'Basic ' + this.credencials);
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders.set('Access-Control-Max-Age', '3600');
    httpHeaders.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT, OPTIONS');
    const options = {
      headers: httpHeaders
    };
    return options;
  }
}
