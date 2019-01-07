import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { LanguageString } from 'src/app/entities/language-string';

@Injectable({
  providedIn: 'root'
})
export class TheProductLanguageService {
   theProduct:LanguageString = new LanguageString('The Product', 'Produktet');
   theProductLead:LanguageString = new LanguageString('A little description about the product and what it can offer', 'En lille beskrivelse af produktet og hvad det kan tilbyde');

   theProductText:LanguageString = new LanguageString(`Easy Invoicing can help you generate your invoices. 
   Create customers in the system whcih you wish to generate invoices for, and add items to the invoices you wish to generate. 
   You can both create items prior to generating an invoice, or use unknown items on your invoice when generating the invoice. 
   If unknown items is being used, the item will automatically be saved and be ready to use for another time. 
   The invoice is being generated as a PDF file, and it is getting downloaded to your computer directly in the browser. 
   All generated invoices is being saved in the system, and can be found again at a later time, shoud you wish to.
   We have a number of different templates for the invoice, which you can use to impact the design of the invoice.
   You can also upload a logo which will be added to the invoice. Have fun!
   `, 
   `Nem Fakturering kan hjælpe dig med at generere dine fakturaer. 
   Opret kunder i systemet som du vil generere fakturaer til, og tilføj varerer til fakturaer som du vil generere. 
   Du har både mulighed for at oprette varer inden generering af fakturaer, eller bruge ukendte varer ved generering af fakturaer. 
   Hvis ukendte varer bruges til en faktura, bliver varen automatisk gemt og klar til brug en anden gang. 
   Fakturaern bliver generet som en PDF fil, som downloades til din computer direkte i browseren. 
   Genererede faktuaer er gemt i systemet og kan findes frem igen på et senere tidspunkt hvis det ønskes.
   Vi har en række af skabeloner til faktuaerne som du kan benytte for at have indflydelse på designet af fakturaen.
   Du har også mulighed for at uploade et logo som vil komme på fakturaen. God fornøjelse!
   `)
   constructor(public langService:LanguageService) { 

   }
}
