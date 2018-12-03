import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppDataService } from 'src/app/services/app-data.service';
import { AccountService } from 'src/app/services/handlers/account.service';
import { Account } from '../../entities/account';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   randomAdmin:number;
   loginFailed:boolean = false;
   subscription;
   constructor(private fb: FormBuilder, private router:Router, private authService:AuthService, private appService:AppDataService, private accountService:AccountService, private _cookieService:CookieService) { }

   ngOnInit() {
      console.log('COOKIE', this._cookieService.get('connect.sid'))
      this.createForm();
      this.randomAdmin = Math.floor(Math.random() * Math.floor(2));
      this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('HIT', account)
         if(account != undefined){
            //SUCCESS
            this.loginFailed = false;
         }else{
            //ERROR
            this.loginFailed = true;
         }
      });
      console.log('randomAdmin', this.randomAdmin);
   }

   createForm(){
      this.loginForm = this.fb.group({
         username: ['', Validators.required],
         password: ['', Validators.required],
      });
   }

   loginFormSubmit(loginForm:FormGroup, event:Event){
      console.log('SUBMITTING ACCOUNT')
      this.authService.login(loginForm.value);
      this.router.navigate([this.authService.redirectUrl != undefined ? this.authService.redirectUrl : '/app']);
   }

   getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

}
