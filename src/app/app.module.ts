import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';

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
// /* MAIN COMPONENTS  */
// import { MainComponent } from './main/main/main.component';
// import { InvoiceComponent } from './main/invoice/invoice.component';
// import { CustomersComponent } from './main/customers/customers.component';
// import { ConfigurationComponent } from './main/configuration/configuration.component';
// import { MainHomeComponent } from './main/main-home/main-home.component';
// /* ADMIN COMPONENTS  */
// import { AdminComponent } from './admin/admin/admin.component';
// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
// import { ManageUsersComponent } from './admin/manage-users/manage-users.component';

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
      ReactiveFormsModule,
      ChartModule,
   ],
   providers: [AuthService, AuthLoginGuardService],
   bootstrap: [AppComponent]
})
export class AppModule { }
