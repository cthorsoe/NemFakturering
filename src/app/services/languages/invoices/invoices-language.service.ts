import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicesLanguageService {

   generateInvoice:LanguageString = new LanguageString('Generate invoice', 'Generer faktura');
   generateInvoiceDescription:LanguageString = new LanguageString('Fill the form to create your invoice', 'Udfyld formen for at lave din faktura');
   customer:LanguageString = new LanguageString('Customer', 'Kunde');
   chooseCustomer:LanguageString = new LanguageString('Choose customer', 'Vælg kunde');
   items:LanguageString = new LanguageString('Items', 'Varer');
   itemName:LanguageString = new LanguageString('Item name', 'Varens navn');
   price:LanguageString = new LanguageString('Price', 'Pris');
   pricePrUnit:LanguageString = new LanguageString('Price pr. unit', 'Pris pr. stk.');
   amount:LanguageString = new LanguageString('Amount', 'Antal');
   prUnit:LanguageString = new LanguageString('pr. unit', 'pr. stk.');
   insertAmount:LanguageString = new LanguageString('Insert amount', 'Indtast antal');
   insertItemName:LanguageString = new LanguageString('Insert the name of the item', 'Indtast navnet på varen');
   insertPricePrUnit:LanguageString = new LanguageString('Insert the price pr. unit', 'Indtast prisen pr. stk.');
   yourInvoices:LanguageString = new LanguageString('Your invoices', 'Dine fakturaer');
   filterList:LanguageString = new LanguageString('Filter list', 'Filtrer liste');
   filter:LanguageString = new LanguageString('Filter', 'Filtrer');
   date:LanguageString = new LanguageString('Date', 'Dato');
   download:LanguageString = new LanguageString('Download', 'Download');

   constructor(private langService:LanguageService) { 
      // langService.setLangObj(this.generateInvoice, 'Generate invoice', 'Generer faktura');
      // langService.setLangObj(this.generateInvoiceDescription, 'Fill the form to create your invoice', 'Udfyld formen for at lave din faktura');
      // langService.setLangObj(this.customer, 'Customer', 'Kunde');
      // langService.setLangObj(this.chooseCustomer, 'Choose customer', 'Vælg kunde');
      // langService.setLangObj(this.items, 'Items', 'Varer');
      // langService.setLangObj(this.itemName, 'Item name', 'Varens navn');
      // langService.setLangObj(this.price, 'Price', 'Pris');
      // langService.setLangObj(this.pricePrUnit, 'Price pr. unit', 'Pris pr. stk.');
      // langService.setLangObj(this.amount, 'Amount', 'Antal');
      // langService.setLangObj(this.prUnit, 'pr. unit', 'pr. stk.');
      // langService.setLangObj(this.insertAmount, 'Insert amount', 'Indtast antal');
      // langService.setLangObj(this.insertItemName, 'Insert the name of the item', 'Indtast navnet på varen');
      // langService.setLangObj(this.insertPricePrUnit, 'Insert the price pr. unit', 'Indtast prisen pr. stk.');
      // langService.setLangObj(this.yourInvoices, 'Your invoices', 'Dine fakturaer');
      // langService.setLangObj(this.filterList, 'Filter list', 'Filtrer liste');
      // langService.setLangObj(this.filter, 'Filter', 'Filtrer');
      // langService.setLangObj(this.date, 'Date', 'Dato');
      // langService.setLangObj(this.download, 'Download', 'Download');
   }
}
