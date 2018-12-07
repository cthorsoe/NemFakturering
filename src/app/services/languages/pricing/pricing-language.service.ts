import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageString } from 'src/app/entities/language-string';

@Injectable({
  providedIn: 'root'
})
export class PricingLanguageService {
   pricing:LanguageString = new LanguageString('Pricing', 'Priser');
   pricingLead:LanguageString = new LanguageString('Take a look at the options you have when it comes to pricing for the Easy Invoicing application.', 'Her kan du danne dig et overblik over de muligheder du har i forhold til betaling for Nem Fakturering applikationen.');
   mo:LanguageString = new LanguageString('mo', 'md');

   trial:LanguageString = new LanguageString('Trial', 'Prøveperiode');
   free:LanguageString = new LanguageString('Free', 'Gratis');
   trialLine1:LanguageString = new LanguageString('7 days free access', '7 dages fri adgang');
   trialLine2:LanguageString = new LanguageString('Watermark on invoices', 'Vandmærke på fakturaer');
   trialLine3:LanguageString = new LanguageString('One time offer', 'Kan kun aktiveres en gang');
   activate:LanguageString = new LanguageString('Activate', 'Aktiver');

   twentyJourneyTicket:LanguageString = new LanguageString('20-journey ticket', 'Klippekort');
   twentyJourneyTicketLine1:LanguageString = new LanguageString('20 invoices', '20 fakturaer');
   twentyJourneyTicketLine2:LanguageString = new LanguageString('Unlimited amount of customers', 'Ubegrænset antal kunder');
   twentyJourneyTicketLine3:LanguageString = new LanguageString('Unlimited amount of items', 'Ubegrænset antal varer');
   buyTwentyJourneyTicket:LanguageString = new LanguageString('Buy 20-journey ticket', 'Køb klippekort');

   subscription:LanguageString = new LanguageString('Subscription', 'Abonnement');
   subscriptionLine1:LanguageString = new LanguageString('Generate invoices unlimited', 'Generer fakturaer ubegrænset');
   subscriptionLine2:LanguageString = new LanguageString('Unlimited amount of customers', 'Ubegrænset antal kunder');
   subscriptionLine3:LanguageString = new LanguageString('Unlimited amount of items', 'Ubegrænset antal varer');
   createSubscription:LanguageString = new LanguageString('Create subscription', 'Opret abonnement');

   constructor(public langService:LanguageService) {
   }
}
