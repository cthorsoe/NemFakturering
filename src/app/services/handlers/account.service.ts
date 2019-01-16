import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../entities/account';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { StripePayment } from '../../entities/stripe-payment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
   
   createSubmitSubject:Subject<string> = new Subject<string>();
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
         this.createSubmitSubject.next(response.status)
      });
   }

   updateConfiguration(updatedAccount:Account){
      if(this.dataService.account){
         console.log('OLD ACCOUNT IS', this.dataService.account);
         updatedAccount.id = this.dataService.account.id
         console.log(updatedAccount);
         var observ = this.http.put<Account>(this.apiUrl + 'accounts/update-configuration/', updatedAccount, { responseType:"json" });
         observ.subscribe((account:Account) => {
            console.log('RETRIEVED ACCOUNT IS', account);
            this.dataService.account = Object.assign(this.dataService.account, account) as Account;
            console.log('NEW ACCOUNT IS', this.dataService.account);
            this.dataService.accountSubject.next(this.dataService.account);
         });
      }
   }

   activateAccount(paymentData:StripePayment){
      console.log('ACTIVATING ACCOUNT', paymentData)
      let requestData = {
         accountId: this.dataService.account.id,
         paymentData: paymentData
      }
      var observ = this.http.post<Account>(this.apiUrl + 'accounts/activate/', requestData, { responseType:"json" });
      observ.subscribe((response:any) => {
         switch (response.status) {
            case 'SUCCESS':
               console.log('PAYMENT SUCCESS')
               break;
            case 'TAKEN':
               break;
            case 'ERROR':
            default:
               break;
         }
      });
   }

   createSubscription(paymentData:StripePayment){
      console.log('ACTIVATING ACCOUNT', paymentData)
      let requestData = {
         accountId: this.dataService.account.id,
         paymentData: paymentData
      }
      var observ = this.http.post<any>(this.apiUrl + 'accounts/subscribe/', requestData, { responseType:"json" });
      observ.subscribe((response:any) => {
         console.log('response is', response)
         if(!(response.status && response.status == 'ERROR')){
            let account = this.dataService.account;
            account.subscription = response
            this.dataService.accountSubject.next(account);
         }
      });
   }

   cancelSubscription(){
      if(this.dataService.account){
         let requestData = {
            accountId: this.dataService.account.id
         }
         var observ = this.http.post<any>(this.apiUrl + 'accounts/cancel-subscription/', requestData, { responseType:"json" });
         observ.subscribe((response:any) => {
            console.log('response is', response)
            if(!(response.status && response.status == 'ERROR')){
               let account = this.dataService.account;
               account.subscription = response
               this.dataService.accountSubject.next(account);
            }
         });
      }
   }

   reactivateSubscription(){
      if(this.dataService.account){
         let requestData = {
            accountId: this.dataService.account.id
         }
         var observ = this.http.post<any>(this.apiUrl + 'accounts/reactivate-subscription/', requestData, { responseType:"json" });
         observ.subscribe((response:any) => {
            console.log('response is', response)
            if(!(response.status && response.status == 'ERROR')){
               let account = this.dataService.account;
               account.subscription = response
               this.dataService.accountSubject.next(account);
            }
         });
      }
   }

   clearSession(){
      var observ = this.http.post(this.apiUrl + 'accounts/clear-session/', null, {withCredentials:true});
      observ.subscribe((response:any) => {
         console.log('CLEAR RESPONSE', response)
      });
   }

   // getSubscription(){
   //    if(!this.dataService.subscription){
   //       var observ = this.http.get<Account>(this.apiUrl + 'accounts/subscription/' + this.dataService.account.id);
   //       observ.subscribe((subscription:any) => {
   //          if(subscription){
   //             this.dataService.subscriptionSubject.next(subscription);
   //          }
   //       })
   //    }
   // }
}
