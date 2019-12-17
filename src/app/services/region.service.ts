import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionModel } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private uri = 'localhost:8090/api/region/';

  constructor(  private http: HttpClient) { }

  public getRegions(): Observable<RegionModel[]> {
    const url = `${this.uri}findAll`;
    return this.http.get<RegionModel[]>(url, this.getHeaders());
  }

  private getHeaders(): {headers: HttpHeaders} {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    httpHeaders.set('Access-Control-Max-Age', '3600');
    httpHeaders.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH, OPTIONS');
    const options = {
      headers: httpHeaders
    };
    return options;
  }
}
