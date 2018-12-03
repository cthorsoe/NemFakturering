import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../entities/account';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private router:Router, private http:HttpClient) {
   }

   setAccount(account:Account){
      if(account != undefined){
         this.router.navigate(['app'])
      }
      this.dataService.account = account;
      this.dataService.accountSubject.next(account);
   }
   
   requestAccount(accountId:number) : Observable<Account>{
      var observ = this.http.get<Account>(this.apiUrl + 'accounts/specific/' + accountId);
      return observ;
   }

   getAccount(){
      return this.dataService.account as Account;
   }
}
