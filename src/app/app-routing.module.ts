import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { GuestComponent } from './guest/guest/guest.component';
import { GuestHomeComponent } from './guest/guest-home/guest-home.component';
import { TheProductComponent } from './guest/the-product/the-product.component';
import { PricingComponent } from './guest/pricing/pricing.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { LogoutComponent } from './account/logout/logout.component';
import { TryLoginComponent } from './account/try-login/try-login.component';

const routes: Routes = [
   {
      path: 'admin',
      loadChildren: '../app/admin/admin.module#AdminModule'
   },
   {
      path: 'app',
      loadChildren: '../app/main/main.module#MainModule'
   },
   { path: 'account', component: AccountComponent, 
      children: [
         { path: '', redirectTo:'/', pathMatch: 'full' },
         { path: 'login', component: LoginComponent},
         { path: 'register', component: RegisterComponent},
         { path: 'logout', component: LogoutComponent},
         { path: 'try-login', component: TryLoginComponent},
      ]   
   },
   { path: '', component: GuestComponent,
      children: [
         // { path: '', redirectTo:'/index', pathMatch: 'full' },
         { path: '', component: GuestHomeComponent},
         { path: 'the-product', component: TheProductComponent},
         { path: 'pricing', component: PricingComponent},
      ]   
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
