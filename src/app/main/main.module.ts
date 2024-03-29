import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomersComponent } from './customers/customers.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ItemsComponent } from './items/items.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MainRoutingModule,
      FontAwesomeModule,
      ChartModule,
   ],
   declarations: [
      MainComponent, 
      MainHomeComponent, 
      InvoiceComponent, 
      InvoiceListComponent, 
      CustomersComponent, 
      ItemsComponent,
      ConfigurationComponent,
      SubscriptionComponent
   ],
   providers: [TitleCasePipe]
})
export class MainModule { }
