import { Injectable } from '@angular/core';
import { LanguageString } from '../../../entities/language-string';
import { LanguageService } from '../../language.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersLanguageService {
   yourCustomers:LanguageString = new LanguageString('Your customers', 'Dine kunder');
   yourCustomersDescription:LanguageString = new LanguageString('A list of customers you can currently generate invoices for', 'Liste over de kunder du kan generere fakturaer til');
   createNew:LanguageString = new LanguageString('Create new', 'Opret ny');
   delete:LanguageString = new LanguageString('Delete', 'Slet');
   close:LanguageString = new LanguageString('Close', 'Luk');
   saveChanges:LanguageString = new LanguageString('Save changes', 'Gem ændringer');
   name:LanguageString = new LanguageString('Name', 'Navn');
   contactPerson:LanguageString = new LanguageString('Contact person', 'Kontakt person');
   street:LanguageString = new LanguageString('Street', 'Vej');
   zipCode:LanguageString = new LanguageString('Zipcode', 'Post nr.');
   city:LanguageString = new LanguageString('City', 'By');
   cvr:LanguageString = new LanguageString('CVR', 'CVR');
   cvrNumber:LanguageString = new LanguageString('CVR number', 'CVR-nummer');
   create:LanguageString = new LanguageString('Create', 'Opret');
   edit:LanguageString = new LanguageString('Edit', 'Rediger');
   customer:LanguageString = new LanguageString('Customer', 'Kunde');
   youHaveToFillACustomerName:LanguageString = new LanguageString('You have to fill a customers name', 'Du skal udfylde et kundenavn');

   constructor(public langService:LanguageService) {
      console.log('SETTINGS CUSTOMERS LANG');
      // langService.setLangObj(this.yourCustomers, 'Your customers', 'Dine kunder');
      // langService.setLangObj(this.yourCustomersDescription, 'A list of customers you can currently generate invoices for', 'Liste over de kunder du kan generere fakturaer til');
      // langService.setLangObj(this.createNew, 'Create new', 'Opret ny');
      // langService.setLangObj(this.delete, 'Delete', 'Slet');
      // langService.setLangObj(this.name, 'Name', 'Navn');
      // langService.setLangObj(this.contactPerson, 'Contact person', 'Kontakt person');
      // langService.setLangObj(this.street, 'Street', 'Vej');
      // langService.setLangObj(this.zipCode, 'Zipcode', 'Post nr.');
      // langService.setLangObj(this.city, 'City', 'By');
      // langService.setLangObj(this.cvr, 'CVR', 'CVR');
      // langService.setLangObj(this.cvrNumber, 'CVR number', 'CVR-nummer');
      // langService.setLangObj(this.close, 'Close', 'Luk');
      // langService.setLangObj(this.saveChanges, 'Save changes', 'Gem ændringer');
      // langService.setLangObj(this.create, 'Create', 'Opret');
      // langService.setLangObj(this.edit, 'Edit', 'Rediger');
      // langService.setLangObj(this.customer, 'Customer', 'Kunde');
      // langService.setLangObj(this.youHaveToFillACustomerName, 'You have to fill a customers name', 'Du skal udfylde et kundenavn');
   }
}
