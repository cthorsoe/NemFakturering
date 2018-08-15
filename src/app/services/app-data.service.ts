import { Injectable } from '@angular/core';
import { Customer } from '../entities/customer';
import { CustomerService } from './handlers/customer.service';
import { Account } from '../entities/account';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
   customers:Array<Customer>;
   account:Account;

   constructor() { 
   }


}
