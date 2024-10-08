import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICanal } from '../interfaces/canales.interface';

@Injectable({
  providedIn: 'root'
})
export class CanalesService {


  private readonly apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  get token(): string  {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

    
  getAllCanales(): Observable< ICanal[] > {
    const url: string =  `${this.apiUrl}/canal`;
    return this.httpClient.get< ICanal[]>(url, { headers: this.getHeaders() });
  }
  
  getCanalById(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/canal/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(cliente:ICanal): Observable<any> {
    const url: string =  `${this.apiUrl}/canal`;
    return this.httpClient.post<any>(url, cliente, { headers: this.getHeaders() });
  }

  update(cliente:ICanal): Observable<any> {
    const url: string =  `${this.apiUrl}/canal`;
    return this.httpClient.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  delete(id:number):Observable<any> {
    const url: string =  `${this.apiUrl}/canal/${id}`;

    console.log( url );

    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }
}