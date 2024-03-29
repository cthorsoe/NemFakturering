import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService } from '../../services/app-data.service';
import { AccountService } from '../../services/handlers/account.service';
import { Account } from '../../entities/account';
import { CheckPasswordsValidator } from '../../validators/CheckPasswordsValidator';
import { AccountLanguageService } from '../../services/languages/account/account-language.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
   registerForm: FormGroup;
   randomAdmin:number;
   // accountCreated:boolean = false;
   submitStatus:string = 'NOSUBMIT';
   subscription;
   strings:AccountLanguageService
   constructor(private fb: FormBuilder, private accountLangService:AccountLanguageService, private router:Router, private appService:AppDataService, private accountService:AccountService) { 
      this.strings = accountLangService;
   }

   ngOnInit() {
      this.createForm();
      this.randomAdmin = Math.floor(Math.random() * Math.floor(2));
      /* this.subscription = this.appService.accountSubject.subscribe((account: Account) => {
         console.log('HIT', account)
      }); */
      console.log('randomAdmin', this.randomAdmin);
      this.subscription = this.accountService.createSubmitSubject.subscribe((status:string) => {
         this.submitStatus = status;
      })
   }

   createForm(){
      this.registerForm = new FormGroup({
         'email': new FormControl('', [Validators.required, Validators.email]),
         'username': new FormControl('', Validators.required),
         'name': new FormControl('', Validators.required),
         'password': new FormControl('', Validators.required),
         'passwordConfirm': new FormControl('', Validators.required)
      }, { 
         validators: CheckPasswordsValidator.getCheckPasswordsValidator()
      });
   }

   registerFormSubmit(registerForm:FormGroup, event:Event){
      // console.log('SUBMITTING ACCOUNT')
      // this.authService.login(registerForm.value);
      // this.router.navigate([this.authService.redirectUrl != undefined ? this.authService.redirectUrl : '/app']);
      this.accountService.createAccount(registerForm.value)
   }
}
