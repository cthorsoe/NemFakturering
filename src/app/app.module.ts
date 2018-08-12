import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* ACCOUNT COMPONENTS  */
import { AccountComponent } from './account/account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LogoutComponent } from './account/logout/logout.component';
/* GUEST COMPONENTS  */
import { GuestComponent } from './guest/guest/guest.component';
import { GuestHomeComponent } from './guest/guest-home/guest-home.component';
import { TheProductComponent } from './guest/the-product/the-product.component';
import { PricingComponent } from './guest/pricing/pricing.component';
import { AuthService } from './services/auth.service';
import { AuthLoginGuardService } from './services/auth-login-guard.service';

@NgModule({
   declarations: [
      AppComponent,
      AccountComponent,
      GuestComponent,
      // MainComponent,
      // AdminComponent,
      GuestHomeComponent,
      TheProductComponent,
      PricingComponent,
      LoginComponent,
      RegisterComponent,
      LogoutComponent,
      // AdminHomeComponent,
      // ManageUsersComponent,
      // InvoiceComponent,
      // CustomersComponent,
      // ConfigurationComponent,
      // MainHomeComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule
   ],
   providers: [AuthService, AuthLoginGuardService],
   bootstrap: [AppComponent]
})
export class AppModule { }
