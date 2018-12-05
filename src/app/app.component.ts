import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'nem-fakturering-frontend';

   ngOnInit() {
      if(!localStorage.getItem('currentLang')){
         localStorage.setItem('currentLang', 'en');
      }
      console.log('INIT');
   }
}
