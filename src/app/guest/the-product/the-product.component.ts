import { Component, OnInit } from '@angular/core';
import { TheProductLanguageService } from '../../services/languages/the-product/the-product-language.service';

@Component({
  selector: 'app-the-product',
  templateUrl: './the-product.component.html',
  styleUrls: ['./the-product.component.scss']
})
export class TheProductComponent implements OnInit {

   strings:TheProductLanguageService;
   constructor(private theProductLangService:TheProductLanguageService) {
      this.strings = theProductLangService;
   }

  ngOnInit() {
  }

}
