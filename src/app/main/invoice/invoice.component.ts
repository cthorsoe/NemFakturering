import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Account } from '../../entities/account';
import { Customer } from '../../entities/customer';
import { Item } from '../../entities/item';
import { InvoiceService } from '../../services/handlers/invoice.service';
import { CustomerService } from '../../services/handlers/customer.service';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { InvoicesLanguageService } from '../../languages/invoices/invoices-language.service';
import { AppDataService } from '../../services/app-data.service';
import { ItemService } from '../../services/handlers/item.service';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent implements OnInit, OnDestroy {
   account:Account;
   customers:Customer[];
   searchItems:Item[];
   invoiceForm: FormGroup;
   strings:InvoicesLanguageService;
   customersSubscription;
   itemsProps:any = {top:"0px", left: "0px", width:"0px"};
   lastSearchedIndex:number = -1;
   // itemsSubscription;
   constructor(private invoiceService:InvoiceService, private customerService:CustomerService, private itemsService:ItemService, private invoiceLangService:InvoicesLanguageService, private fb:FormBuilder, private appService:AppDataService) { 
      this.strings = invoiceLangService;
   }
   
   ngOnInit() {
      this.customersSubscription = this.appService.customersSubject.subscribe((customers: Customer[]) => {
         console.log('VIEW SUBSCRIBE TRIGGER');
         this.customers = customers;
      });
      this.customerService.setCustomers();
      this.itemsService.setItems();
      this.account = this.appService.account;
      this.createForm();
      console.log('form', this.invoiceForm);
      
   }

   ngOnDestroy(){
      if(this.customersSubscription){
         this.customersSubscription.unsubscribe();
      }
      // if(this.itemsSubscription){
      //    this.itemsSubscription.unsubscribe();
      // }
   }

   createForm(){
      console.log('creating empty form');
      this.invoiceForm = this.fb.group({
         customerId: ['', Validators.required],
         items:  this.fb.array([this.createItem(true)])
      });
   }

   createItem(required:boolean): FormGroup{
      return this.fb.group({
         id: [''],
         // id: (required ? ['', Validators.required] : ['']),
         name: (required ? ['', Validators.required] : ['']),
         amount: (required ? ['', Validators.required] : ['']),
         price: (required ? ['', Validators.required] : [''])
      });
   }

   invoiceFormSubmit(invoiceForm:FormGroup, event:Event){
      console.log('SUBMIT',  invoiceForm);
      var invoice = invoiceForm.value;
      this.invoiceService.saveInvoice(invoice);
      this.invoiceService.createInvoiceFromForm(invoice);
   }


   itemFieldInput(index:number, inputName:string, event:Event){
      var items = this.invoiceForm.get('items') as FormArray
      var latestItem = items.controls[index] as FormGroup;
      var input = latestItem.controls[inputName] as FormControl
      // console.log('event', event);
      if(index == this.invoiceForm.value.items.length - 1 && input.value != ""){
         this.setItemFieldValidators(latestItem);
         items.push(this.createItem(false));
      }

      if(inputName == 'name'){
         this.lastSearchedIndex = index;
         var elem:any = event.srcElement;
         var props = elem.getBoundingClientRect();
         this.setItemsCss(props)
         var value:string = input.value;
         if(value.length > 0){
            this.searchForItems(value);
         }else{
            this.searchItems = [];
         }
      }
   }

   setItemsCss(props){
      this.itemsProps.top = (props.top + props.height) + "px";
      this.itemsProps.left = props.left + "px";
      this.itemsProps.width = props.width + "px"; 
      // this.itemsCss = "top:" + props.top + "px;left:" + props.left + "px;width:" + props.width + "px;";
   }

   // trySearch(index:number, control:FormControl){
   //    var prevValue = control.value;
   //    setTimeout(() => {
   //       if(prevValue == control.value){
   //          this.searchForItems(control.value);
   //       }
   //    }, 500)
   // }

   searchForItems(value:string){
      this.searchItems = this.appService['items'].filter(x => x.name.toLowerCase().indexOf(value) > -1);
      console.log('search performed', this.searchItems)
   }

   setItemFieldValidators(item:FormGroup){
      item.controls['id'].setValidators([Validators.required])
      item.controls['id'].updateValueAndValidity()
      item.controls['name'].setValidators([Validators.required])
      item.controls['name'].updateValueAndValidity()
      item.controls['price'].setValidators([Validators.required])
      item.controls['price'].updateValueAndValidity()
   }

   pickItemType(id:number){
      var formItems = this.invoiceForm.controls['items'] as FormArray;
      var formItem = formItems.controls[this.lastSearchedIndex] as FormGroup;
      var item = this.searchItems.find(x => x.id == id);
      formItem.controls['id'].setValue(id);
      formItem.controls['name'].setValue(item.name);
      formItem.controls['price'].setValue(item.defaultprice);
      this.searchItems = [];
      console.log(this.invoiceForm);
   }
}
