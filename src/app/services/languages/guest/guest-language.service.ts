import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class GuestLanguageService {
   title:LanguageString = new LanguageString('Easy Invoicing', 'Nem Fakturering');
   theProduct:LanguageString = new LanguageString('The product', 'Produktet');
   pricing:LanguageString = new LanguageString('Pricing', 'Priser');
   application:LanguageString = new LanguageString('Application', 'Applikation');
   login:LanguageString = new LanguageString('Login', 'Log ind');
   logout:LanguageString = new LanguageString('Logout', 'Log ud');
   register:LanguageString = new LanguageString('Register', 'Registrer');

   constructor(public langService:LanguageService) { }
}
