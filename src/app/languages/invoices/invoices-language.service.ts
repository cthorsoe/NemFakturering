import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesLanguageService {

   generateInvoice:LanguageString = new LanguageString();
   generateInvoiceDescription:LanguageString = new LanguageString();
   customer:LanguageString = new LanguageString();
   chooseCustomer:LanguageString = new LanguageString();
   items:LanguageString = new LanguageString();
   itemName:LanguageString = new LanguageString();
   price:LanguageString = new LanguageString();
   pricePrUnit:LanguageString = new LanguageString();
   amount:LanguageString = new LanguageString();
   prUnit:LanguageString = new LanguageString();
   insertAmount:LanguageString = new LanguageString();
   insertItemName:LanguageString = new LanguageString();
   insertPricePrUnit:LanguageString = new LanguageString();
   yourInvoices:LanguageString = new LanguageString();
   filterList:LanguageString = new LanguageString();
   filter:LanguageString = new LanguageString();
   date:LanguageString = new LanguageString();
   download:LanguageString = new LanguageString();
   constructor(private langService:LanguageService) { 
      langService.setLangObj(this.generateInvoice, 'Generate invoice', 'Generer faktura');
      langService.setLangObj(this.generateInvoiceDescription, 'Fill the form to create your invoice', 'Udfyld formen for at lave din faktura');
      langService.setLangObj(this.customer, 'Customer', 'Kunde');
      langService.setLangObj(this.chooseCustomer, 'Choose customer', 'Vælg kunde');
      langService.setLangObj(this.items, 'Items', 'Varer');
      langService.setLangObj(this.itemName, 'Item name', 'Varens navn');
      langService.setLangObj(this.price, 'Price', 'Pris');
      langService.setLangObj(this.pricePrUnit, 'Price pr. unit', 'Pris pr. stk.');
      langService.setLangObj(this.amount, 'Amount', 'Antal');
      langService.setLangObj(this.prUnit, 'pr. unit', 'pr. stk.');
      langService.setLangObj(this.insertAmount, 'Insert amount', 'Indtast antal');
      langService.setLangObj(this.insertItemName, 'Insert the name of the item', 'Indtast navnet på varen');
      langService.setLangObj(this.insertPricePrUnit, 'Insert the price pr. unit', 'Indtast prisen pr. stk.');
      langService.setLangObj(this.yourInvoices, 'Your invoices', 'Dine fakturaer');
      langService.setLangObj(this.filterList, 'Filter list', 'Filtrer liste');
      langService.setLangObj(this.filter, 'Filter', 'Filtrer');
      langService.setLangObj(this.date, 'Date', 'Dato');
      langService.setLangObj(this.download, 'Download', 'Download');
   }
}
