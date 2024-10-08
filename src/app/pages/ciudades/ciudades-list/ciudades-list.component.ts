import { Component, OnInit } from '@angular/core';
import { CiudadesService } from '../services/ciudades.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-ciudades-list',
  templateUrl: './ciudades-list.component.html',
  styleUrl: './ciudades-list.component.css'
})
export class CiudadesListComponent implements OnInit {

  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.listarCiudades();
  }

  listarCiudades(): void {
    const token = localStorage.getItem('token') || '';
  
    if (!$.fn.dataTable.isDataTable('#tblCiudades')) {
      $("#tblCiudades").DataTable({
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": `http://localhost:3000/ciudades`,
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function (data: any) {
            return data.map((item: any) => {
              return [
                item.nombre_ciu,
                item.provincia,
                `<div class="btn-group">
                  <button class="btn btn-info btn-sm" onclick="verDetalles(${item.id_ciudad})">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./ciudades/editar/${item.id_ciudad}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id_ciudad}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>`
              ];
            });
          }
        }
      });
    } else {
      $('#tblCiudades').DataTable().ajax.reload();
    }

    $('#tblCiudades').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarCiudad(id);
    });
  }

  eliminarCiudad(id: number): void {
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
        this.ciudadesService.delete(id).subscribe(
          res => {
            Swal.fire('Eliminado!', 'La ciudad ha sido eliminada.', 'success');
            $('#tblCiudades').DataTable().ajax.reload();
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar la ciudad.', 'error');
          }
        );
      }
    });
  }
}
