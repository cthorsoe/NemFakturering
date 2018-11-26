import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   title = 'nem-fakturering-frontend';

   ngOnInit() {
      console.log('INIT');
   }
}
