import { Component, OnInit, Input } from '@angular/core';
import { Chart } from '../../entities/chart';
import { DashboardLanguageService } from '../../services/languages/dashboard/dashboard-language.service';
import { MonthsLanguageService } from '../../services/languages/months/months-language.service';
import { TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {
   monthlyInvoicesChart: Chart = undefined;
   strings:DashboardLanguageService;
   currentLang = '';
   subscription;
   
   // @Input('currentLang')
   // set currentLang(currentLang: string) {
   //    this._currentLang = currentLang;
   //    this.createMonthlyInvoicesChartChart();
   // }

   // get currentLang(): string { return this._currentLang; }
   

   constructor(private dashboardLangService:DashboardLanguageService, private monthsLangService:MonthsLanguageService, private titleCasePipe: TitleCasePipe) {
      this.strings = dashboardLangService;
      this.currentLang = dashboardLangService['langService'].currentLang;
      console.log('monthsLangService', monthsLangService)
   }
   
   ngOnInit() {
      this.createMonthlyInvoicesChartChart();
   }

   createMonthlyInvoicesChartChart(){
      console.log('CREATING CHART')
      this.monthlyInvoicesChart = new Chart();
      console.log('monthsLangService', this.monthsLangService)
      let monthArray = [
         this.titleCasePipe.transform(this.monthsLangService.february[this.currentLang]), 
         this.titleCasePipe.transform(this.monthsLangService.march[this.currentLang]), 
         this.titleCasePipe.transform(this.monthsLangService.april[this.currentLang]), 
         this.titleCasePipe.transform(this.monthsLangService.may[this.currentLang]), 
         this.titleCasePipe.transform(this.monthsLangService.june[this.currentLang]), 
         this.titleCasePipe.transform(this.monthsLangService.july[this.currentLang]), 
         this.titleCasePipe.transform(this.monthsLangService.august[this.currentLang])
      ]
      this.monthlyInvoicesChart.type = 'line';
      this.monthlyInvoicesChart.data = {
         labels: monthArray,
         datasets: [{
         label: this.dashboardLangService.amountOfGeneratedInvoices[this.dashboardLangService['langService'].currentLang],
         data: [65, 59, 80, 81, 56, 55, 40]
         }]
      };
      this.monthlyInvoicesChart.options = {
         responsive: true,
         maintainAspectRatio: false
      };
   }

}
