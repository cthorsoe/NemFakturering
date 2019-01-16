import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AuthLoginGuardService } from '../services/auth-login-guard.service';
import { ItemsComponent } from './items/items.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
    { path: '', component: MainComponent, canActivate:[AuthLoginGuardService],
      children: [
         { path: '', redirectTo:'/app/dashboard', pathMatch: 'full' },
         { path: 'dashboard', component: MainHomeComponent},
         { path: 'invoice', component: InvoiceComponent},
         { path: 'invoice/list', component: InvoiceListComponent},
         { path: 'customers', component: CustomersComponent},
         { path: 'items', component: ItemsComponent },
         { path: 'subscription', component: SubscriptionComponent},
         { path: 'configuration', component: ConfigurationComponent},
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
