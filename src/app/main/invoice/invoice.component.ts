import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/entities/account';
import { Customer } from 'src/app/entities/customer';
import { InvoiceService } from 'src/app/services/handlers/invoice.service';
import { CustomerService } from 'src/app/services/handlers/customer.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
   account:Account;
   customers:Array<Customer>;
   invoiceForm: FormGroup;
   constructor(private invoiceService:InvoiceService, private customerService:CustomerService, private fb:FormBuilder) { }

   ngOnInit() {
      this.account = this.invoiceService.getAccount();
      this.customers = this.customerService.getCustomers();
      // DROP REACTIVE FORM HER? BRUG ALM?
      this.createForm();
   }

   createForm(){
      console.log('creating empty form');
      this.invoiceForm = this.fb.group({
         customerId: [0],
         items:  this.fb.array([''])
      });
   }

   invoiceFormSubmit(invoiceForm:FormGroup, event:Event){
      console.log('SUBMIT',  invoiceForm);
   }

}
