import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {

  constructor(
    private clientesService: ClientesService
  ) { }



  ngOnInit() {
    this.listarClientes()
  }

  listarClientes(): void {
    const token = localStorage.getItem('token') || '';

    if (!$.fn.dataTable.isDataTable('#tblClientes')) {

      $("#tblClientes").DataTable({

        "language": {
          "url": "https://cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": "http://localhost:3000/clientes",
          "type": "GET",
          "headers":{
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function(data:any) {
            return data.map( (item:any) => {
              return [
                item.apellido_cli,
                item.nombre_cli,
                item.ciudad.nombre_ciu,
                item.socio_cli ? 'SI' : 'NO',
                `
                <div class="btn-group">
                  <button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#mdlCliente">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./clientes/editar/${ item.id_cliente }" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" type="button" id="btn-eliminar" data-id = "${ item.id_cliente}">
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
      $('#tblClientes').DataTable().ajax.reload();
    }



    // Delegar el evento de clic para los botones de eliminación
    $('#tblClientes').off( 'click', '.btn-eliminar').on('click', '.btn-eliminar', (event:any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarCliente(id);
    })
  }


  eliminarCliente(id:number): void {
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

        this.clientesService.delete(id).subscribe(
          (res:any) => {
            Swal.fire('Eliminado!', 'El cliente ha sido eliminado.', 'success');
            this.listarClientes();
          },
          (err:any) => {
            console.error('Error:', err);
            Swal.fire('Error', 'Ocurrió un error al eliminar el cliente.', 'error');
          }
        );

        this.listarClientes();
      }
    });


  }

}
