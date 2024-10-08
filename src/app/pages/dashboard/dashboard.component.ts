import { Component, OnInit } from '@angular/core';
import { InteraccionesService } from '../interacciones/services/interacciones.service';
import { UsuarioService } from '../usuarios/services/usuarios.service';
import { ClientesService } from '../clientes/services/clientes.service';
import { MotivosService } from '../motivos/services/motivos.service';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  interaccionesCount: number = 0;
  usuariosCount: number = 0;
  clientesCount: number = 0;
  motivosCount: number = 0;

  ultimasInteracciones: any[] = [];
  actividadReciente: any[] = [];

  constructor(
    private interaccionesService: InteraccionesService,
    private usuariosService: UsuarioService,
    private clientesService: ClientesService,
    private motivosService: MotivosService
  ) { }

  ngOnInit(): void {
    this.getCounts();
    // this.getUltimasInteracciones();
    // this.getActividadReciente();
    this.listarInteracciones();
  }

  getCounts(): void {
    this.interaccionesService.count().subscribe(count => this.interaccionesCount = count);
    //this.usuariosService.getCount().subscribe(count => this.usuariosCount = count);
    this.clientesService.getCount().subscribe(count => this.clientesCount = count);
    // this.motivosService.getCount().subscribe(count => this.motivosCount = count);
  }

  getActividadReciente(): void {
    //this.interaccionesService.getActividadReciente().subscribe(data => this.actividadReciente = data);
  }

  listarInteracciones(): void {
    const token = localStorage.getItem('token') || '';

    if (!$.fn.dataTable.isDataTable('#tblInteraccionesUltimas')) {
      $("#tblInteraccionesUltimas").DataTable({
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        "pageLength": 10,
        "lengthMenu": [5, 10, 25, 50, 100],
        "processing": true,
        "ajax": {
          "url": "http://localhost:3000/interacciones/ultimas",
          "type": "GET",
          "headers": {
            "Authorization": `Bearer ${token}`
          },
          "dataSrc": (data: any)=> {
            console.log(data);
            
            this.ultimasInteracciones = data.map((item: any) => {
              
              // Formatear la fecha para mostrar solo año-mes-día
              const fechaFormateada = item.fecha ? item.fecha.slice(0, 10) : '';

              return {

                id_interaccion: item.id_interaccion,
                cliente: item.cliente.nombre_cli + ' ' + item.cliente.apellido_cli,
                tema: item.tema.descrip_tema,
                fecha: fechaFormateada
              };
              
            }); 
            console.log('Ultimas Interacciones:', this.ultimasInteracciones); // Verificar los datos aquí
            return this.ultimasInteracciones;
          }
        },
        "columns": [
          { "data": "id_interaccion" },
          { "data": "cliente" },
          { "data": "tema" },
          { "data": "fecha" }
        ]

      });
    } else {
      $('#tblInteraccionesUltimas').DataTable().ajax.reload();
    }
  } 

  exportToExcel(): void {
    console.log('Exportando a Excel con los siguientes datos:', this.ultimasInteracciones);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ultimasInteracciones);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Ultimas_Interacciones');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';