import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class MainLanguageService {
   title:LanguageString = new LanguageString('Easy Invoicing', 'Nem Fakturering');
   home:LanguageString = new LanguageString('Home', 'Hjem');
   invoices:LanguageString = new LanguageString('Invoices', 'Fakturaer');
   customers:LanguageString = new LanguageString('Customers', 'Kunder');
   configuration:LanguageString = new LanguageString('Configuration', 'Opsætning');
   information:LanguageString = new LanguageString('Information', 'Information');
   items:LanguageString = new LanguageString('Items', 'Varer');

   constructor(private langService:LanguageService) {
      // langService.setLangObj(this.title, 'Easy Invoicing', 'Nem Fakturering');
      // langService.setLangObj(this.home, 'Home', 'Hjem');
      // langService.setLangObj(this.invoices, 'Invoices', 'Fakturaer');
      // langService.setLangObj(this.customers, 'Customers', 'Kunder');
      // langService.setLangObj(this.configuration, 'Configuration', 'Opsætning');
   }
}
