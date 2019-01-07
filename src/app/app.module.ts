/* MODULES */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
/* SERVICES */
import { AuthService } from './services/auth.service';
import { AuthLoginGuardService } from './services/auth-login-guard.service';
import { AuthAdminGuardService } from './services/auth-admin-guard.service';
import { AppDataService } from './services/app-data.service';
/* COMPONENTS */
import { AppComponent } from './app.component';
/* ACCOUNT COMPONENTS  */
import { AccountComponent } from './account/account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LogoutComponent } from './account/logout/logout.component';
import { TryLoginComponent } from './account/try-login/try-login.component';
/* GUEST COMPONENTS  */
import { GuestComponent } from './guest/guest/guest.component';
import { GuestHomeComponent } from './guest/guest-home/guest-home.component';
import { TheProductComponent } from './guest/the-product/the-product.component';
import { PricingComponent } from './guest/pricing/pricing.component';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { AccountService } from './services/handlers/account.service';

@NgModule({
   declarations: [
      AppComponent,
      AccountComponent,
      GuestComponent,
      GuestHomeComponent,
      TheProductComponent,
      PricingComponent,
      LoginComponent,
      RegisterComponent,
      LogoutComponent,
      TryLoginComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FontAwesomeModule
   ],
   providers: [AuthService, AuthLoginGuardService, AuthAdminGuardService, AppDataService, CookieService, { provide: CookieOptions, useValue: {} }],
   bootstrap: [AppComponent]
})
export class AppModule { }
