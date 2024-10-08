import { Component, OnInit } from '@angular/core';
import { CanalesService } from '../services/canales.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-canales-list',
  templateUrl: './canales-list.component.html',
  styleUrl: './canales-list.component.css'
})
export class CanalesListComponent implements OnInit {

  constructor(private canalesService: CanalesService) { }

  ngOnInit(): void {
    this.listarCanales();
  }

  listarCanales(): void {
    const token = localStorage.getItem('token') || '';
  
    if (!$.fn.dataTable.isDataTable('#tblCanales')) {
      $("#tblCanales").DataTable({
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": `http://localhost:3000/canal`,
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function (data: any) {
            return data.map((item: any) => {
              return [
                item.nombre_can,
                item.descripcion_can,
                item.extension_can,
                `<div class="btn-group">
                  <button class="btn btn-info btn-sm" onclick="verDetalles(${item.id_canal})">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./canales/editar/${item.id_canal}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id_canal}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>`
              ];
            });
          }
        }
      });
    } else {
      $('#tblCanales').DataTable().ajax.reload();
    }
  
    // Event delegation for delete buttons
    $('#tblCanales').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarCanal(id);
    });
  }
  
  eliminarCanal(id: number): void {
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
        this.canalesService.delete(id).subscribe(
          res => {
            Swal.fire('Eliminado!', 'El canal ha sido eliminado.', 'success');
            $('#tblCanales').DataTable().ajax.reload(); // Reload the table
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar el canal.', 'error');
          }
        );
      }
    });
  }
}