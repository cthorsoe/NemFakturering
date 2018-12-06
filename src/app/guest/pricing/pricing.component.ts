import { Component, OnInit } from '@angular/core';
import { PricingLanguageService } from '../../services/languages/pricing/pricing-language.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

   strings:PricingLanguageService;
   constructor(private pricingLangService:PricingLanguageService) {
      this.strings = pricingLangService;
      console.log(this.strings)
   }

   ngOnInit() {
   }

}
