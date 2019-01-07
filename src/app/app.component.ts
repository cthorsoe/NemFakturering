import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'nem-fakturering-frontend';

   constructor(private authService:AuthService) {
   }

   ngOnInit() {
      let url = window.location.pathname;
      console.log('CURRENT URL IS', )
      this.authService.tryLogin(url, false)
      if(!localStorage.getItem('currentLang')){
         localStorage.setItem('currentLang', 'en');
      }
      console.log('INIT');
   }
}
