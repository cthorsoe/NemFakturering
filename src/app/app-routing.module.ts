import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { GuestComponent } from './guest/guest/guest.component';
import { MainComponent } from './main/main/main.component';
import { AdminComponent } from './admin/admin/admin.component';
import { GuestHomeComponent } from './guest/guest-home/guest-home.component';
import { TheProductComponent } from './guest/the-product/the-product.component';
import { PricingComponent } from './guest/pricing/pricing.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LogoutComponent } from './account/logout/logout.component';

const routes: Routes = [
   { path: 'account', component: AccountComponent, 
      children: [
         { path: '', redirectTo:'/login', pathMatch: 'full' },
         { path: 'login', component: LoginComponent},
         { path: 'register', component: RegisterComponent},
         { path: 'logout', component: LogoutComponent},
      ]   
   },
   { path: '', component: GuestComponent,
      children: [
         { path: '', redirectTo:'/index', pathMatch: 'full' },
         { path: 'index', component: GuestHomeComponent},
         { path: 'the-product', component: TheProductComponent},
         { path: 'pricing', component: PricingComponent},
      ]   
   },
   // { path: 'app', component: MainComponent },
   // { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
