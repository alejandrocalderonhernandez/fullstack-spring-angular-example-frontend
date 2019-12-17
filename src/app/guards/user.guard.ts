import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor( private loginService: LoginService,
               private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if ( this.loginService.isAuthenticated ) {
        if ( this.expiredToken() ) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }

    private expiredToken(): boolean {
      const token = this.loginService.getToken();
      const payload = this.loginService.getPayload(token);
      const now = new Date().getTime() / 1000;
      if ( now < payload.exp ) {
        return true;
      }
      return false;
    }

}
