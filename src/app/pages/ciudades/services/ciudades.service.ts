import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICiudades } from '../interfaces/ciudades.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllCiudades(): Observable< ICiudades[] > {
    const url: string =  `${this.apiUrl}/ciudades`;
    return this.httpClient.get< ICiudades[]>(url, { headers: this.getHeaders() });
  }

  getCiudadesById(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/ciudades/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(cliente:ICiudades): Observable<any> {
    const url: string =  `${this.apiUrl}/ciudades`;
    return this.httpClient.post<any>(url, cliente, { headers: this.getHeaders() });
  }

  update(cliente:ICiudades): Observable<any> {
    const url: string =  `${this.apiUrl}/ciudades`;
    return this.httpClient.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  delete(id:number):Observable<any> {
    const url: string =  `${this.apiUrl}/ciudades/${id}`;

    console.log( url );

    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }

}
