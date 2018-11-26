import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardLanguageService {

   invoicesGenerated:LanguageString = new LanguageString();
   invoicedInTotal:LanguageString = new LanguageString();
   avgInvoicedPrMonth:LanguageString = new LanguageString();
   avgInvoiceAmount:LanguageString = new LanguageString();
   avgItemsCountPrInvoice:LanguageString = new LanguageString();
   amountOfGeneratedInvoices:LanguageString = new LanguageString();

   constructor(private langService:LanguageService) { 
      langService.setLangObj(this.invoicesGenerated, 'Invoices generated', 'Fakturaer generet');
      langService.setLangObj(this.invoicedInTotal, 'Invoiced in total', 'Faktureret for totalt');
      langService.setLangObj(this.avgInvoicedPrMonth, 'Avg. invoices pr. mth.', 'Gns. fakturaer pr. md.');
      langService.setLangObj(this.avgInvoiceAmount, 'Avg. invoice amount', 'Gns faktura pris');
      langService.setLangObj(this.avgItemsCountPrInvoice, 'Avg. items amount pr. invoice', 'Gns. antal varer pr. faktura');
      langService.setLangObj(this.amountOfGeneratedInvoices, 'Amount of generated invoices', 'Antal generede fakturaer');
   }
}
