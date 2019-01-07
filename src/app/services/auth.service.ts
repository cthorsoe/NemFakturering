import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './handlers/account.service';
import { Account } from '../entities/account';
import { AppDataService } from './app-data.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class AuthService {
   apiUrl:string = environment.apiUrl;
   isLoggedIn:boolean = false;
   isAdmin:boolean = false;
   redirectUrl:string;
   constructor(private router:Router, private accountService:AccountService,  private appService:AppDataService, private http:HttpClient) { }

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
      observ.subscribe((response) => {
         if(response && response.status){
            this.isLoggedIn = false;
         }else{
            this.isLoggedIn = true;
            this.accountService.setAccount(response, this.redirectUrl);
         }
      }, error => {
         this.isLoggedIn = false;
         this.accountService.setAccount(undefined, this.redirectUrl);
      });
   }

   logout(): void{
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.appService.resetAppData();
      this.router.navigate(['/']);
   }

   testCookie(): void {
      var observ = this.http.get(this.apiUrl + 'testcookie', {withCredentials:true});
      observ.subscribe((response:any) => {
         console.log('RESPONSE', response)
      });
   }

   tryLogin(url:string = undefined, navigateFail:boolean = true): void {
      console.log('TRYING TO LOG IN', 'URL IS', url)
      var observ = this.http.get<Account>(this.apiUrl + 'accounts/auth', { withCredentials:true });
      observ.subscribe((account:Account) => {
         if(account){
            if(!url){
               url = this.redirectUrl
            }
            this.isLoggedIn = true;
            this.accountService.setAccount(account, url);
         }else{
            this.isLoggedIn = false;
            this.accountService.setAccount(undefined, undefined, navigateFail);
         }
      }, error => {
         this.isLoggedIn = false;
         this.accountService.setAccount(undefined, undefined, navigateFail);
      });
   }


   authUser(){
      // var observ = this.http.get<number>(this.apiUrl + 'accounts/auth/', {responseType: 'json', withCredentials: true});
      // observ.subscribe((accountId:number) => {
      //    console.log('TEST AUTH RES', accountId)
      //    if(accountId != undefined){
      //       if(this.appService.account){
      //          this.isLoggedIn = true;
      //          this.accountService.setAccount(this.appService.account);
      //       }else{
      //          var observ = this.accountService.requestAccount(accountId)
      //          observ.subscribe((response) => {
      //             this.isLoggedIn = true;
      //             this.accountService.setAccount(response);
      //          }, error => {
      //             this.isLoggedIn = false;
      //             this.accountService.setAccount(undefined);
      //          });
      //       }
            
      //    }else{
      //       this.isLoggedIn = false;
      //       this.accountService.setAccount(undefined);
      //    }
      // });
   }
}
