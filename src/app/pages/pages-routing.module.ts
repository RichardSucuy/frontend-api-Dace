import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { MotivosListComponent } from './motivos/motivos-list/motivos-list.component';
import { MotivosFormComponent } from './motivos/motivos-form/motivos-form.component';
import { ProductosServiciosListComponent } from './productos_servicios/productos_servicios-list/productos_servicios-list.component';
import { ProductosServiciosFormComponent } from './productos_servicios/productos_servicios-form/productos_servicios-form.component';


import { AgenciasListComponent } from './agencias/agencias-list/agencias-list.component';
import { AgenciasFormComponent } from './agencias/agencias-form/agencias-form.component';
import { CiudadesListComponent } from './ciudades/ciudades-list/ciudades-list.component';
import { CiudadesFormComponent } from './ciudades/ciudades-form/ciudades-form.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { TemasListComponent } from './temas/temas-list/temas-list.component';
import { TemasFormComponent } from './temas/temas-form/temas-form.component';
import { CanalesListComponent } from './canales/canales-list/canales-list.component';
import { CanalesFormComponent } from './canales/canales-form/canales-form.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InteraccionesListComponent } from './interacciones/interacciones-list/interacciones-list.component';
import { InteraccionesFormComponent } from './interacciones/interacciones-form/interacciones-form.component';
import { isAuthenticatedGuard } from '../auth/guards/auth.guard';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
    ]
  },
  {
    path: 'clientes',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: ClientesListComponent, data: { title: 'Clientes' } },
      { path: 'nuevo', component: ClientesFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: ClientesFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'interacciones',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: InteraccionesListComponent, data: { title: 'Interacciones' } },
      { path: 'nuevo', component: InteraccionesFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: InteraccionesFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'agencias',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: AgenciasListComponent, data: { title: 'Agencias' } },
      { path: 'nuevo', component: AgenciasFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: AgenciasFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'ciudades',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: CiudadesListComponent, data: { title: 'Ciudades' } },
      { path: 'nuevo', component: CiudadesFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: CiudadesFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path:'motivos',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: MotivosListComponent, data: { title: 'Motivos' } },
      { path: 'nuevo', component: MotivosFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: MotivosFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path:'productos_servicios',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: ProductosServiciosListComponent, data: { title: 'productos_servicios' } },
      { path: 'nuevo', component: ProductosServiciosFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: ProductosServiciosFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'temas',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: TemasListComponent, data: { title: 'Temas' } },
      { path: 'nuevo', component: TemasFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: TemasFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'canales',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: CanalesListComponent, data: { title: 'Canales' } },
      { path: 'nuevo', component: CanalesFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: CanalesFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'usuarios',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: UsuariosListComponent, data: { title: 'Usuarios' } },
      { path: 'nuevo', component: UsuariosFormComponent, data: { title: 'Nuevo' } },
      { path: 'editar/:id', component: UsuariosFormComponent, data: { title: 'Editar' } },
    ]
  },
  {
    path: 'perfil',
    component: PagesComponent,
    canActivate: [ isAuthenticatedGuard ],
    children: [
      { path: '', component: PerfilComponent, data: { title: 'Perfil'}}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
