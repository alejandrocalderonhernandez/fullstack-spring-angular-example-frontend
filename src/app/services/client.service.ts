import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ClientModel } from '../models/client-model';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ErrorMessages } from '../utils/messages/error-messages';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { SuccessMesages } from '../utils/messages/succes-messages';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private uri = 'localhost:8090/api/clients/';
  private messages = new ErrorMessages();

  constructor( private http: HttpClient, private router: Router,
               private loginService: LoginService,
               private messagess = SuccessMesages ) { }

  public getAllClients( page: number ): Observable<any> {
    const urlFindAll = `${this.uri}clients/${page}`;
    return this.http.get(urlFindAll, this.getHeaders()).pipe(map( (response: any) =>
      response.content as ClientModel[]
    ));
  }

  public getClient( id: number ): Observable<ClientModel> {
    const urlGetById = `${this.uri}client/${id}`;
    return this.http.get<ClientModel>(urlGetById, this.getHeaders()).pipe(
      catchError( error => {
        this.router.navigate(['/clients']);
        this.messages.showBasicMessage(error.error.messages);
        return throwError(error);
    }));
  }

  public createClient( client: ClientModel ): Observable<ClientModel> {
    const urlCreate = `${this.uri}client`;
    return this.http.post(urlCreate, client, this.getHeaders()).pipe(
      map( (responce: any) => responce.client as ClientModel),
      catchError( error => {
        if (error.status() === 400) {
          return throwError(error);
        }
        this.messages.showBasicMessage(error.error.messages);
        return throwError(error);
    }));
  }

  public updateClient( client: ClientModel ): Observable<ClientModel> {
    const urlUpdate = `${this.uri}client/${client.id}`;
    return this.http.put<ClientModel>(urlUpdate, client, this.getHeaders()).pipe(
      catchError( error => {
        if (error.status() === 400) {
          return throwError(error);
        }
        this.messages.showBasicMessage(error.error.messages);
        return throwError(error);
    }));
  }

  public deleteClient( id: number ): Observable<number> {
    const urlUpdate = `${this.uri}client/${id}`;
    return this.http.delete<number>(urlUpdate, this.getHeaders()).pipe(
      catchError( error => {
        this.messages.showBasicMessage(error.error.messages);
        return throwError(error);
    }));
  }

  public uploadImg( file: File, id): Observable<HttpEvent<any>> {
    const formData = new FormData();
    const urlUpdate = `${this.uri}clients/img`;
    const req = new HttpRequest('POST', urlUpdate, formData, {
      reportProgress: true
    });
    formData.append('file', file);
    formData.append('id', id);
    return this.http.request(req);
  }

  private isNotAuthorized( e ): boolean {
    if ( e.status === 401 ) {
      if ( this.loginService.isAuthenticated() ) {
        this.loginService.logout();
      }
      this.router.navigate(['/login']);
    }

    if ( e.status === 403 ) {
      this.messages.showBasicMessage('Unatithorized!');
      this.router.navigate(['/clients']);
      return true;
    }

    return false;
  }

  private getHeaders(): {headers: HttpHeaders} {
    const token = this.loginService.getToken();
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + token);
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders.set('Access-Control-Max-Age', '3600');
    httpHeaders.set('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT, OPTIONS');
    const options = {
      headers: httpHeaders
    };
    return options;
  }

}
