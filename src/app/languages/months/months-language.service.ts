import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class MonthsLanguageService {
   january:LanguageString = new LanguageString();
   february:LanguageString = new LanguageString();
   march:LanguageString = new LanguageString();
   april:LanguageString = new LanguageString();
   may:LanguageString = new LanguageString();
   june:LanguageString = new LanguageString();
   july:LanguageString = new LanguageString();
   august:LanguageString = new LanguageString();
   september:LanguageString = new LanguageString();
   october:LanguageString = new LanguageString();
   november:LanguageString = new LanguageString();
   december:LanguageString = new LanguageString();

   constructor(private langService:LanguageService) {
      console.log('SETTINGS MONTHS');
      langService.setLangObj(this.january, 'january', 'januar');
      langService.setLangObj(this.february, 'february', 'februar');
      langService.setLangObj(this.march, 'march', 'marts');
      langService.setLangObj(this.april, 'april', 'april');
      langService.setLangObj(this.may, 'may', 'maj');
      langService.setLangObj(this.june, 'june', 'juni');
      langService.setLangObj(this.july, 'july', 'juli');
      langService.setLangObj(this.august, 'august', 'august');
      langService.setLangObj(this.september, 'september', 'september');
      langService.setLangObj(this.october, 'october', 'oktober');
      langService.setLangObj(this.november, 'november', 'november');
      langService.setLangObj(this.december, 'december', 'december');
   }
}
