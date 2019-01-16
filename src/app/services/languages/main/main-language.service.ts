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
   subscribe:LanguageString = new LanguageString('Subscribe', 'Abonner');
   subscription:LanguageString = new LanguageString('Subscription', 'Abonnement');
   activate:LanguageString = new LanguageString('Activate', 'Aktiver');

   constructor(public langService:LanguageService) {
   }
}
