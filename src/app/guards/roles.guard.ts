import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SuccessMesages } from '../utils/messages/succes-messages';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor( private loginService: LoginService,
               private router: Router,
               private messages: SuccessMesages ) { }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const role = route.data['role'] as string;
    if ( !this.loginService.isAuthenticated ) {
      this.router.navigate(['/login']);
      return false;
    }

    if ( this.loginService.hasRole(role) ) {
      return true;
    }
    this.messages.showBasicMessage('Unauthorized!');
    this.router.navigate(['/clients']);
    return false;
  }

}
