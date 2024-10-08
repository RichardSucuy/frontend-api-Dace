import { Component, Input, OnInit } from '@angular/core';
import { IProductosServicios } from '../interfaces/productos_servicios.interface';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosServiciosService } from '../services/productos_servicios.service';

declare var $: any;

@Component({
  selector: 'app-productos_servicios-form',
  templateUrl: './productos_servicios-form.component.html',
  styleUrl: './productos_servicios-form.component.css'
})
export class ProductosServiciosFormComponent implements OnInit {

  isEditing: boolean = false;

  @Input() productoServicioForm: IProductosServicios = {
    id_producto_servicio: 0,
    categoria_prod_serv: '',
    descripcion_prod_serv: ''
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private productosServiciosService: ProductosServiciosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerProductoServicioId();
  }

  obtenerProductoServicioId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.productoServicioForm.id_producto_servicio = +params['id'];
        this.isEditing = true;
        this.getProductoServicio();
      }
    });
  }

  getProductoServicio(): void {
    this.productosServiciosService.getProductosServiciosById(this.productoServicioForm.id_producto_servicio!).subscribe(
      (res: any) => {
        console.log(res);
        if (Array.isArray(res) && res.length > 0) {
          this.productoServicioForm = res[0];
        } else {
          this.productoServicioForm = res;
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
      timer: 3000
    });
  }

  guardar(): void {
    if (!this.productoServicioForm.categoria_prod_serv) {
      this.showAlertMessage('Información', 'La categoría del producto o servicio es obligatoria', 'question', 'top-end');
      return;
    }

    this.productosServiciosService.create(this.productoServicioForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Producto o servicio registrado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/productos_servicios');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al registrar el nuevo producto o servicio', 'error');
      }
    );
  }

  editar(): void {
    if (!this.productoServicioForm.categoria_prod_serv) {
      this.showAlertMessage('Información', 'La categoría del producto o servicio es obligatoria', 'question', 'top-end');
      return;
    }

    this.productosServiciosService.update(this.productoServicioForm).subscribe(
      (res: any) => {
        this.showAlertMessage('Guardado!', 'Producto o servicio actualizado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/productos_servicios');
      },
      (err: any) => {
        Swal.fire('Error', 'Ocurrió un error al guardar los cambios del producto o servicio', 'error');
      }
    );
  }

}
