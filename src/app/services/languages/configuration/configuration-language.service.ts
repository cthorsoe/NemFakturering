import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationLanguageService {
   configuration:LanguageString = new LanguageString('Configuration', 'Opsætning');
   configureSettings:LanguageString = new LanguageString('Configure your settings', 'Konfigurer dine indstillinger');
   accountInformation:LanguageString = new LanguageString('Account information', 'Konto information');
   invoice:LanguageString = new LanguageString('Invoice', 'Faktura');
   bankInformation:LanguageString = new LanguageString('Bank information', 'Bank information');
   phone:LanguageString = new LanguageString('Phone', 'Telefon nr.');
   cvr:LanguageString = new LanguageString('CVR', 'CVR');
   street:LanguageString = new LanguageString('Street', 'Vej');
   zipcode:LanguageString = new LanguageString('Zipcode', 'Post nr.');
   city:LanguageString = new LanguageString('City', 'By');
   invoiceNumberStartValue:LanguageString = new LanguageString('Invoice number start value', 'Faktura nr. start værdi');
   invoiceNumberPrefix:LanguageString = new LanguageString('Invoice number prefix', 'Faktura nr. præfiks');
   invoiceNumberMinLength:LanguageString = new LanguageString('Invoice number minimum length', 'Faktura nr. minimum længde');
   useTaxes:LanguageString = new LanguageString('Use taxes', 'Inkluder moms');
   taxPercentage:LanguageString = new LanguageString('Tax percentage', 'Moms procent');
   itemPricesIncludeTaxes:LanguageString = new LanguageString('Item prices include taxes', 'Varernes priser er inkl. moms');
   daysBeforeInvoicePaymentIsDue:LanguageString = new LanguageString('Amount of days before invoice payment is due', 'Antal dage før fakturaers seneste betalingsdato')
   bankName:LanguageString = new LanguageString('Bank name', 'Bank navn');
   bankRegNumber:LanguageString = new LanguageString('Bank registration number', 'Bank registrerings nummer');
   bankAccountNumber:LanguageString = new LanguageString('Bank account number', 'Bank konto number');
   update:LanguageString = new LanguageString('Update', 'Opdater');
   updateSuccess:LanguageString = new LanguageString('Your account configuration has been updated!', 'Din konto opsætning er blevet opdateret!');

   constructor(public langService:LanguageService) {
   }
}
