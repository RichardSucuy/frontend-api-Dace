import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    const token = localStorage.getItem('token') || '';
  
    if (!$.fn.dataTable.isDataTable('#tblUsuarios')) {
      $("#tblUsuarios").DataTable({
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": `http://localhost:3000/usuarios`,
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function (data: any) {
            return data.map((item: any) => {
              return [
                item.cedula_usu,
                item.nombre_usu,
                item.email_usu,
                item.user,
                `<div class="btn-group">
                  <button class="btn btn-info btn-sm" onclick="verDetalles(${item.id_usuario})">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./usuarios/editar/${item.id_usuario}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id_usuario}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>`
              ];
            });
          }
        }
      });
    } else {
      $('#tblUsuarios').DataTable().ajax.reload();
    }
  
    // Event delegation for delete buttons
    $('#tblUsuarios').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarUsuario(id);
    });
  }
  
  eliminarUsuario(id: number): void {
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
        this.usuarioService.delete(id).subscribe(
          res => {
            Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
            $('#tblUsuarios').DataTable().ajax.reload(); // Reload the table
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar el usuario.', 'error');
          }
        );
      }
    });
  }
  
}
