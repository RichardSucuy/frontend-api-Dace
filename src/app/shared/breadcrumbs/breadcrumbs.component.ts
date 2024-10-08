import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent implements OnDestroy {

  public title:string = '';
  public titleSubs$:Subscription;

  constructor(
    private router : Router
  ) {
    this.titleSubs$ = this.getRouteArguments()
                      .subscribe( ({ title }) => {
                        this.title = title;
                        document.title = `CallCenter - ${title}`;
                      });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getRouteArguments() {
    return this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data),

      );
  }
}
