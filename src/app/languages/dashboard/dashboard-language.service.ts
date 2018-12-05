import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardLanguageService {

   invoicesGenerated:LanguageString = new LanguageString('Invoices generated', 'Fakturaer generet');
   invoicedInTotal:LanguageString = new LanguageString('Invoiced in total', 'Faktureret for totalt');
   avgInvoicedPrMonth:LanguageString = new LanguageString('Avg. invoices pr. mth.', 'Gns. fakturaer pr. md.');
   avgInvoiceAmount:LanguageString = new LanguageString('Avg. invoice amount', 'Gns faktura pris');
   avgItemsCountPrInvoice:LanguageString = new LanguageString('Avg. items amount pr. invoice', 'Gns. antal varer pr. faktura');
   amountOfGeneratedInvoices:LanguageString = new LanguageString('Amount of generated invoices', 'Antal generede fakturaer');

   constructor(private langService:LanguageService) { 
      // langService.setLangObj(this.invoicesGenerated, 'Invoices generated', 'Fakturaer generet');
      // langService.setLangObj(this.invoicedInTotal, 'Invoiced in total', 'Faktureret for totalt');
      // langService.setLangObj(this.avgInvoicedPrMonth, 'Avg. invoices pr. mth.', 'Gns. fakturaer pr. md.');
      // langService.setLangObj(this.avgInvoiceAmount, 'Avg. invoice amount', 'Gns faktura pris');
      // langService.setLangObj(this.avgItemsCountPrInvoice, 'Avg. items amount pr. invoice', 'Gns. antal varer pr. faktura');
      // langService.setLangObj(this.amountOfGeneratedInvoices, 'Amount of generated invoices', 'Antal generede fakturaer');
   }
}
