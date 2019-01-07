import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class HomeLanguageService {
   title:LanguageString = new LanguageString('Easy Invoicing', 'Nem Fakturering');
   introductionLine:LanguageString = new LanguageString('Generate professional invoices quick and easy', 'Generer professionelle fakturaer nemt og hurtigt');
   theProduct:LanguageString = new LanguageString('The product', 'Produktet');
   theProductDescription:LanguageString = new LanguageString('Easy Invoicing is for you who is looking for a simple program to generate invoices.', 'Nem Fakturering er for dig som søger et simpelt program til genering af fakturaer.');
   pricing:LanguageString = new LanguageString('Pricing', 'Priser');
   pricingDescription:LanguageString = new LanguageString('The most popular payment method is the montly subscription of 75 dkr.', 'Den mest populære betalingsmetode er abonnement på 75 dkr om måneden.');
   freeTrial:LanguageString = new LanguageString('Free trial', 'Prøv det gratis');
   freeTrialDescription:LanguageString = new LanguageString('If you wish to try the program before paying, you can use the 7 day free trial.', 'Vil du prøve programmet før betaling, kan du gøre brug af en prøveperiode på 7 dage.');
   viewDetails:LanguageString = new LanguageString('View details', 'Læs mere');

   constructor(public langService:LanguageService) { }
}
