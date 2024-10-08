import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ILoginForm } from '../interfaces/login-form.interface';

import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loading: boolean = false;
  toast: any;

  @Input() loginForm: ILoginForm = {
    username: '',
    password: '',
    rememberMe: false
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  onLogin(): void {

    if( this.loginForm.username.trim() === '' || this.loginForm.password.trim() === '') {
      this.toast.fire({
        icon: 'error',
        title: 'Todos los campos son obligatorios.'
      })
      return ;
    }

    this.loading = true;
    this.authService.login( this.loginForm )
      .pipe( delay(2000) )
      .subscribe({
         next: () => {
           this.router.navigateByUrl('/dashboard');
         },
         error: (err:any) => {
          console.log( err );
           this.loading = false;
           this.toast.fire({
             icon: 'error',
             title: 'Usuario o contraseña incorrectos.'
           })
         }
      });


    // location.href='http://localhost:4200/dashboard'
  }

  private isValidEmail(email: string): boolean {
    // Expresión regular para validar un correo electrónico
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

}

