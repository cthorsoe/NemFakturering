import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   randomAdmin:number;
   constructor(private fb: FormBuilder, private router:Router, private authService:AuthService) { }

   ngOnInit() {
      this.createForm();
      this.randomAdmin = Math.floor(Math.random() * Math.floor(2));
      console.log('randomAdmin', this.randomAdmin);
   }

   createForm(){
      this.loginForm = this.fb.group({
         username: ['', Validators.required],
         password: ['', Validators.required],
      });
   }

   loginFormSubmit(loginForm:FormGroup, event:Event){
      console.log('SUBMIT')
      this.authService.login(this.randomAdmin == 1 ? true : false);
      this.router.navigate([this.authService.redirectUrl != undefined ? this.authService.redirectUrl : '/app']);
   }

}
