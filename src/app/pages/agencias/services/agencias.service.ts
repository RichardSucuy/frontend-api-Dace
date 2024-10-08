import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAgencias } from '../interfaces/agencias.interface';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AgenciasService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }

  private get token(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }


  getAllAgencias(): Observable< IAgencias[] > {
    const url: string =  `${this.apiUrl}/agencias`;
    return this.httpClient.get< IAgencias[]>(url, { headers: this.getHeaders() });
  }

  
  getAgenciaById(id: number): Observable<IAgencias> {
    const url: string = `${this.apiUrl}/agencias/${id}`;
    return this.httpClient.get<IAgencias>(url, { headers: this.getHeaders() });
  }

  create(agencia: IAgencias): Observable<IAgencias> {
    const url: string = `${this.apiUrl}/agencias`;
    return this.httpClient.post<IAgencias>(url, agencia, { headers: this.getHeaders() });
  }

  update(agencia: IAgencias): Observable<IAgencias> {
    const url: string = `${this.apiUrl}/agencias`;
    return this.httpClient.put<IAgencias>(url, agencia, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    const url: string = `${this.apiUrl}/agencias/${id}`;
    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }
}