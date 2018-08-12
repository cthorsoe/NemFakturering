import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {

   constructor(private router: Router, private authService: AuthService) { }
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      console.log('state.url', state.url);
      let url: string = state.url;
      return this.checkLogin(url);
   }

   checkLogin(url: string): boolean {
      if (this.authService.isAdmin) { 
         return true; 
      }else if(this.authService.isLoggedIn){
         this.router.navigate(['app/index']);
      }else{
         this.router.navigate(['account/login']);
      }
      this.authService.redirectUrl = url;
      console.log('URL SET TO', url)
      return false;
   }
}
