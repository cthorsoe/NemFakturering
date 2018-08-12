import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuardService implements CanActivate {

   constructor(private router: Router, private authService: AuthService) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      console.log('state.url', state.url);
      let url: string = state.url;
      return this.checkLogin(url);
   }

   checkLogin(url: string): boolean {
      this.authService.redirectUrl = url;
      console.log('URL SET TO', url)
      if (this.authService.isLoggedIn) { 
          return true; 
      }
      this.router.navigate(['account/login']);
      return false;
   }
}
