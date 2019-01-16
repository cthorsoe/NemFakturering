import { Injectable } from '@angular/core';
import { LanguageService } from '../../language.service';
import { LanguageString } from '../../../entities/language-string';

@Injectable({
  providedIn: 'root'
})
export class ActivateLanguageService {

   title:LanguageString = new LanguageString('Easy Invoicing', 'Nem Fakturering');
   activateYourAccount:LanguageString = new LanguageString('Activate your account', 'Aktiver din konto');
   activateYourAccountLead:LanguageString = new LanguageString('Pay DKK 75 to activate your account for 30 days', 'Betal 75 kr. for at aktivere din konto i 30 dage');
   purchase:LanguageString = new LanguageString('Purchase', 'Køb');
   activate:LanguageString = new LanguageString('Activate', 'Aktiver');

   constructor(public langService:LanguageService) { }
}
