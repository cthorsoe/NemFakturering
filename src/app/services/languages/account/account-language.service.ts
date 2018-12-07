import { Injectable } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Injectable({
  providedIn: 'root'
})
export class AccountLanguageService {

  constructor(public langService:LanguageService) { }
}
