import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IClientes } from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

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


  // clientes.service.ts
  getCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/clientes/count`, { headers: this.getHeaders() });
  }

  getAllClientes(): Observable< IClientes[] > {
    const url: string =  `${this.apiUrl}/clientes`;
    return this.httpClient.get< IClientes[]>(url, { headers: this.getHeaders() });
  }

  getClientesById(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/clientes/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(cliente:IClientes): Observable<any> {
    const url: string =  `${this.apiUrl}/clientes`;
    return this.httpClient.post<any>(url, cliente, { headers: this.getHeaders() });
  }

  update(cliente:IClientes): Observable<any> {
    const url: string =  `${this.apiUrl}/clientes`;
    return this.httpClient.put<any>(url, cliente, { headers: this.getHeaders() });
  }

  delete(id:number):Observable<any> {
    const url: string =  `${this.apiUrl}/clientes/${id}`;

    console.log( url );

    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }

}
