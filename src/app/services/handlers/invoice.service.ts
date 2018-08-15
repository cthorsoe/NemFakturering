import { Injectable } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { Account } from 'src/app/entities/account';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

   constructor(private dataService:AppDataService) { 
   }

   setAccount(){
      //TODO: Implement HTTP Request to Server
      this.dataService.account = new Account();
      this.dataService.account.id = 1;
      this.dataService.account.name = "Nem Fakturering";
      this.dataService.account.cvr = "123456789";
      this.dataService.account.street = "Valby Maskinfabriksvej 17, 3. 2";
      this.dataService.account.zipcode = "2500";
      this.dataService.account.city = "Valby";
      this.dataService.account.email = "christian@thorsoe.dk";
      this.dataService.account.phone = "20283907";
   }

   getAccount(){
      if(this.dataService.account == undefined){
         this.setAccount();
      }
      return this.dataService.account;
   }
}
