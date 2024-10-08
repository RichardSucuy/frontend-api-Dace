import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IProductosServicios } from '../interfaces/productos_servicios.interface'; // Actualiza la importación

@Injectable({
  providedIn: 'root'
})
export class ProductosServiciosService { // Cambia el nombre del servicio

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

  // productos-servicios.service.ts
  getCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/productos_servicios/count`, { headers: this.getHeaders() });
  }

  getAllProductosSevicios(): Observable< IProductosServicios[] > {
    const url: string =  `${this.apiUrl}/productos_servicios`;
    return this.httpClient.get< IProductosServicios[]>(url, { headers: this.getHeaders() });
  }

  getProductosServiciosById(id: number): Observable<any> { // Actualiza el nombre del método
    const url: string =  `${this.apiUrl}/productos_servicios/${id}`;
    return this.httpClient.get<any>(url, { headers: this.getHeaders() });
  }

  create(productoServicio: IProductosServicios): Observable<any> { // Actualiza el parámetro y el tipo
    const url: string =  `${this.apiUrl}/productos_servicios`;
    return this.httpClient.post<any>(url, productoServicio, { headers: this.getHeaders() });
  }

  update(productoServicio: IProductosServicios): Observable<any> { // Actualiza el parámetro y el tipo
    const url: string =  `${this.apiUrl}/productos_servicios`;
    return this.httpClient.put<any>(url, productoServicio, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    const url: string =  `${this.apiUrl}/productos_servicios/${id}`;
    return this.httpClient.delete<any>(url, { headers: this.getHeaders() });
  }
}
