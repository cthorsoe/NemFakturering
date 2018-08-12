import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { CustomersComponent } from './customers/customers.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AuthLoginGuardService } from '../services/auth-login-guard.service';

const routes: Routes = [
    { path: '', component: MainComponent, canActivate:[AuthLoginGuardService],
      children: [
         { path: '', component: MainHomeComponent},
         { path: 'index', component: MainHomeComponent},
         { path: 'invoice', component: InvoiceComponent},
         { path: 'customers', component: CustomersComponent},
         { path: 'configuration', component: ConfigurationComponent},
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
