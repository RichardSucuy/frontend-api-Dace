import { Component, Input, OnInit } from '@angular/core';
import { IMotivos } from '../interfaces/motivo.interface';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MotivosService } from '../services/motivos.service';

declare var $: any;

@Component({
  selector: 'app-motivos-form',
  templateUrl: './motivos-form.component.html',
  styleUrl: './motivos-form.component.css'
})
export class MotivosFormComponent implements OnInit {

  isEditing: boolean = false;

  @Input() motivoForm: IMotivos = {
    id_motivo: 0,
    categoria_moti: '',
    descripcion_moti: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private motivosService: MotivosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerMotivoId();
  }

  obtenerMotivoId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.motivoForm.id_motivo = +params['id'];
        this.isEditing = true;
        this.getMotivo();
      }
    });
  }

  getMotivo(): void {

    this.motivosService.getMotivosById(this.motivoForm.id_motivo!).subscribe(
      (res: any) => {
        console.log( res );
        // Asumiendo que `res` contiene los campos `categoria_moti` y `descripcion_moti`
          // this.motivoForm.id_motivo = res.id_motivo;
          // this.motivoForm.categoria_moti = res.categoria_moti;
          // this.motivoForm.descripcion_moti = res.descripcion_moti;
          if (Array.isArray(res) && res.length > 0) {
            // Asume que los datos necesarios están en la primera posición del arreglo
            this.motivoForm = res[0];
          } else {
            // Si no es un array, maneja como un objeto directo
            this.motivoForm = res;
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

  showAlertMessage(title: string, text: string, icon: SweetAlertIcon, position: SweetAlertPosition): void {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 3000
      // timerProgressBar: true,
    });
  }

  guardar(): void {
    // Validación de las entradas
    if (!this.motivoForm.categoria_moti) {
      this.showAlertMessage('Información', 'La categoría del motivo es obligatoria', 'question', 'top-end');
      return;
    }
  
    // Si pasa la validación, proceder a guardar
    this.motivosService.create(this.motivoForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Motivo registrado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/motivos');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al registrar el nuevo motivo', 'error');
      }
    );
  }

  editar(): void {
    // Validación de las entradas
    if (!this.motivoForm.categoria_moti) {
      this.showAlertMessage('Información', 'La categoría del motivo es obligatoria', 'question', 'top-end');
      return;
    }
  
    // Si pasa la validación, proceder a editar
    this.motivosService.update(this.motivoForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Motivo actualizado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/motivos');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al guardar los cambios del motivo', 'error');
      }
    );
  }
  
}
