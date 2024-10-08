import { Component, OnInit } from '@angular/core';
import { TemasService } from '../services/temas.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-temas-list',
  templateUrl: './temas-list.component.html',
  styleUrl: './temas-list.component.css'
})
export class TemasListComponent implements OnInit {

  constructor(private temasService: TemasService) { }

  ngOnInit(): void {
    this.listarTemas();
  }

  listarTemas(): void {
    const token = localStorage.getItem('token') || '';
  
    if (!$.fn.dataTable.isDataTable('#tblTemas')) {
      $("#tblTemas").DataTable({
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": `http://localhost:3000/temas`,
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function (data: any) {
            return data.map((item: any) => {
              return [
                item.nombre_tema,
                item.descrip_tema,
                `<div class="btn-group">
                  <button class="btn btn-info btn-sm" onclick="verDetalles(${item.id_tema})">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./temas/editar/${item.id_tema}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id_tema}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>`
              ];
            });
          }
        }
      });
    } else {
      $('#tblTemas').DataTable().ajax.reload();
    }
  
    // Event delegation for delete buttons
    $('#tblTemas').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarTema(id);
    });
  }
  
  eliminarTema(id: number): void {
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
        this.temasService.delete(id).subscribe(
          res => {
            Swal.fire('Eliminado!', 'El tema ha sido eliminado.', 'success');
            $('#tblTemas').DataTable().ajax.reload(); // Reload the table
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar el tema.', 'error');
          }
        );
      }
    });
  }
  
}
