import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isAuthenticatedGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map(isAuthenticated => {
      if ( !isAuthenticated ) {
        router.navigate(['/login']);
      }
      return isAuthenticated;
    })
  );

}

export const isNotAuthenticatedGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map( isAuthenticated => {
      console.log( isAuthenticated );
      if (isAuthenticated) {
        router.navigateByUrl('/dashboard');
        return false;
      } else {
        return true;
      }
    })
  );

}

