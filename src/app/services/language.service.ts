import { Injectable } from '@angular/core';
import { LanguageString } from '../entities/language-string';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
   currentLang:string = 'da';

   constructor() {
      
   }
   
   setLangObj(property:LanguageString, en:string, da:string){
      property.en = en;
      property.da = da;
   }
}

