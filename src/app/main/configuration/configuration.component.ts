import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigurationLanguageService } from '../../languages/configuration/configuration-language.service';
import { AccountService } from '../../services/handlers/account.service';
import { Account } from '../../entities/account';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

   configurationForm: FormGroup;
   strings:ConfigurationLanguageService
   account:Account;
   lang:String;
   subscription;
   constructor(private fb:FormBuilder, private accountService:AccountService, private appService:AppDataService, private configurationLangService:ConfigurationLanguageService) { }

   ngOnInit() {
      this.lang = this.appService.currentLang;
      this.strings = this.configurationLangService;
      console.log(this.appService);
      this.account = this.appService.account;
      console.log('ACCOUNT', this.appService.account)
      this.createForm();
      this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('VIEW SUBSCRIBE TRIGGER', account);
         this.account = account;
         this.createForm();
      });
      // this.accountService.setAccount();
      console.log('STRINGS', this.strings);
   }
   createForm(){
      if(this.account != undefined){
         this.configurationForm = this.fb.group({
            phone: [this.account.phone],
            cvr: [this.account.cvr],
            street: [this.account.street],
            zipcode: [this.account.zipcode],
            city: [this.account.city, Validators.required],
            startvalue: [this.account.configuration.invoicenumberstartvalue, Validators.required],
            prefix: [this.account.configuration.invoicenumberprefix],
            minlength: [this.account.configuration.invoicenumberminlength, Validators.required],
            bankname: [this.account.configuration.bankname],
            bankregnumber: [this.account.configuration.bankregnumber],
            bankaccountnumber: [this.account.configuration.bankaccountnumber],
         });
      }else{
         this.configurationForm = this.fb.group({
            startvalue: ['', Validators.required],
            prefix: [''],
            minlength: ['', Validators.required],
            bankname: [''],
            bankregnumber: [''],
            bankaccountnumber: [''],
         });
      }
   }

}
