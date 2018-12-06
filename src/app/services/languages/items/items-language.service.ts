import { Injectable } from '@angular/core';
import { LanguageService } from '../../language.service';
import { LanguageString } from '../../../entities/language-string';

@Injectable({
  providedIn: 'root'
})
export class ItemsLanguageService {
   yourItems:LanguageString = new LanguageString('Your items', 'Dine varer');
   yourItemsDescription:LanguageString = new LanguageString('A list of items you can currently generate invoices with', 'Liste over de varer du kan tilføje til fakuraer');
   createNew:LanguageString = new LanguageString('Create new', 'Opret ny');
   delete:LanguageString = new LanguageString('Delete', 'Slet');
   close:LanguageString = new LanguageString('Close', 'Luk');
   saveChanges:LanguageString = new LanguageString('Save changes', 'Gem ændringer');
   name:LanguageString = new LanguageString('Name', 'Navn');
   price:LanguageString = new LanguageString('Default price', 'Standard pris');
   create:LanguageString = new LanguageString('Create', 'Opret');
   edit:LanguageString = new LanguageString('Edit', 'Rediger');
   item:LanguageString = new LanguageString('Item', 'Vare');
   youHaveToFillAnItemName:LanguageString = new LanguageString('You have to fill an items name', 'Du skal udfylde et varenavn');
   youHaveToFillAnItemPrice:LanguageString = new LanguageString('You have to fill an items price', 'Du skal udfylde en standardpris');

   constructor(private langService:LanguageService) {
   }
}