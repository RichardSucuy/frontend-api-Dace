import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ITemas } from '../interfaces/temas.interface';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

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

  
  getAllTemas(): Observable< ITemas[] > {
    const url: string =  `${this.apiUrl}/temas`;
    return this.httpClient.get< ITemas[]>(url, { headers: this.getHeaders() });
  }

  getTemasById(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/temas/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(cliente:ITemas): Observable<any> {
    const url: string =  `${this.apiUrl}/temas`;
    return this.httpClient.post<any>(url, cliente, { headers: this.getHeaders() });
  }

  update(cliente:ITemas): Observable<any> {
    const url: string =  `${this.apiUrl}/temas`;
    return this.httpClient.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  delete(id:number):Observable<any> {
    const url: string =  `${this.apiUrl}/temas/${id}`;

    console.log( url );

    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }

}
