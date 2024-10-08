import { Component, Input, OnInit } from '@angular/core';
import { ITemas } from '../interfaces/temas.interface';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { TemasService } from '../services/temas.service';

declare var $: any;

@Component({
  selector: 'app-temas-form',
  templateUrl: './temas-form.component.html',
  styleUrl: './temas-form.component.css'
})
export class TemasFormComponent implements OnInit {

  isEditing: boolean = false;

  @Input() temaForm: ITemas = {
    id_tema: 0,
    nombre_tema: '',
    descrip_tema: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private temasService: TemasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerTemaId();
  }

  obtenerTemaId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.temaForm.id_tema = +params['id'];
        this.isEditing = true;
        this.getTema();
      }
    });
  }

  getTema(): void {
    this.temasService.getTemasById(this.temaForm.id_tema!).subscribe(
      (res: any) => {
          if (Array.isArray(res) && res.length > 0) {
            this.temaForm = res[0];
          } else {
            this.temaForm = res;
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
    if (!this.temaForm.nombre_tema) {
      this.showAlertMessage('Información', 'El nombre del tema es obligatorio', 'question', 'top-end');
      return;
    }

    this.temasService.create(this.temaForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Tema registrado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/temas');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al registrar el nuevo tema', 'error');
      }
    );
  }

  editar(): void {
    if (!this.temaForm.nombre_tema) {
      this.showAlertMessage('Información', 'El nombre del tema es obligatorio', 'question', 'top-end');
      return;
    }

    this.temasService.update(this.temaForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Tema actualizado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/temas');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al guardar los cambios del tema', 'error');
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
