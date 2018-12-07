import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class HomeLanguageService {
   introductionLine:LanguageString = new LanguageString('Generate professional invoices quick and easy', 'Generer professionelle fakturaer nemt og hurtigt');
   theProduct:LanguageString = new LanguageString('The product', 'Produktet');
   pricing:LanguageString = new LanguageString('Pricing', 'Priser');
   freeTrial:LanguageString = new LanguageString('Free trial', 'Prøv det gratis');
   viewDetails:LanguageString = new LanguageString('View details', 'Læs mere');

   constructor(public langService:LanguageService) { }
}
