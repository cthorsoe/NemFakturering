import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Customer } from '../../entities/customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/app-data.service';
import { CustomerService } from 'src/app/services/handlers/customer.service';

declare var $:any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

   customerForm: FormGroup;
   customers:Array<Customer>;
   editCustomer:Customer;
   faTimes = faTimes;
   constructor(private customerService:CustomerService, private fb: FormBuilder) { }

   ngOnInit() {
      this.createEmptyForm();
      this.customers = this.customerService.getCustomers();
   }
   

   deleteCustomer(customer:Customer){
      this.customers = this.customerService.deleteCustomer(customer);
   }

   showCustomerModal(customer:Customer = undefined){
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
         this.customers = this.customerService.updateCustomer(newCustomer);
      }else{
         this.customers = this.customerService.createCustomer(newCustomer);
      }
      $("#customerModal").modal('hide');
   }

}
