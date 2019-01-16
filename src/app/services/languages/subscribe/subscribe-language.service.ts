import { Injectable } from '@angular/core';
import { LanguageService } from '../../language.service';
import { LanguageString } from '../../../entities/language-string';

@Injectable({
  providedIn: 'root'
})
export class SubscribeLanguageService {
   
   title:LanguageString = new LanguageString('Easy Invoicing', 'Nem Fakturering');


   constructor(public langService:LanguageService) { }
}
