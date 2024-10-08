import { Component, Input, OnInit } from '@angular/core';
import { ICanal } from '../interfaces/canales.interface';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CanalesService } from '../services/canales.service';

@Component({
  selector: 'app-canales-form',
  templateUrl: './canales-form.component.html',
  styleUrl: './canales-form.component.css'
})
export class CanalesFormComponent implements OnInit {

  isEditing: boolean = false;

  @Input() canalForm: ICanal = {
    id_canal: 0,
    nombre_can: '',
    descripcion_can: '',
    extension_can: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private canalesService: CanalesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerCanalId();
  }

  obtenerCanalId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.canalForm.id_canal = +params['id'];
        this.isEditing = true;
        this.getCanal();
      }
    });
  }

  getCanal(): void {
    this.canalesService.getCanalById(this.canalForm.id_canal!).subscribe(
      (res: any) => {
          if (Array.isArray(res) && res.length > 0) {
            this.canalForm = res[0];
          } else {
            this.canalForm = res;
          }
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message
        });
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

      // Validar el nombre del canal
      if (!this.canalForm.nombre_can) {
        this.showAlertMessage('Información', 'El nombre del canal es obligatorio', 'question', 'top-end');
        return;
      }

      // Validar la extensión del canal
      if (!this.canalForm.extension_can) {
        this.showAlertMessage('Información', 'La extensión del canal es obligatoria', 'question', 'top-end');
        return;
      }


    this.canalesService.create(this.canalForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Canal registrado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/canales');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al registrar el nuevo canal', 'error');
      }
    );
  }

  editar(): void {

      // Validar el nombre del canal
      if (!this.canalForm.nombre_can) {
        this.showAlertMessage('Información', 'El nombre del canal es obligatorio', 'question', 'top-end');
        return;
      }

      // Validar la extensión del canal
      if (!this.canalForm.extension_can) {
        this.showAlertMessage('Información', 'La extensión del canal es obligatoria', 'question', 'top-end');
        return;
      }


    this.canalesService.update(this.canalForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Canal actualizado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/canales');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al guardar los cambios del canal', 'error');
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