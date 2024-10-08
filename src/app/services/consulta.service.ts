import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private readonly apiUrl: string = 'http://144.217.221.124:3000/api/v1/consultas';

  constructor(
    private httpClient: HttpClient
  ) {}

  consultaCedula(cedula: string): Observable<any> {
    const url = `${this.apiUrl}/cedula/${cedula}`;
    return this.httpClient.get<any>(url).pipe(
      map((res: any) => res.resultado)
    );
  }

  consultaRuc(ruc: string): Observable<any> {
    const url = `${this.apiUrl}/ruc/${ruc}`;
    return this.httpClient.get<any>(url).pipe(
      map((res: any) => res.resultado)
    );
  }
}
