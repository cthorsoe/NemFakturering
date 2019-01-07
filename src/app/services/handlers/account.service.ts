import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../entities/account';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   
   createdAccountSubject:Subject<boolean> = new Subject<boolean>();
   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private router:Router, private http:HttpClient) {
   }

   setAccount(account:Account, redirectUrl:string = 'app', navigateFail:boolean = true){
      console.log('SETTING ACCOUNT', redirectUrl, account )
      if(account == undefined){
         if(navigateFail) {
            this.router.navigate(['account/login'])
         }
      }else{
         if(this.dataService.account == undefined){
            this.router.navigate([redirectUrl == '/account/login' ? '/app/dashboard' : redirectUrl])
         }
         this.dataService.account = account;
         this.dataService.accountSubject.next(account);
      }
   }
   
   requestAccount(accountId:number) : Observable<Account>{
      var observ = this.http.get<Account>(this.apiUrl + 'accounts/specific/' + accountId);
      return observ;
   }

   getAccount(){
      return this.dataService.account as Account;
   }

   triggerAccountSubject(){
      if(this.dataService.account != undefined){
         this.dataService.accountSubject.next(this.dataService.account);
      }
   }

   createAccount(registerData){
      let account = new Account(registerData);
      account['password'] = registerData.password
      console.log('account', account)
      var observ = this.http.post<Account>(this.apiUrl + 'accounts/create/', account, { responseType:"json" });
      observ.subscribe((response:any) => {
         switch (response.status) {
            case 'SUCCESS':
               console.log('ACCOUNT SUCCESSFULLY CREATED')
               this.createdAccountSubject.next(true);
               break;
            case 'TAKEN':
               break;
            case 'ERROR':
            default:
               break;
         }
      });
   }

   updateConfiguration(updatedAccount:Account){
      if(this.dataService.account){
         updatedAccount.id = this.dataService.account.id
         console.log(updatedAccount);
         var observ = this.http.put<Account>(this.apiUrl + 'accounts/update-configuration/', updatedAccount, { responseType:"json" });
         observ.subscribe((account:Account) => {
            this.dataService.account = Object.assign(this.dataService.account, account) as Account;
            this.dataService.accountSubject.next(this.dataService.account);
            console.log('RESPONSE', account);
         });
      }

   }
}
