import { Component, OnInit } from '@angular/core';
import { faHome, faReceipt, faCog, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../services/auth.service';
import { MainLanguageService } from '../../languages/main/main-language.service';
import { AccountService } from '../../services/handlers/account.service';
import { AppDataService } from '../../services/app-data.service';
import { Account } from '../../entities/account';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
   isAdmin:boolean;
   strings:MainLanguageService;
   account:Account = new Account();
   faHome = faHome;
   faReceipt = faReceipt;
   faAddressBook = faAddressBook;
   faCog = faCog;
   faCogs = faCogs;
   subscription;

   
   constructor(private authService:AuthService, private mainLangService:MainLanguageService, private accountService:AccountService, private appService:AppDataService, private router:Router) { }

   ngOnInit() {
      console.log('MAIN INIT')
      this.authService.authUser();
      // var account = this.accountService.getAccount();
      // if(account == undefined){
      //    // this.router.navigate(['account/login'])
      // }else{
      //    this.account = account;
         
      // }
      this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('VIEW SUBSCRIBE TRIGGER', account);
         this.account = account;
         if(account == undefined){
            this.router.navigate(['account/login'])
         }
      });
      this.isAdmin = this.authService.isAdmin;
      this.strings = this.mainLangService;
      console.log('LOGGED IN IS', this.isAdmin)
   }

   changeLang(lang:string){
      console.log('CHANGING LANG TO ', lang)
      if(this.mainLangService['langService'].currentLang != lang){
         this.mainLangService['langService'].currentLang = lang;
      }
   }

}
