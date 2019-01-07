import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppDataService } from 'src/app/services/app-data.service';
import { Account } from 'src/app/entities/account'
import { GuestLanguageService } from 'src/app/services/languages/guest/guest-language.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit {

   account:Account;
   subscription;
   strings:GuestLanguageService;
   faBars = faBars;

   constructor(private appService:AppDataService, private guestLangService:GuestLanguageService) { 
      this.strings = guestLangService;
   }

   ngOnInit() {
      console.log('GUEST COMPONENT')
      this.account = this.appService.account
      this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('HOME VIEW SUBSCRIBE TRIGGER', account, account.configuration);
         this.account = account;
      });
   }

}
