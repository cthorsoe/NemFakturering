import {  Injectable } from '@angular/core';
import { Customer } from '../../entities/customer';
import { AppDataService } from '../app-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private router:Router, private http:HttpClient) {
      
   }

   setCustomers(){
      if(this.dataService.customers == undefined){
         var observ = this.requestCustomers(this.dataService.account.id)
         observ.subscribe((customers: Customer[]) => {
            this.dataService.customers = customers;
            this.dataService.customersSubject.next(customers);
            console.log(this.dataService.customers);
         });
      }else{
         this.dataService.customersSubject.next(this.dataService.customers);
      }
   }
   requestCustomers(accountId:number) : Observable<Customer[]>{
      var observ = this.http.get<Customer[]>(this.apiUrl + 'customers/list/' + accountId, {withCredentials: true});
      return observ;
   }

   deleteCustomer(customerId:number){
      if(this.dataService.customers != undefined){
         var observ = this.http.delete<any>(this.apiUrl + 'customers/delete/' + customerId);
         // this.dataService.customersObserv = observ;
         observ.subscribe((response: any) => {
            if(response.deleted){
               var customers = this.dataService.customers;
               const index = customers.findIndex(x => x.id == customerId);
               if(index > -1){
                  customers.splice(index, 1);
                  this.dataService.customers = customers;
                  this.dataService.customersSubject.next(customers);
               }
            }
         });
      }
   }

   updateCustomer(customer:Customer){
      if(this.dataService.customers != undefined){
         var observ = this.http.put<any>(this.apiUrl + 'customers/edit/', customer, { responseType:"json" });
         // this.dataService.customersObserv = observ;
         observ.subscribe((response: Customer) => {
            var customers = this.dataService.customers;
            const index = customers.findIndex(x => x.id == customer.id);
            if(index > -1){
               customers[index] = response;
               this.dataService.customers = customers;
               this.dataService.customersSubject.next(customers);
            }
         });
      }
   }

   createCustomer(customer:Customer){
      if(this.dataService.customers != undefined && this.dataService.account != undefined){
         const data = {
            accountId: this.dataService.account.id,
            customer: customer
         }
         var observ = this.http.post<any>(this.apiUrl + 'customers/create/', data, { responseType:"json" });
         observ.subscribe((response: Customer) => {
            var customers = this.dataService.customers;
            if(response.id){
               customers.push(response)
               this.dataService.customers = customers;
               this.dataService.customersSubject.next(customers);
            }
         });
      }
   }
   // deleteCustomer(customer: Customer): Array < Customer > {
   //    const index: number = this.dataService.customers.findIndex(x => x.id == customer.id);
   //    if (index > -1) {
   //       this.dataService.customers.splice(index, 1);
   //    }
   //    return this.dataService.customers;
   // }

   // updateCustomer(customer: Customer): Array < Customer > {
   //    const index: number = this.dataService.customers.findIndex(x => x.id == customer.id);
   //    if (index > -1) {
   //       this.dataService.customers[index] = customer;
   //    }
   //    return this.dataService.customers;
   // }

   // createCustomer(customer: Customer): Array < Customer > {
   //    const demoId: number = this.dataService.customers[this.dataService.customers.length - 1].id + 1;
   //    customer.id = demoId;
   //    this.dataService.customers.push(customer);
   //    return this.dataService.customers;
   // }
}
