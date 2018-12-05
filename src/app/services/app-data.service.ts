import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../entities/customer';
import { CustomerService } from './handlers/customer.service';
import { Account } from '../entities/account';
import { InvoiceService } from './handlers/invoice.service';
import { Observable, Subject } from 'rxjs';
import { Item } from '../entities/item';
import { Invoice } from '../entities/invoice';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
   account:Account;
   accountSubject:Subject<Account> = new Subject<Account>();

   customers:Customer[];
   customersSubject:Subject<Customer[]> = new Subject<Customer[]>();

   items:Item[];
   itemsSubject:Subject<Item[]> = new Subject<Item[]>();

   invoices:Invoice[];
   invoicesSubject:Subject<Invoice[]> = new Subject<Invoice[]>();

   currentLang:string = localStorage.getItem('currentLang');

   constructor() { 
   }

   resetAppData(){
      this.account = undefined;
      this.customers = undefined;
      this.items = undefined;
      this.invoices = undefined;
   }
}
