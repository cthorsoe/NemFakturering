import { Component, OnInit } from '@angular/core';
import { faHome, faReceipt, faCog, faCogs, faInfoCircle, /* faCubes, */ faShoppingCart, faBars, faCaretDown, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../services/auth.service';
import { MainLanguageService } from '../../services/languages/main/main-language.service';
import { AccountService } from '../../services/handlers/account.service';
import { AppDataService } from '../../services/app-data.service';
import { Account } from '../../entities/account';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
   isAdmin:boolean;
   strings:MainLanguageService;
   account:Account = new Account();
   subscriptionRequired:boolean = environment.subscriptionRequired
   faHome = faHome;
   faReceipt = faReceipt;
   faAddressBook = faAddressBook;
   faCog = faCog;
   faCogs = faCogs;
   // faCubes = faCubes;
   faShoppingCart = faShoppingCart;
   faInfoCircle = faInfoCircle;
   faBars = faBars;
   faCaretDown = faCaretDown;
   faMoneyBillWave = faMoneyBillWave;

   subscription;

   
   constructor(private authService:AuthService, private mainLangService:MainLanguageService, private accountService:AccountService, private appService:AppDataService, private router:Router) { }

   ngOnInit() {
      console.log('MAIN INIT')
      // this.authService.authUser();
      this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('HOME VIEW SUBSCRIBE TRIGGER', account, account.configuration);
         this.account = account;
         if(account == undefined){
            this.router.navigate(['account/login'])
         }
      });
      this.accountService.triggerAccountSubject();
      this.isAdmin = this.authService.isAdmin;
      this.strings = this.mainLangService;
      console.log('LOGGED IN IS', this.isAdmin)
   }

   changeLang(lang:string){
      console.log('CHANGING LANG TO ', lang)
      /* if(this.appService.currentLang != lang){
         this.appService.currentLang = lang;
      } */
      if(this.mainLangService['langService'].currentLang != lang){
         this.mainLangService['langService'].switchLanguage(lang);
         // this.mainLangService['langService'].currentLang = lang;
         // localStorage.setItem('currentLang', lang);
      }
   }

   toggleSidebar(){
      $("#mainWrapper").toggleClass('show-sidebar');
   }

}
