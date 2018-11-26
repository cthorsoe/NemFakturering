import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './handlers/account.service';

@Injectable()

export class AuthService {
   isLoggedIn:boolean = false;
   isAdmin:boolean = false;
   redirectUrl:string;
   constructor(private router:Router, private accountService:AccountService) { }

   login(isAdmin:boolean): void {
      console.log('LOGGING IN');
      this.isLoggedIn = true;
      this.isAdmin = isAdmin;
      this.accountService.setAccount();
   }

   logout(): void{
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.router.navigate(['/']);
   }
}
