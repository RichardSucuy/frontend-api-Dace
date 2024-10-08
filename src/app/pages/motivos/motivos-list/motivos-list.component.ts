import { Component, OnInit  } from '@angular/core';
import { MotivosService } from '../services/motivos.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-motivos-list',
  templateUrl: './motivos-list.component.html',
  styleUrl: './motivos-list.component.css'
})
export class MotivosListComponent implements OnInit {

  constructor(
    private motivosService: MotivosService
  ) { }


  ngOnInit(): void {
    this.listarMotivos()
  }

  listarMotivos(): void {
    const token = localStorage.getItem('token') || '';

    if (!$.fn.dataTable.isDataTable('#tblMotivos')) {
      $("#tblMotivos").DataTable({
        
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": `http://localhost:3000/motivos`,
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function(data: any) {
            return data.map((item: any) => {
              return [
                item.categoria_moti,
                item.descripcion_moti,
                `<div class="btn-group">
                  <button class="btn btn-info btn-sm" onclick="verDetalles(${item.id_motivo})">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./motivos/editar/${ item.id_motivo })" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id_motivo}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>`
              ];
            })
          }
        }
      });
    } else {
      $('#tblMotivos').DataTable().ajax.reload();
    }


    // Delegar el evento de clic para los botones de eliminación
    $('#tblMotivos').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarMotivo(id);
    })
  }

  eliminarMotivo(id: number): void {
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
        this.motivosService.delete(id).subscribe(
          (res:any) => {
            Swal.fire('Eliminado!', 'El motivo ha sido eliminado.', 'success');
            this.listarMotivos();
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar el motivo.', 'error');
          }
        );

        this.listarMotivos();
      }
    });


  }

}
