import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './handlers/account.service';
import { environment } from '../environments/environments';
import { Account } from '../entities/account';

@Injectable()

export class AuthService {
   apiUrl:string = environment.apiUrl;
   isLoggedIn:boolean = false;
   isAdmin:boolean = false;
   redirectUrl:string;
   constructor(private router:Router, private accountService:AccountService, private http:HttpClient) { }

   // exlogin(isAdmin:boolean): void {
   //    console.log('LOGGING IN');
   //    this.isLoggedIn = true;
   //    this.isAdmin = isAdmin;
   //    this.accountService.setAccount();
   // }

   login(data): void {
      var form = {
         identifier: data.username,
         password: data.password
      };
      
      var observ = this.http.post<any>(this.apiUrl + 'accounts/login/', form, {responseType:'json', withCredentials:true});
         // this.dataService.customersObserv = observ;
      observ.subscribe((response) => {
         this.isLoggedIn = true;
         this.accountService.setAccount(response);
      }, error => {
         this.isLoggedIn = false;
         this.accountService.setAccount(undefined);
      });
   }

   logout(): void{
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.accountService.setAccount(undefined);
      this.router.navigate(['/']);
   }

   getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
   }

   authUser(){
      var observ = this.http.get<number>(this.apiUrl + 'accounts/auth/', {responseType: 'json', withCredentials: true});
      observ.subscribe((accountId:number) => {
         console.log('TEST AUTH RES', accountId)
         if(accountId != undefined){
            var observ = this.accountService.requestAccount(accountId)
            observ.subscribe((response) => {
               this.isLoggedIn = true;
               this.accountService.setAccount(response);
            }, error => {
               this.isLoggedIn = false;
               this.accountService.setAccount(undefined);
            });
         }else{
            this.isLoggedIn = false;
            this.accountService.setAccount(undefined);
         }
      });
   }
}
