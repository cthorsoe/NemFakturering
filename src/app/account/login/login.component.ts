import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AppDataService } from '../../services/app-data.service';
import { AccountService } from '../../services/handlers/account.service';
import { Account } from '../../entities/account';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AccountLanguageService } from '../../services/languages/account/account-language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   randomAdmin:number;
   loginFailed:boolean = false;
   submitStatus:string = 'NOSUBMIT';
   subscription;
   statusSubscription;
   strings;
   constructor(private fb: FormBuilder, private router:Router, private accountLangService:AccountLanguageService, private authService:AuthService, private appService:AppDataService, private accountService:AccountService, private _cookieService:CookieService) {
      this.strings = accountLangService;
   }

   ngOnInit() {
      console.log('COOKIE', this._cookieService.get('connect.sid'))
      this.createForm();
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
      this.statusSubscription = this.authService.loginStatusSubject.subscribe((status:string) => {
         this.submitStatus = status;
      })
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
