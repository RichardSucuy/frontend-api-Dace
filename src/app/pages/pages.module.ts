import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClientesDetailsComponent } from './clientes/clientes-details/clientes-details.component';

import { MotivosFormComponent } from './motivos/motivos-form/motivos-form.component';
import { MotivosListComponent } from './motivos/motivos-list/motivos-list.component';
import { MotivosDetailsComponent } from './motivos/motivos-details/motivos-details.component';

import { TemasFormComponent } from './temas/temas-form/temas-form.component';
import { TemasListComponent } from './temas/temas-list/temas-list.component';
import { TemasDetailsComponent } from './temas/temas-details/temas-details.component';

import { CanalesFormComponent } from './canales/canales-form/canales-form.component';
import { CanalesListComponent } from './canales/canales-list/canales-list.component';
import { CanalesDetailsComponent } from './canales/canales-details/canales-details.component';

import { CiudadesFormComponent } from './ciudades/ciudades-form/ciudades-form.component';
import { CiudadesListComponent } from './ciudades/ciudades-list/ciudades-list.component';
import { CiudadesDetailsComponent } from './ciudades/ciudades-details/ciudades-details.component';

import { AgenciasFormComponent } from './agencias/agencias-form/agencias-form.component';
import { AgenciasListComponent } from './agencias/agencias-list/agencias-list.component';
import { AgenciasDetailsComponent } from './agencias/agencias-details/agencias-details.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosDetailsComponent } from './usuarios/usuarios-details/usuarios-details.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InteraccionesFormComponent } from './interacciones/interacciones-form/interacciones-form.component';
import { InteraccionesListComponent } from './interacciones/interacciones-list/interacciones-list.component';
import { FormsModule } from '@angular/forms';

import { ProductosServiciosListComponent } from './productos_servicios/productos_servicios-list/productos_servicios-list.component';
import { ProductosServiciosFormComponent } from './productos_servicios/productos_servicios-form/productos_servicios-form.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ClientesFormComponent,
    ClientesListComponent,
    ClientesDetailsComponent,
    MotivosListComponent,
    MotivosFormComponent,
    MotivosDetailsComponent,
    TemasFormComponent,
    TemasListComponent,
    TemasDetailsComponent,
    CanalesFormComponent,
    CanalesListComponent,
    CanalesDetailsComponent,
    CiudadesFormComponent,
    CiudadesListComponent,
    CiudadesDetailsComponent,
    AgenciasFormComponent,
    AgenciasListComponent,
    AgenciasDetailsComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    UsuariosDetailsComponent,
    PerfilComponent,
    InteraccionesFormComponent,
    InteraccionesListComponent,
    ProductosServiciosListComponent,
    ProductosServiciosFormComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ClientesFormComponent,
    ClientesListComponent,
    ClientesDetailsComponent,
    MotivosListComponent,
    MotivosFormComponent,
    MotivosDetailsComponent,
    TemasFormComponent,
    TemasListComponent,
    TemasDetailsComponent,
    CanalesFormComponent,
    CanalesListComponent,
    CanalesDetailsComponent,
    CiudadesFormComponent,
    CiudadesListComponent,
    CiudadesDetailsComponent,
    AgenciasFormComponent,
    AgenciasListComponent,
    AgenciasDetailsComponent,
    UsuariosFormComponent,
    UsuariosListComponent,
    UsuariosDetailsComponent,
    PerfilComponent,
    InteraccionesFormComponent,
    InteraccionesListComponent,
    ProductosServiciosListComponent,
    ProductosServiciosFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class PagesModule { }
