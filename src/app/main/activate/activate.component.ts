import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { Account } from '../../entities/account';
import { environment } from '../../../environments/environment';
import { ActivateLanguageService } from '../../services/languages/activate/activate-language.service';
import { StripePayment } from '../../entities/stripe-payment';
import { AccountService } from '../../services/handlers/account.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

   strings:ActivateLanguageService
   account:Account
   activationEndDate:Date = new Date()
   constructor(private appService:AppDataService, private accountService:AccountService, private activateLangService:ActivateLanguageService) {
      this.strings = activateLangService;
      this.account = appService.account;
   }

   ngOnInit() {
      this.activationEndDate.setDate(this.activationEndDate.getDate() + 30);
   }

   openCheckout() {
      console.log('CURRENT LANG', this.activateLangService.langService.currentLang)
      var handler = (<any>window).StripeCheckout.configure({
         key: environment.stripeKey,
         currency:'DKK',
         locale: this.activateLangService.langService.currentLang,
         token: (token: any) => {
            let paymentData:StripePayment = new StripePayment(token);
            this.accountService.activateAccount(paymentData);
         }
      });

      handler.open({
         name: this.strings.title[this.strings.langService.currentLang],
         amount: 7500
      });
   }


}
