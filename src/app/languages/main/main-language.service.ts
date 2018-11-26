import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class MainLanguageService {
   title:LanguageString = new LanguageString();
   home:LanguageString = new LanguageString();
   invoices:LanguageString = new LanguageString();
   customers:LanguageString = new LanguageString();
   configuration:LanguageString = new LanguageString();

   constructor(private langService:LanguageService) {
      langService.setLangObj(this.title, 'Easy Invoicing', 'Nem Fakturering');
      langService.setLangObj(this.home, 'Home', 'Hjem');
      langService.setLangObj(this.invoices, 'Invoices', 'Fakturaer');
      langService.setLangObj(this.customers, 'Customers', 'Kunder');
      langService.setLangObj(this.configuration, 'Configuration', 'Opsætning');
   }
}
