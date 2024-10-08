import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteraccionesService } from '../services/interacciones.service';
import { UsuarioService } from '../../usuarios/services/usuarios.service';
import { AgenciasService } from '../../agencias/services/agencias.service';
import { CanalesService } from '../../canales/services/canales.service';
import { TemasService } from '../../temas/services/temas.service';
import { ClientesService } from '../../clientes/services/clientes.service';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { IInteracciones } from '../interfaces/interacciones.interface';
import { IUsuario } from '../../usuarios/interfaces/usuarios.interface';
import { IAgencias } from '../../agencias/interfaces/agencias.interface';
import { ICanal } from '../../canales/interfaces/canales.interface';
import { ITemas } from '../../temas/interfaces/temas.interface';
import { IClientes } from '../../clientes/interfaces/clientes.interface';
import { IProductosServicios } from '../../productos_servicios/interfaces/productos_servicios.interface';
import { ProductosServiciosService } from '../../productos_servicios/services/productos_servicios.service';

declare const $: any;

@Component({
  selector: 'app-interacciones-form',
  templateUrl: './interacciones-form.component.html',
  styleUrl: './interacciones-form.component.css'
})
export class InteraccionesFormComponent implements OnInit, OnChanges {

  usuarios: IUsuario[] = [];
  agencias: IAgencias[] = [];
  canales: ICanal[] = [];
  temas: ITemas[] = [];
  clientes: IClientes[] = [];
  productosServiciosList: IProductosServicios[] = [];
  isEditing: boolean = false;
  productosServicios: { id_producto_servicio: number | null, detalles: string }[] = [];

  @Input() interaccionForm: IInteracciones = {
    id_interaccion: 0,
    fecha: '',
    cant_mensaje: 0,
    nombre_graba: '',
    observacion: '',
    duracion_llamada: '',
    id_usuario: 0,
    id_agencia: 0,
    id_canal: 0,
    id_tema: 0,
    id_cliente: 0,
    productos_servicios: [] // Inicializar esta propiedad
  };

  constructor(
    private interaccionesService: InteraccionesService,
    private usuarioService: UsuarioService,
    private agenciaService: AgenciasService,
    private canalService: CanalesService,
    private temaService: TemasService,
    private clienteService: ClientesService,
    private productosServiciosService: ProductosServiciosService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerInteraccionId();
    this.cargarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['interaccionForm'] && this.isEditing) {
      this.productosServicios = this.interaccionForm.productos_servicios || [];
    }
  }

  private cargarDatos(): void {
    Promise.all([
      this.getUsuarios(),
      this.getAgencias(),
      this.getCanales(),
      this.getTemas(),
      this.getClientes(),
      this.getProductosServicios()
    ]).then(() => {
      this.initializeSelect2Usuarios();
      this.initializeSelect2Agencias();
      this.initializeSelect2Canales();
      this.initializeSelect2Temas();
      this.initializeSelect2Clientes();
    }).catch(error => {
      console.error('Error al cargar datos:', error);
      this.showAlertMessage('Error', 'Ocurrió un error al cargar los datos', 'error', 'center');
    });
  }

  addProductoServicio() {
    this.productosServicios.push({ id_producto_servicio: null, detalles: '' });
  }

  removeProductoServicio(index: number) {
    this.productosServicios.splice(index, 1);
  }

  trackByFn(index: any, item: any) {
    return index; // o una propiedad única del objeto si tus motivos son objetos
  }

  obtenerInteraccionId(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.interaccionForm.id_interaccion = +params['id'];
        this.isEditing = true;
        this.getInteraccion();
      }
    });
  }

  private initializeSelect2Usuarios(): void {
    setTimeout(() => {
      $('.select2').select2();
      $('.select2').on('change', (event: any) => {
        this.interaccionForm.id_usuario = $(event.target).val();
      });
    }, 0);
  }

  private initializeSelect2Agencias(): void {
    setTimeout(() => {
      $('.select3').select2();
      $('.select3').on('change', (event: any) => {
        this.interaccionForm.id_agencia = $(event.target).val();
      });
    }, 0);
  }

  private initializeSelect2Canales(): void {
    setTimeout(() => {
      $('.select4').select2();
      $('.select4').on('change', (event: any) => {
        this.interaccionForm.id_canal = $(event.target).val();
      });
    }, 0);
  }

  private initializeSelect2Temas(): void {
    setTimeout(() => {
      $('.select5').select2();
      $('.select5').on('change', (event: any) => {
        this.interaccionForm.id_tema = $(event.target).val();
      });
    }, 0);
  }

  private initializeSelect2Clientes(): void {
    setTimeout(() => {
      $('.select6').select2();
      $('.select6').on('change', (event: any) => {
        this.interaccionForm.id_cliente = $(event.target).val();
      });
    }, 0);
  }

  getUsuarios(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usuarioService.getAllUsuarios().subscribe(data => {
        this.usuarios = data;
        resolve();
      }, error => reject(error));
    });
  }

  getAgencias(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.agenciaService.getAllAgencias().subscribe(data => {
        this.agencias = data;
        resolve();
      }, error => reject(error));
    });
  }

  getCanales(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.canalService.getAllCanales().subscribe(data => {
        this.canales = data;
        resolve();
      }, error => reject(error));
    });
  }

  getTemas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.temaService.getAllTemas().subscribe(data => {
        this.temas = data;
        resolve();
      }, error => reject(error));
    });
  }

  getClientes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.clienteService.getAllClientes().subscribe(data => {
        this.clientes = data;
        resolve();
      }, error => reject(error));
    });
  }

  getProductosServicios(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.productosServiciosService.getAllProductosSevicios().subscribe(data => {
        this.productosServiciosList = data;
        resolve();
      }, error => reject(error));
    });
  }

  private formatFecha(fecha: string): string {
    return fecha ? new Date(fecha).toISOString().split('T')[0] : '';
  }

  getInteraccion(): void {
    this.interaccionesService.getInteraccionesById(this.interaccionForm.id_interaccion!).subscribe(
      (res: any) => {
        console.log('Response from API:', res);
        if (Array.isArray(res) && res.length > 0) {
          this.interaccionForm = res[0];
        } else {
          this.interaccionForm = res;
        }
        this.interaccionForm.fecha = this.formatFecha(this.interaccionForm.fecha);
        this.productosServicios = this.interaccionForm.productos_servicios || [];
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

  guardar(): void {
    // VALIDACION DE LAS ENTRADAS
    if (!this.interaccionForm.fecha) {
      this.showAlertMessage('Información', 'La fecha de la interacción es obligatoria', 'question', 'top-end');
      return;
    }

    if (!this.interaccionForm.id_usuario) {
      this.showAlertMessage('Información', 'El usuario es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.interaccionForm.id_agencia) {
      this.showAlertMessage('Información', 'La agencia es obligatoria', 'question', 'top-end');
      return;
    }

    if (!this.interaccionForm.id_canal) {
      this.showAlertMessage('Información', 'El canal es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.interaccionForm.id_tema) {
      this.showAlertMessage('Información', 'El tema es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.interaccionForm.id_cliente) {
      this.showAlertMessage('Información', 'El cliente es obligatorio', 'question', 'top-end');
      return;
    }

    this.interaccionForm.productos_servicios = this.productosServicios; // Añadir productos_servicios al objeto

    this.interaccionesService.create(this.interaccionForm).subscribe(
      (res: any) => {
        console.log(res);
        this.showAlertMessage('Guardado!', 'La interacción ha sido registrada correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/interacciones');
      },
      (err: any) => {
        console.log(err);
        this.showAlertMessage('Error', 'Ocurrió un error al registrar la interacción', 'error', 'center');
      }
    );
  }

  editar(): void {
    // VALIDACION DE LAS ENTRADAS
    if (!this.interaccionForm.fecha) {
      this.showAlertMessage('Información', 'La fecha de la interacción es obligatoria', 'question', 'top-end');
      return;
    }

    this.interaccionForm.productos_servicios = this.productosServicios; // Añadir productos_servicios al objeto

    console.log(this.interaccionForm);
    this.interaccionesService.update(this.interaccionForm).subscribe(
      (res: any) => {
        console.log(res);
        this.showAlertMessage('Guardado!', 'La interacción ha sido actualizada correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/interacciones');
      },
      (err: any) => {
        console.log(err);
        this.showAlertMessage('Error', 'Ocurrió un error al actualizar la interacción', 'error', 'center');
      }
    );
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
}
