import { Component, Input, OnInit } from '@angular/core';
import { IAgencias } from '../interfaces/agencias.interface';
import { AgenciasService } from '../services/agencias.service';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ICiudades } from '../../ciudades/interfaces/ciudades.interface';
import { CiudadesService } from '../../ciudades/services/ciudades.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-agencias-form',
  templateUrl: './agencias-form.component.html',
  styleUrl: './agencias-form.component.css'
})
export class AgenciasFormComponent implements OnInit {

  ciudades: ICiudades[] = [];
  isEditing: boolean = false;

  @Input() agenciaForm: IAgencias = {
    id_agencia: 0,
    nombre_age: '',
    telefono_age: '',
    direccion_age: '',
    id_ciudad: 0
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private agenciasService: AgenciasService,
    private ciudadesService: CiudadesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCiudades();
    this.obtenerAgenciaId();
  }

  private initializeSelect2(): void {
    setTimeout(() => {
      $('.select2').select2();
      $('.select2').on('change', (event: any) => {
        const value = $(event.target).val();
        this.agenciaForm.id_ciudad = value;
      });
    }, 0);
  }

  obtenerAgenciaId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.agenciaForm.id_agencia = +params['id'];
        this.isEditing = true;
        this.getAgencia();
      }
    });
  }

  getCiudades(): void {
    this.ciudadesService.getAllCiudades()
      .subscribe((data: any) => {
        this.ciudades = data;
        this.initializeSelect2();
      });
  }

  getAgencia(): void {
    this.agenciasService.getAgenciaById(this.agenciaForm.id_agencia!).subscribe(
      (res: any) => {
        console.log(res);
        
        // this.agenciaForm.nombre_age = res.nombre_age;
        // this.agenciaForm.telefono_age = res.telefono_age;
        // this.agenciaForm.direccion_age = res.direccion_age;
        // this.agenciaForm.id_ciudad = res.id_ciudad;
        if (Array.isArray(res) && res.length > 0) {
          // Asume que los datos necesarios están en la primera posición del arreglo
          this.agenciaForm = res[0];
        } else {
          // Si no es un array, maneja como un objeto directo
          this.agenciaForm = res;
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
      timer: 3000,
    });
  }

  guardar(): void {
    if (!this.agenciaForm.nombre_age) {
      this.showAlertMessage('Información', 'El nombre de la agencia es obligatorio', 'question', 'top-end');
      return;
    }
    this.agenciasService.create(this.agenciaForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Agencia registrada correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/agencias');
      },
      (err: any) => {
        console.error('Error:', err);
        this.showAlertMessage('Error', 'Ocurrió un error al registrar la nueva agencia', 'error', 'center');
      }
    );
  }

  editar(): void {
    this.agenciasService.update(this.agenciaForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Agencia actualizada correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/agencias');
      },
      (err: any) => {
        console.error('Error:', err);
        this.showAlertMessage('Error', 'Ocurrió un error al guardar los cambios de la agencia', 'error', 'center');
      }
    );
  }
}