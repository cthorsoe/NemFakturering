import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Account } from '../../entities/account';
import { AppDataService } from '../../services/app-data.service';
import { StripePayment } from '../../entities/stripe-payment';
import { AccountService } from '../../services/handlers/account.service';
import { SubscriptionLanguageService } from '../../services/languages/subscription/subscription-language.service';
declare var $: any;

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

   strings:SubscriptionLanguageService
   account:Account
   subscription:any
   // subscriptionData:any
   constructor(private appService:AppDataService, private accountService:AccountService, private subscriptionLangService:SubscriptionLanguageService) {
      this.strings = subscriptionLangService;
      this.account = appService.account;
      console.log(this.account.subscription)
   }

   ngOnInit() {
      this.subscription = this.appService.accountSubject.subscribe(account => {
         this.account = account;
         $("#cancelSubscriptionModal").modal('hide');
         $("#reactivateSubscriptionModal").modal('hide');
         console.log('DATA IS', this.account.subscription)
      })
   }

   openCheckout() {
      console.log('CURRENT LANG', this.subscriptionLangService.langService.currentLang)
      var handler = (<any>window).StripeCheckout.configure({
         key: environment.stripeKey,
         currency:'DKK',
         locale: this.subscriptionLangService.langService.currentLang,
         token: (token: any) => {
            let paymentData:StripePayment = new StripePayment(token);
            this.accountService.createSubscription(paymentData);
         }
      });

      handler.open({
         name: this.strings.title[this.strings.langService.currentLang],
         amount: 7500
      });
   }

   openCancelSubscriptionModel(){
      $("#cancelSubscriptionModal").modal('show');
   }

   cancelSubscriptionConfirm(){
      this.accountService.cancelSubscription()
   }

   openReactivateSubscriptionModel(){
      $("#reactivateSubscriptionModal").modal('show');
   }

   reactivateSubscriptionConfirm(){
      this.accountService.reactivateSubscription()
   }
}
