import { Component, Input, OnInit } from '@angular/core';
import { ICiudades } from '../interfaces/ciudades.interface';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadesService } from '../services/ciudades.service';


@Component({
  selector: 'app-ciudades-form',
  templateUrl: './ciudades-form.component.html',
  styleUrl: './ciudades-form.component.css'
})
export class CiudadesFormComponent implements OnInit {

  isEditing: boolean = false;

  @Input() ciudadForm: ICiudades = {
    id_ciudad: 0,
    nombre_ciu: '',
    provincia: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private ciudadesService: CiudadesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerCiudadId();
  }

  obtenerCiudadId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.ciudadForm.id_ciudad = +params['id'];
        this.isEditing = true;
        this.getCiudad();
      }
    });
  }

  getCiudad(): void {
    this.ciudadesService.getCiudadesById(this.ciudadForm.id_ciudad!).subscribe(
      (res: ICiudades) => {
          this.ciudadForm = res;
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
    if (!this.ciudadForm.nombre_ciu) {
      this.showAlertMessage('Información', 'El nombre de la ciudad es obligatorio', 'question', 'top-end');
      return;
    }
    if (!this.ciudadForm.provincia) {
      this.showAlertMessage('Información', 'La provincia es obligatoria', 'question', 'top-end');
      return;
    }

    this.ciudadesService.create(this.ciudadForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Ciudad registrada correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/ciudades');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al registrar la nueva ciudad', 'error');
      }
    );
  }

  editar(): void {
    if (!this.ciudadForm.nombre_ciu) {
      this.showAlertMessage('Información', 'El nombre de la ciudad es obligatorio', 'question', 'top-end');
      return;
    }
    if (!this.ciudadForm.provincia) {
      this.showAlertMessage('Información', 'La provincia es obligatoria', 'question', 'top-end');
      return;
    }

    this.ciudadesService.update(this.ciudadForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Ciudad actualizada correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/ciudades');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al guardar los cambios de la ciudad', 'error');
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