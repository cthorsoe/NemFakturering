import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../entities/account';
import { environment } from '../../environments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private router:Router, private http:HttpClient) {
   }

   setAccount(){
      if(this.dataService.account == undefined){
         var observ = this.requestAccount(6 /*this.dataService.account.id*/)
         // this.dataService.customersObserv = observ;
         observ.subscribe((account: Account) => {
            this.dataService.account = account;
            this.dataService.accountSubject.next(account);
            console.log(this.dataService.account);
         });
      }else{
         this.dataService.accountSubject.next(this.dataService.account);
      }
   }
   requestAccount(accountId:number) : Observable<Account>{
      var observ = this.http.get<Account>(this.apiUrl + 'accounts/specific/' + accountId);
      return observ;
   }

   // getAccount(){
   //    this.dataService.account = this.setAccount(6 /*this.dataService.account.id*/);
   // }
}
