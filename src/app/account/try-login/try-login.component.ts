import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-try-login',
  templateUrl: './try-login.component.html',
  styleUrls: ['./try-login.component.scss']
})
export class TryLoginComponent implements OnInit {

   faSpinner = faSpinner;
   constructor(private authService:AuthService) { 
      // this.authService.testCookie();
      this.authService.tryLogin();
   }

   ngOnInit() {

   }

}
