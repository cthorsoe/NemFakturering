import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomersComponent } from './customers/customers.component';
import { ConfigurationComponent } from './configuration/configuration.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [MainComponent, MainHomeComponent, InvoiceComponent, CustomersComponent, ConfigurationComponent]
})
export class MainModule { }