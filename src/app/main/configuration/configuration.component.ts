import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/handlers/account.service';
import { Account } from '../../entities/account';
import { AppDataService } from '../../services/app-data.service';
import { ConfigurationLanguageService } from '../../services/languages/configuration/configuration-language.service';
import { InvoiceTemplate } from '../../entities/invoice-template';
import { environment } from '../../../environments/environment';

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
   retrievedAccount:boolean
   updatedAccount:boolean
   templates:InvoiceTemplate[]
   apiUrl:string = environment.apiUrl
   constructor(private fb:FormBuilder, private accountService:AccountService, private appService:AppDataService, private configurationLangService:ConfigurationLanguageService, private cd: ChangeDetectorRef) { }

   ngOnInit() {
      this.setTemplates();
      this.lang = this.configurationLangService.langService.currentLang;
      this.strings = this.configurationLangService;
      this.retrievedAccount = false;
      this.updatedAccount = false;
      console.log(this.appService);
      this.account = this.appService.account;
      if(this.account){
         this.retrievedAccount = true;
      }else{
         this.setAccountSubscription();
      }
      console.log('ACCOUNT', this.appService.account)
      this.createForm();
      
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
            configuration: this.fb.group({
               invoicenumberstartvalue: [this.account.configuration.invoicenumberstartvalue, Validators.required],
               invoicenumberprefix: [this.account.configuration.invoicenumberprefix],
               invoicenumberminlength: [this.account.configuration.invoicenumberminlength, Validators.required],
               invoicetemplate: [this.account.configuration.invoicetemplate, Validators.required],
               usetaxes: [this.account.configuration.usetaxes],
               taxpercentage: [this.account.configuration.taxpercentage],
               itempricesincludetaxes: [this.account.configuration.itempricesincludetaxes],
               paymentduedays: [this.account.configuration.paymentduedays, [Validators.required, Validators.min(0)]],
               bankname: [this.account.configuration.bankname],
               bankregnumber: [this.account.configuration.bankregnumber],
               bankaccountnumber: [this.account.configuration.bankaccountnumber],
               logo: [null],
               removeLogo: [false]
            })
         });
         console.log(this.configurationForm.value)
      }
   }

   setAccountSubscription(){
      this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('SHOW UPDATED ALERT');
         this.account = account;
         this.createForm();
         if(this.retrievedAccount){
            this.updatedAccount = true;
         }
      });
   }

   configurationFormSubmit(configurationForm, $event){
      if(!this.subscription){
         this.setAccountSubscription()
      }
      this.updatedAccount = false;
      console.log('SUBMIT', configurationForm.value)
      this.accountService.updateConfiguration(configurationForm.value as Account)
   }

   setTemplates(){
      this.templates = [
         new InvoiceTemplate('DEFAULT', 'Default'),
         new InvoiceTemplate('BASIC', 'Basic'),
         new InvoiceTemplate('STYLISH', 'Stylish'),
         new InvoiceTemplate('CLEAN', 'Clean'),
         new InvoiceTemplate('FANCY', 'Fancy'),
      ] as InvoiceTemplate[]

      console.log('TEMPLATES', this.templates)
   }

   onFileChange(event) {
      const reader = new FileReader();
  
      if(event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          
          reader.onload = () => {
              this.configurationForm.patchValue({
                  configuration: {
                     logo: reader.result
                  }
              });
              // need to run CD since file load runs outside of zone
              this.cd.markForCheck();
          };
      }
  }
}
