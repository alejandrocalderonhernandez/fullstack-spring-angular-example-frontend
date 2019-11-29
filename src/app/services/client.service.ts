import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/client-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private uri = 'localhost:8090/api/clients/';

  constructor( private http: HttpClient) { }

  public getAllClients(): Observable<ClientModel[]> {
    const urlFindAll = `${this.uri}findAll`;
    return this.http.get(urlFindAll, this.getHeaders()).pipe(map( client =>
      client as ClientModel[]));
  }

  public createClient( client: ClientModel ): Observable<ClientModel> {
    const urlCreate = `${this.uri}client`;
    return this.http.post<ClientModel>(urlCreate, client, this.getHeaders());
  }

  public getClient( id: number ): Observable<ClientModel> {
    const urlGetById = `${this.uri}client/${id}`;
    return this.http.get<ClientModel>(urlGetById, this.getHeaders());
  }

  public updateClient( client: ClientModel ): Observable<ClientModel> {
    const urlUpdate = `${this.uri}client/${client.id}`;
    return this.http.put<ClientModel>(urlUpdate, client, this.getHeaders());
  }

  public deleteClient( id: number ): Observable<number> {
    const urlUpdate = `${this.uri}client/${id}`;
    return this.http.delete<number>(urlUpdate, id, this.getHeaders());
  }

  private getHeaders(): {headers: HttpHeaders} {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('Access-Control-Allow-', 'Content-type');
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    const options = {
      headers: httpHeaders
    };
    return options;
  }


}
