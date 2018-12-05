import { Injectable } from '@angular/core';
import { LanguageString } from '../../entities/language-string';
import { LanguageService } from '../../services/language.service';

@Injectable({
  providedIn: 'root'
})
export class MonthsLanguageService {
   january:LanguageString = new LanguageString('january', 'januar');
   february:LanguageString = new LanguageString('february', 'februar');
   march:LanguageString = new LanguageString('march', 'marts');
   april:LanguageString = new LanguageString('april', 'april');
   may:LanguageString = new LanguageString('may', 'maj');
   june:LanguageString = new LanguageString('june', 'juni');
   july:LanguageString = new LanguageString('july', 'juli');
   august:LanguageString = new LanguageString('august', 'august');
   september:LanguageString = new LanguageString('september', 'september');
   october:LanguageString = new LanguageString('october', 'oktober');
   november:LanguageString = new LanguageString('november', 'november');
   december:LanguageString = new LanguageString('december', 'december');

   constructor(private langService:LanguageService) {
      console.log('SETTINGS MONTHS');
      // langService.setLangObj(this.january, 'january', 'januar');
      // langService.setLangObj(this.february, 'february', 'februar');
      // langService.setLangObj(this.march, 'march', 'marts');
      // langService.setLangObj(this.april, 'april', 'april');
      // langService.setLangObj(this.may, 'may', 'maj');
      // langService.setLangObj(this.june, 'june', 'juni');
      // langService.setLangObj(this.july, 'july', 'juli');
      // langService.setLangObj(this.august, 'august', 'august');
      // langService.setLangObj(this.september, 'september', 'september');
      // langService.setLangObj(this.october, 'october', 'oktober');
      // langService.setLangObj(this.november, 'november', 'november');
      // langService.setLangObj(this.december, 'december', 'december');
   }
}
