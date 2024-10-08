import { Component, OnInit } from '@angular/core';
import { ProductosServiciosService } from '../services/productos_servicios.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-productos_servicios-list',
  templateUrl: './productos_servicios-list.component.html',
  styleUrl: './productos_servicios-list.component.css'
})
export class ProductosServiciosListComponent implements OnInit {

  constructor(
    private productosServiciosService: ProductosServiciosService
  ) { }

  ngOnInit(): void {
    this.listarProductosServicios();
  }

  listarProductosServicios(): void {
    const token = localStorage.getItem('token') || '';

    if (!$.fn.dataTable.isDataTable('#tblProductosServicios')) {
      $("#tblProductosServicios").DataTable({
        "language": {
          "url": "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": `http://localhost:3000/productos_servicios`,
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": function(data: any) {
            return data.map((item: any) => {
              return [
                item.categoria_prod_serv,
                item.descripcion_prod_serv,
                `<div class="btn-group">
                  <button class="btn btn-info btn-sm" onclick="verDetalles(${item.id_producto_servicio})">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <a href="./productos_servicios/editar/${item.id_producto_servicio}" class="btn btn-warning btn-sm">
                    <i class="fa fa-edit" aria-hidden="true"></i>
                  </a>
                  <button class="btn btn-danger btn-sm btn-eliminar" data-id="${item.id_producto_servicio}">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>`
              ];
            })
          }
        }
      });
    } else {
      $('#tblProductosServicios').DataTable().ajax.reload();
    }

    // Delegar el evento de clic para los botones de eliminación
    $('#tblProductosServicios').off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event: any) => {
      const id = $(event.currentTarget).data('id');
      this.eliminarProductoServicio(id);
    });
  }

  eliminarProductoServicio(id: number): void {
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
        this.productosServiciosService.delete(id).subscribe(
          (res: any) => {
            Swal.fire('Eliminado!', 'El producto o servicio ha sido eliminado.', 'success');
            this.listarProductosServicios();
          },
          error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar el producto o servicio.', 'error');
          }
        );
      }
    });
  }

}
