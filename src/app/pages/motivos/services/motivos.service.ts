import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IMotivos } from '../interfaces/motivo.interface';

@Injectable({
  providedIn: 'root'
})
export class MotivosService {

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

  // motivos.service.ts
  getCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/motivos/count`, { headers: this.getHeaders() });
  }


  getMotivosById(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/motivos/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(cliente:IMotivos): Observable<any> {
    const url: string =  `${this.apiUrl}/motivos`;
    return this.httpClient.post<any>(url, cliente, { headers: this.getHeaders() });
  }

  update(cliente:IMotivos): Observable<any> {
    const url: string =  `${this.apiUrl}/motivos`;
    return this.httpClient.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  delete(id:number):Observable<any> {
    const url: string =  `${this.apiUrl}/motivos/${id}`;

    console.log( url );

    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }

}
