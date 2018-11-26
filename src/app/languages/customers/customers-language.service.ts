import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersLanguageService {
   yourCustomers:LanguageString = new LanguageString();
   yourCustomersDescription:LanguageString = new LanguageString();
   createNew:LanguageString = new LanguageString();
   delete:LanguageString = new LanguageString();
   close:LanguageString = new LanguageString();
   saveChanges:LanguageString = new LanguageString();
   name:LanguageString = new LanguageString();
   contactPerson:LanguageString = new LanguageString();
   street:LanguageString = new LanguageString();
   zipCode:LanguageString = new LanguageString();
   city:LanguageString = new LanguageString();
   cvr:LanguageString = new LanguageString();
   cvrNumber:LanguageString = new LanguageString();
   create:LanguageString = new LanguageString();
   edit:LanguageString = new LanguageString();
   customer:LanguageString = new LanguageString();
   youHaveToFillACustomerName:LanguageString = new LanguageString();

   constructor(private langService:LanguageService) {
      console.log('SETTINGS CUSTOMERS LANG');
      langService.setLangObj(this.yourCustomers, 'Your customers', 'Dine kunder');
      langService.setLangObj(this.yourCustomersDescription, 'A list of customers you can currently generate invoices for', 'Liste over de kunder du kan generere fakturaer til');
      langService.setLangObj(this.createNew, 'Create new', 'Opret ny');
      langService.setLangObj(this.delete, 'Delete', 'Slet');
      langService.setLangObj(this.name, 'Name', 'Navn');
      langService.setLangObj(this.contactPerson, 'Contact person', 'Kontakt person');
      langService.setLangObj(this.street, 'Street', 'Vej');
      langService.setLangObj(this.zipCode, 'Zipcode', 'Post nr.');
      langService.setLangObj(this.city, 'City', 'By');
      langService.setLangObj(this.cvr, 'CVR', 'CVR');
      langService.setLangObj(this.cvrNumber, 'CVR number', 'CVR-nummer');
      langService.setLangObj(this.close, 'Close', 'Luk');
      langService.setLangObj(this.saveChanges, 'Save changes', 'Gem ændringer');
      langService.setLangObj(this.create, 'Create', 'Opret');
      langService.setLangObj(this.edit, 'Edit', 'Rediger');
      langService.setLangObj(this.customer, 'Customer', 'Kunde');
      langService.setLangObj(this.youHaveToFillACustomerName, 'You have to fill a customers name', 'Du skal udfylde et kundenavn');
   }
}
