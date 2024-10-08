import { Component, Input, OnInit } from '@angular/core';
import { IUsuario } from '../interfaces/usuarios.interface';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css'
})
export class UsuariosFormComponent implements OnInit {

  isEditing: boolean = false;

  @Input() usuarioForm: IUsuario = {
    id_usuario: 0,
    cedula_usu: '',
    nombre_usu: '',
    email_usu: '',
    user: '',
    password: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarioId();
  }

  obtenerUsuarioId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.usuarioForm.id_usuario = +params['id'];
        this.isEditing = true;
        this.getUsuario();
      }
    });
  }

  getUsuario(): void {
    this.usuarioService.getUsuarioById(this.usuarioForm.id_usuario!).subscribe(
      (res: any) => {
          if (Array.isArray(res) && res.length > 0) {
            this.usuarioForm = res[0];
          } else {
            this.usuarioForm = res;
          }
      },
      (err: any) => {
        this.showAlertMessage('Oops...', err.error.message, 'error', 'top-end');
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.editar();
    } else {
      this.guardar();
    }
  }

  guardar(): void {

    // VALIDACIÓN DE LAS ENTRADAS INDIVIDUALES
    if (!this.usuarioForm.cedula_usu) {
      this.showAlertMessage('Información', 'La cédula del usuario es obligatoria', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.nombre_usu) {
      this.showAlertMessage('Información', 'El nombre del usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.email_usu) {
      this.showAlertMessage('Información', 'El email del usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.user) {
      this.showAlertMessage('Información', 'El nombre de usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.password) {
      this.showAlertMessage('Información', 'La contraseña del usuario es obligatoria', 'question', 'top-end');
      return;
    }

    console.log( this.usuarioForm );
    this.usuarioService.create(this.usuarioForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Usuario registrado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/usuarios');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al registrar el nuevo usuario', 'error');
      }
    );
  }

  editar(): void {

        // VALIDACIÓN DE LAS ENTRADAS INDIVIDUALES
    if (!this.usuarioForm.cedula_usu) {
      this.showAlertMessage('Información', 'La cédula del usuario es obligatoria', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.nombre_usu) {
      this.showAlertMessage('Información', 'El nombre del usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.email_usu) {
      this.showAlertMessage('Información', 'El email del usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.user) {
      this.showAlertMessage('Información', 'El nombre de usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.usuarioForm.password) {
      this.showAlertMessage('Información', 'La contraseña del usuario es obligatoria', 'question', 'top-end');
      return;
    }

    console.log( this.usuarioForm );
    this.usuarioService.update(this.usuarioForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Usuario actualizado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/usuarios');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al guardar los cambios del usuario', 'error');
      }
    );
  }

  showAlertMessage(title: string, text: string, icon: SweetAlertIcon, position: SweetAlertPosition): void {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 3000
    });
  }
}