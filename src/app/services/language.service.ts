import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
   currentLang:string = localStorage.getItem('currentLang');

   switchLanguage(lang){
      this.currentLang = lang;
      localStorage.setItem('currentLang', lang);
   }
}

