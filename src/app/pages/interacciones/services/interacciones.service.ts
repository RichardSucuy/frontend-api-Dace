import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IInteracciones } from '../interfaces/interacciones.interface';

@Injectable({
  providedIn: 'root'
})
export class InteraccionesService {


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

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/interacciones/count`, { headers: this.getHeaders() });
  }

  getUltimasInteracciones(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/interacciones/ultimas`, { headers: this.getHeaders() });
  }

  getActividadReciente(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/interacciones/actividad-reciente`, { headers: this.getHeaders() });
  }

  getInteraccionesById(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/interacciones/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(cliente:IInteracciones): Observable<any> {
    const url: string =  `${this.apiUrl}/interacciones`;
    return this.httpClient.post<any>(url, cliente, { headers: this.getHeaders() });
  }

  update(cliente:IInteracciones): Observable<any> {
    const url: string =  `${this.apiUrl}/interacciones`;
    return this.httpClient.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  delete(id:number):Observable<any> {
    const url: string =  `${this.apiUrl}/interacciones/${id}`;

    console.log( url );

    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }

}
