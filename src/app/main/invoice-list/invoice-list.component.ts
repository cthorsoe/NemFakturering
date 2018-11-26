import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/entities/invoice';
import { Customer } from 'src/app/entities/customer';
import { InvoiceService } from '../../services/handlers/invoice.service';
import { AppDataService } from '../../services/app-data.service';
import { InvoicesLanguageService } from '../../languages/invoices/invoices-language.service';
import { faFileDownload, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from 'node_modules/@angular/forms';
import { CustomerService } from '../../services/handlers/customer.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

   invoices:Invoice[];
   customers:Customer[];
   strings:InvoicesLanguageService;
   filterForm: FormGroup;
   invoicesSubscription;
   customersSubscription;
   faFileDownload = faFileDownload;
   faFilterIcon = faChevronDown;
   showFilterForm: Boolean = false;
   constructor(private fb: FormBuilder, private invoiceService:InvoiceService, private customersService:CustomerService, private appService:AppDataService, private invoiceLangService:InvoicesLanguageService) {
      this.strings = invoiceLangService;
   }

   ngOnInit() {
      this.createForm();
      this.invoicesSubscription = this.appService.invoicesSubject.subscribe((invoices: Invoice[]) => {
         this.invoices = invoices;
         console.log('VIEW SUBSCRIBE TRIGGER', this.invoices);
      });
      this.invoiceService.setInvoices();
      this.customersSubscription = this.appService.customersSubject.subscribe((customers: Customer[]) => {
         console.log('VIEW SUBSCRIBE TRIGGER');
         this.customers = customers;
      });
      this.customersService.setCustomers();
   }

   createForm(){
      this.filterForm = this.fb.group({
         customerId: '0'
      });
   }

   filterFormSubmit(form, event){
      console.log('FILTERING', form, event);
   }

   toggleFilterForm(show:boolean){
      this.showFilterForm = show;
      this.faFilterIcon = (show ? faChevronUp : faChevronDown)
   }

   downloadInvoice(invoice){
      console.log('DOWNLOADING INVOICE', invoice.id)
      this.invoiceService.generateInvoice(invoice);
   }

}
