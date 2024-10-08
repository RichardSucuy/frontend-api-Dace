import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'nav-icon fas fa-tachometer-alt',
      link: '/dashboard',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Clientes',
      icon: 'nav-icon fas fa-user-tie',
      link: '/clientes',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Interacciones',
      icon: 'nav-icon fas fa-headset',
      link: '/interacciones',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Agencias',
      icon: 'nav-icon fas fa-building',
      link: '/agencias',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Productos y Servicios',
      icon: 'nav-icon fas fa-briefcase',
      link: '/productos_servicios',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Motivos',
      icon: 'nav-icon fas fa-exclamation-triangle',
      link: '/motivos',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Temas',
      icon: 'nav-icon fas fa-tags',
      link: '/temas',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Canales',
      icon: 'nav-icon fas fa-comments',
      link: '/canales',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Ciudades',
      icon: 'nav-icon fas fa-location-arrow',
      link: '/ciudades',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Usuarios',
      icon: 'nav-icon fas fa-users',
      link: '/usuarios',
      class: 'nav-link',
      submenu: []
    },
    {
      title: 'Perfil',
      icon: 'nav-icon fas fa-user',
      link: '/perfil',
      class: 'nav-link',
      submenu: []
    }
  ];

  constructor() { }
}
