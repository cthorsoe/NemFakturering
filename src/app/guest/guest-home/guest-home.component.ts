import { Component, OnInit } from '@angular/core';
import { HomeLanguageService } from 'src/app/services/languages/home/home-language.service';

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.scss']
})
export class GuestHomeComponent implements OnInit {

   strings:HomeLanguageService;
   constructor(private homeLangService:HomeLanguageService) {
      this.strings = homeLangService;
   }

   ngOnInit() {
   }

}
