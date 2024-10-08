import { Component, OnInit } from '@angular/core';
import { AgenciasService } from '../services/agencias.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-agencias-list',
  templateUrl: './agencias-list.component.html',
  styleUrl: './agencias-list.component.css'
})
export class AgenciasListComponent implements OnInit {

  constructor(
    private agenciasService: AgenciasService
  ) { }

  ngOnInit() {
    this.listarAgencias();
  }

  listarAgencias(): void {
    const token = localStorage.getItem('token') || '';

    if (!$.fn.dataTable.isDataTable('#tblAgencias')) {
      $("#tblAgencias").DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": "http://localhost:3000/agencias",
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function(data: any) {
            return data.map((item: any) => {
              return [
                item.nombre_age,
                item.telefono_age,
                item.direccion_age,
                item.ciudad.nombre_ciu, // Asumiendo que se incluye el nombre de la ciudad como parte del objeto ciudad
                `
                <div class="btn-group">
                  <button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#mdlAgencia">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./agencias/editar/${item.id_agencia}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" type="button" data-id="${item.id_agencia}">
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
      $('#tblAgencias').DataTable().ajax.reload();
    }

    // Event delegation for the delete button
    $('#tblAgencias').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarAgencia(id);
    })
  }

  eliminarAgencia(id: number): void {
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
        this.agenciasService.delete(id).subscribe(
          () => {
            Swal.fire('Eliminado!', 'La agencia ha sido eliminada.', 'success');
            this.listarAgencias();
          },
          (err: any) => {
            console.error('Error:', err);
            Swal.fire('Error', 'Ocurrió un error al eliminar la agencia.', 'error');
          }
        );
      }
    });
  }

}
