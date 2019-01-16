import { Component, OnInit } from '@angular/core';
import { faFileInvoice, faMoneyBillWave, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import { HomeLanguageService } from '../../services/languages/home/home-language.service';

@Component({
  selector: 'app-guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: ['./guest-home.component.scss']
})
export class GuestHomeComponent implements OnInit {

   strings:HomeLanguageService;
   faFileInvoice = faFileInvoice;
   faMoneyBillWave = faMoneyBillWave;
   faHandHoldingHeart = faHandHoldingHeart;
   constructor(private homeLangService:HomeLanguageService) {
      this.strings = homeLangService;
   }

   ngOnInit() {
   }

}
