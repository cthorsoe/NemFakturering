import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Customer } from '../../entities/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/handlers/customer.service';
import { LanguageService } from '../../services/language.service';
import { CustomersLanguageService } from '../../services/languages/customers/customers-language.service';
import { AppDataService } from '../../services/app-data.service';

declare var $:any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, OnDestroy {
   customerForm: FormGroup;
   customers:Customer[];
   editCustomer:Customer;
   faTimes = faTimes;
   faEdit = faEdit;
   strings:CustomersLanguageService;
   subscription;
   constructor(private customerService:CustomerService, private customersLangService:CustomersLanguageService, private fb: FormBuilder, private appService:AppDataService) {
      this.strings = customersLangService;
   }

   ngOnInit() {
      this.createEmptyForm();
      this.subscription = this.appService.customersSubject.subscribe((customers: Customer[]) => {
         console.log('VIEW SUBSCRIBE TRIGGER');
         this.customers = customers;
      });
      this.customerService.setCustomers();
      console.log('SET CUSTOMERS TO', this.customers)
      console.log('RESPONSE')
   }

   ngOnDestroy(){
      if(this.subscription){
         this.subscription.unsubscribe();
      }
   }
   

   deleteCustomer(customerId:number){
      this.customerService.deleteCustomer(customerId);
   }

   showCustomerModal(customer:Customer = undefined, event:Event){
      console.log('EVENT', event);
      if(customer == undefined){
         this.createEmptyForm();
         this.editCustomer = null;
      }else{
         this.createForm(customer)
         this.editCustomer = customer;
      }
      $("#customerModal").modal('show');
   }

   createForm(customer:Customer){
      console.log('creating empty form');
      this.customerForm = this.fb.group({
         name: [customer.name, Validators.required],
         contactperson: [ customer.contactperson],
         cvr: [customer.cvr],
         street: [customer.street],
         zipcode: [customer.zipcode],
         city: [customer.city],
      });
   }

   createEmptyForm(){
      this.customerForm = this.fb.group({
         name: ['', Validators.required],
         contactperson: [''],
         cvr: [''],
         street: [''],
         zipcode: [''],
         city: [''],
      });
   }

   customerFormSubmit(customerForm:FormGroup, event:Event){
      console.log('SUBMIT', customerForm, event);
      var newCustomer:Customer = customerForm.value as Customer;
      if(this.editCustomer != null){
         newCustomer.id = this.editCustomer.id;
         this.customerService.updateCustomer(newCustomer);
      }else{
         this.customerService.createCustomer(newCustomer);
      }
      $("#customerModal").modal('hide');
   }

}
