import { Component, OnInit } from '@angular/core';
import { InteraccionesService } from '../services/interacciones.service';
import Swal from 'sweetalert2';


declare const $: any;

@Component({
  selector: 'app-interacciones-list',
  templateUrl: './interacciones-list.component.html',
  styleUrl: './interacciones-list.component.css'
})
export class InteraccionesListComponent implements OnInit {

  constructor(
    private interaccionesService: InteraccionesService
  ) { }

  ngOnInit() {
    this.listarInteracciones();
  }

  listarInteracciones(): void {
    const token = localStorage.getItem('token') || '';

    if (!$.fn.dataTable.isDataTable('#tblInteracciones')) {
      $("#tblInteracciones").DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": "http://localhost:3000/interacciones",  // Asumiendo una nueva ruta en el backend que devuelve datos detallados
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function(data: any) {
            console.log(data);
            return data.map((item: any) => {

              //Formatear la fecha para mostrar solo año-mes-día
              const fechaFormateada = item.fecha ? item.fecha.slice(0, 10) : '';

              return [
                fechaFormateada,
                item.cant_mensaje,
                item.nombre_graba,
                item.observacion,  // Añadiendo observación a la tabla
                item.duracion_llamada,
                item.nombre_usu,
                item.nombre_age,
                item.nombre_can,
                item.nombre_tema,
                item.nombre_cli,
                `
                <div class="btn-group">
                  <button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#mdlInteraccion">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./interacciones/editar/${item.id_interaccion}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" type="button" data-id="${item.id_interaccion}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
                `
              ];
            })
          }
        }
      });
      
    } else {
      $('#tblInteracciones').DataTable().ajax.reload();
    }

    $('#tblInteracciones').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event:any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarInteraccion(id);
    });
  }

  eliminarInteraccion(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.interaccionesService.delete(id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'La interacción ha sido eliminada.', 'success');
            this.listarInteracciones();
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar la interacción.', 'error');
          }
        );
      }
    });
  }

}
