import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
   isLoggedIn:boolean = false;
   isAdmin:boolean = false;
   redirectUrl:string;
   constructor(private router:Router) { }

   login(isAdmin:boolean): void {
      this.isLoggedIn = true;
      this.isAdmin = isAdmin;
   }

   logout(): void{
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/']);
   }
}
