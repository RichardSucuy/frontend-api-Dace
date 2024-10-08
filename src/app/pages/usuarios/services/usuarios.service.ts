import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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

  // usuarios.service.ts
  getCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/usuarios/count`, { headers: this.getHeaders() });
  }
  
  getAllUsuarios(): Observable< IUsuario[] > {
    const url: string =  `${this.apiUrl}/usuarios`;
    return this.httpClient.get< IUsuario[]>(url, { headers: this.getHeaders() });
  }

  getUsuarioById(id: number): Observable<any> {
    const url: string = `${this.apiUrl}/usuarios/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  getUsuarioByCed(ced: number): Observable<any> {
    const url: string = `${this.apiUrl}/usuarios/cedula/${ced}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(usuario: IUsuario): Observable<any> {
    const url: string = `${this.apiUrl}/usuarios`;
    return this.httpClient.post<any>(url, usuario, { headers: this.getHeaders() });
  }

  update(usuario: IUsuario): Observable<any> {
    const url: string = `${this.apiUrl}/usuarios`;
    return this.httpClient.put<any>(url, usuario, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    const url: string = `${this.apiUrl}/usuarios/${id}`;
    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }


}
