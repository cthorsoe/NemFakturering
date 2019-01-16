import { Injectable } from '@angular/core';
import { LanguageString } from 'src/app/entities/language-string';
import { LanguageService } from 'src/app/services/language.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionLanguageService {

   title:LanguageString = new LanguageString('Easy Invoicing', 'Nem Fakturering');

   status:LanguageString = new LanguageString('Status', 'Status');
   active:LanguageString = new LanguageString('Active', 'Aktiv');
   canceled:LanguageString = new LanguageString('Canceled', 'Annulleret');
   inactive:LanguageString = new LanguageString('Inactive', 'Inaktiv');
   activeTitle:LanguageString = new LanguageString('Your subscription is active', 'Dit abonnement er aktivt');
   canceledTitle:LanguageString = new LanguageString('Your subscription is canceled', 'Dit abonnement er annulleret');
   inactiveTitle:LanguageString = new LanguageString('You have no active subscription', 'Du har ikke noget aktivt abonnement');
   activeDescription:LanguageString = new LanguageString('Your subscription is active!', 'Dit abonnement er aktivt!');
   canceledDescription:LanguageString = new LanguageString('Your subscription is canceled!, but period hasn\'t ended yet!', 'Dit abonnement er annulleret, men perioden er ikke udløbet endnu!');
   inactiveDescription:LanguageString = new LanguageString('No active subscription!', 'Intet aktivt abonnement!');
   
   subscriptionCreated:LanguageString = new LanguageString('Subscription created', 'Abonnement oprettet');
   currentPeriodStarted:LanguageString = new LanguageString('Current period started', 'Nuværende periode startet');
   currentPeriodEnds:LanguageString = new LanguageString('Current period ends', 'Nuværende periode ends');
   subscriptionCanceled:LanguageString = new LanguageString('Subscription canceled', 'Abonnement annulleret');
   
   cancelSubscription:LanguageString = new LanguageString('Cancel subscription', 'Annuller abonnement');
   reactivateSubscription:LanguageString = new LanguageString('Reactive subscription', 'Genaktiver abonnement');
   createSubscription:LanguageString = new LanguageString('Create subscription', 'Opret abonnement');

   
   cancelSubscriptionConfirm:LanguageString = new LanguageString('Are you sure you wish to cancel your subscription?', 'Er du sikker på at du ønsker at annullere dit abonnement?');
   reactivateSubscriptionConfirm:LanguageString = new LanguageString('Are you sure you wish to reactivate your subscription?', 'Er du sikker på at du ønsker at genaktivere dit abonnement?');

   closeWindow:LanguageString = new LanguageString('Close window', 'Luk vindue');

   constructor(public langService:LanguageService) { }
}
