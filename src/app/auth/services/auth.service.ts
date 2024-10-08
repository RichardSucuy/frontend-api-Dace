import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthStatus } from '../enums/auth-status.enum';
import { ILoginForm } from '../interfaces/login-form.interface';
import { IUsuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private _authStatus: AuthStatus = AuthStatus.notAuthenticated;
  private _loggedInUser: IUsuario | null = null;


  constructor(
    private httpClient: HttpClient,
  ) {
    this.checkAuthStatus().subscribe();
  }

  get loggedInUser(): IUsuario | null {
    return this._loggedInUser;
  }

  get authStatus(): AuthStatus {
    return this._authStatus;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  set token(value: string) {
    localStorage.setItem('token', value);
  }

  private setAuthentication(user:IUsuario, token:string): void {
    this._authStatus = AuthStatus.authenticated;
    this._loggedInUser = user;
    this.token = token;
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.removeToken();
    this._authStatus = AuthStatus.notAuthenticated;
    this._loggedInUser = null;
    this.token = '';
  }

  login(formData:ILoginForm): Observable<boolean> {
    const url: string = `${this.apiUrl}/auth/login`;

    return this.httpClient.post(url, formData).pipe(
      map((res: any) => {

        const user: IUsuario = {
          id: res.user.id_usuario,
          cedula: res.user.cedula_usu,
          fullname: res.user.nombre_usu,
          username: res.user.user,
          password:  res.user.password,
          email: res.user.email_usu,
          isActive: true,
        }

        if( formData.rememberMe ) {
          localStorage.setItem('username', formData.username);
        } else {
          localStorage.removeItem('username');
        }

        this.setAuthentication(user, res.token);
        return true;
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url: string = `${this.apiUrl}/auth/renew`;

    if( !this.token ) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

    return this.httpClient.get<boolean>( url , { headers }).pipe(
      map( (res: any) => {

        
        const user: IUsuario = {
          id: res.user.id_usuario,
          cedula: res.user.cedula_usu,
          fullname: res.user.nombre_usu,
          username: res.user.user,
          password:  res.user.password,
          email: res.user.email_usu,
          isActive: true,
        }

        this.setAuthentication(user, res.token);
        return true;
      }),
      catchError( (error: any) => {
        this._authStatus = AuthStatus.notAuthenticated;
        return of(false);
      })
    );

  }


}
