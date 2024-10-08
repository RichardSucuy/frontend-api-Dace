import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../auth/services/auth.service';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public user: IUsuario | null = null;
  menuItems: any[];

  constructor(
    private siderbarServices: SidebarService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.menuItems = this.siderbarServices.menu;
    this.user = this.authService.loggedInUser;
  }

  ngAfterViewInit(): void {
    this.initTreeView();
  }

  ngOnInit(): void {
    if( typeof window !== 'undefined' ) {
      setTimeout(() => {
        this.initTreeView();
      });
    }

  }

  private initTreeView(): void {
    if ($ && $.fn && $.fn.Treeview) {
      $('[data-widget="treeview"]').Treeview('init');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // location.href = 'login';

  }

}
