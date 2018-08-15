import {  Injectable } from '@angular/core';
import { Customer } from '../../entities/customer';
import { AppDataService } from '../app-data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private dataService:AppDataService) {
  }

   setCustomers(): void {
      this.dataService.customers = new Array<Customer>();
      console.log('GETTING CUSTOMER DATA');
      var customer: Customer = new Customer();
      customer.id = 1;
      customer.name = "CTH";
      customer.contactperson = "Christian Thorsø";
      customer.cvr = "123456789";
      customer.street = "Valby Maskinfabriksvej 17, 3. 2";
      customer.zipcode = "2500";
      customer.city = "Valby";
      this.dataService.customers.push(customer);
      customer = new Customer();
      customer.id = 2;
      customer.name = "NS";
      customer.contactperson = "Nanna Søderquist";
      customer.cvr = "123456789";
      customer.street = "Engdraget 74";
      customer.zipcode = "2500";
      customer.city = "Valby";
      this.dataService.customers.push(customer);
   }

   getCustomers(){
      if(this.dataService.customers == undefined){
         this.setCustomers();
      }
      return this.dataService.customers;
   }

   deleteCustomer(customer: Customer): Array < Customer > {
      const index: number = this.dataService.customers.findIndex(x => x.id == customer.id);
      if (index > -1) {
         this.dataService.customers.splice(index, 1);
      }
      return this.dataService.customers;
   }

   updateCustomer(customer: Customer): Array < Customer > {
      const index: number = this.dataService.customers.findIndex(x => x.id == customer.id);
      if (index > -1) {
         this.dataService.customers[index] = customer;
      }
      return this.dataService.customers;
   }

   createCustomer(customer: Customer): Array < Customer > {
      const demoId: number = this.dataService.customers[this.dataService.customers.length - 1].id + 1;
      customer.id = demoId;
      this.dataService.customers.push(customer);
      return this.dataService.customers;
   }
}
