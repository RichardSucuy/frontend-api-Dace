import { Component, Input, OnInit } from '@angular/core';
import { IClientes } from '../interfaces/clientes.interface';
import { ConsultaService } from '../../../services/consulta.service';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';
import { ICiudades } from '../../ciudades/interfaces/ciudades.interface';
import { CiudadesService } from '../../ciudades/services/ciudades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';

declare var $: any;

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrl: './clientes-form.component.css'
})
export class ClientesFormComponent implements OnInit {

  ciudades: ICiudades[] = [];
  isEditing: boolean = false;

  @Input() clienteForm: IClientes = {
    id_cliente: 0,
    cedula_cli: '',
    nombre_cli: '',
    apellido_cli: '',
    telefono_cli: '',
    socio_cli: false,
    nacimiento_cli: '',
    id_ciudad: 0,
    nick_redes: ''
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private clientesService: ClientesService,
    private consultaService: ConsultaService,
    private ciudadesService: CiudadesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCiudades();
    this.obtenerClienteId();
  }

  private initializeSelect2(): void {
    setTimeout( () => {
      $('.select2').select2();
      $('.select2').on('change', (event:any) => {
        const value = $(event.target).val();
        this.clienteForm.id_ciudad = value;
      });
    }, 0)
  }

    private formatFechaNacimiento(fecha: string): string {
      const partesFecha = fecha.split('/'); // Dividir la cadena de fecha en partes
      const fechaNacimiento = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`); // Crear fecha en formato ISO
      return fechaNacimiento.toISOString().substring(0, 10); // Formato ISO 8601 (YYYY-MM-DD)
    }

  obtenerClienteId(): void {
    this.activeRoute.params.subscribe( params => {
      if( params['id']) {
        this.clienteForm.id_cliente = +params['id'];
        this.isEditing = true;
        this.getCliente();
      }
    });
  }

  consultar(): void {
    Swal.fire({
      title: `Consultado los datos de la cédula ${ this.clienteForm.cedula_cli }`,
      text: 'Espere un momento por favor...',
      allowOutsideClick: false,
      showConfirmButton: false, // Ocultar el botón de confirmación
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton());
      }
    });

    this.consultaService.consultaCedula( this.clienteForm.cedula_cli )
    .subscribe( (data:any) => {
      Swal.close();

      this.clienteForm.apellido_cli = data.NombreCiudadano;

      // Formatear la fecha antes de asignarla a this.clienteForm.nacimiento_cli
      const partesFecha = data.FechaNacimiento.split('/'); // Dividir la cadena de fecha en partes
      const fechaNacimiento = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`); // Crear fecha en formato ISO
      this.clienteForm.nacimiento_cli = fechaNacimiento.toISOString().substring(0, 10); // Formato ISO 8601 (YYYY-MM-DD)


      console.log(this.clienteForm);

    }, (err:any) => {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.message
      });
    });
  }

  getCiudades(): void {
    this.ciudadesService.getAllCiudades()
     .subscribe( (data:any) => {
      this.ciudades = data;
      this.initializeSelect2();
     });
  }

  getCliente(): void {

    this.clientesService.getClientesById(this.clienteForm.id_cliente!).subscribe(
      (res:any) => {
        console.log( res );
        this.clienteForm.cedula_cli = res.cedula_cli;
        this.clienteForm.nombre_cli = res.nombre_cli;
        this.clienteForm.apellido_cli = res.apellido_cli;
        this.clienteForm.telefono_cli = res.telefono_cli;
        this.clienteForm.socio_cli = res.socio_cli;

        const fechaISO = new Date(res.nacimiento_cli); // Convertir la cadena de fecha en un objeto Date
        this.clienteForm.nacimiento_cli = fechaISO.toISOString().substring(0, 10); // Obtener la parte de la fecha (YYYY-MM-DD)

        this.clienteForm.id_ciudad = res.id_ciudad;
        this.clienteForm.nick_redes = res.nick_redes;

      },
      (err:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message
        });
      }
    );
  }

  onSubmit(): void {

    if( this.isEditing ) {
      this.editar();
    } else {
      this.guardar();
    }

  }

  showAlertMessage(title:string, text:string, icon:SweetAlertIcon, position:SweetAlertPosition): void {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 3000,
      // timerProgressBar: true,
    });
  }

  guardar(): void {

    // VALIDACION DE LAS ENTRADAS
    if ( !this.clienteForm.cedula_cli ) {
      this.showAlertMessage('Información', 'La identificacion del cliente es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.clienteForm.apellido_cli) {
      this.showAlertMessage('Información', 'El apellido del cliente es obligatorio', 'question', 'top-end');
      return;
    }
  
    if (!this.clienteForm.nombre_cli) {
      this.showAlertMessage('Información', 'El nombre del cliente es obligatorio', 'question', 'top-end');
      return;
    }

    if (!this.clienteForm.nacimiento_cli) {
      this.showAlertMessage('Información', 'La fecha de nacimiento del cliente es obligatoria', 'question', 'top-end');
      return;
    }

    // La validación de id_ciudad puede depender de si esperas un valor mayor a 0
    // Asumiendo que el id 0 no es válido y se espera un id positivo.
    if (this.clienteForm.id_ciudad <= 0) {
      this.showAlertMessage('Información', 'La ciudad del cliente es obligatoria', 'question', 'top-end');
      return;
    }



    // completar la validación de la información del cliente

    this.clientesService.create( this.clienteForm ).subscribe(
      ( res:any ) => {
        console.log( res );

        this.showAlertMessage('Guardado!', 'Cliente registrado correctamente', 'success', 'top-end');
        this.router.navigateByUrl('/clientes');
      },
      ( err:any ) => {
        console.log( err );
        this.showAlertMessage('Error', 'Ocurrió un error al registrar el nuevo cliente', 'error', 'center');
      }
    );
  }

  editar(): void {
    // VALIDACION DE LAS ENTRADAS
    if ( !this.clienteForm.cedula_cli ) {
      this.showAlertMessage('Información', 'La identificacion del cliente es obligatorio', 'question', 'top-end');
      return;
    }

    // completar la validación de la información del cliente

    this.clientesService.update( this.clienteForm ).subscribe(
      (res:any) => {
        console.log( res );
        this.showAlertMessage('Guardado!', 'Cliente actualizado correctamente','success', 'top-end');
        this.router.navigateByUrl('/clientes');
      },
      (err:any) => {
        console.log( err );
        this.showAlertMessage('Error', 'Ocurrió un error al guardar los cambios de cliente', 'error', 'center');
      }
    );
  }

}
