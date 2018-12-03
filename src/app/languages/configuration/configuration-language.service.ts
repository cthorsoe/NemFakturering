import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationLanguageService {

   configuration:LanguageString = new LanguageString();
   configureSettings:LanguageString = new LanguageString();
   invoiceNumberStartValue:LanguageString = new LanguageString();
   invoiceNumberPrefix:LanguageString = new LanguageString();
   invoiceNumberMinLength:LanguageString = new LanguageString();
   bankName:LanguageString = new LanguageString();
   bankRegNumber:LanguageString = new LanguageString();
   bankAccountNumber:LanguageString = new LanguageString();
   update:LanguageString = new LanguageString();

   constructor(private langService:LanguageService) {
      langService.setLangObj(this.configuration, 'Configuration', 'Opsætning');
      langService.setLangObj(this.configureSettings, 'Configure your settings', 'Konfigurer dine indstillinger');
      langService.setLangObj(this.invoiceNumberStartValue, 'Invoice number start value', 'Faktura nr. start værdi');
      langService.setLangObj(this.invoiceNumberPrefix, 'Invoice number prefix', 'Faktura nr. præfiks');
      langService.setLangObj(this.invoiceNumberMinLength, 'Invoice number minimum length', 'Faktura nr. minimum længde');
      langService.setLangObj(this.bankName, 'Bank name', 'Bank navn');
      langService.setLangObj(this.bankRegNumber, 'Bank registration number', 'Bank registrerings nummer');
      langService.setLangObj(this.bankAccountNumber, 'Bank account number', 'Bank konto number');
      langService.setLangObj(this.update, 'Update', 'Opdater');
   }
}
