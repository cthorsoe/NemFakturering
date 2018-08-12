import {
  Component,
  OnInit
} from '@angular/core';
import {
  Chart
} from 'src/app/entities/chart';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {
  monthlyInvoicesChart: Chart = new Chart();
  constructor() {}

   ngOnInit() {
      this.monthlyInvoicesChart.type = 'line';
      this.monthlyInvoicesChart.data = {
         labels: ["Februar", "Marts", "April", "Maj", "Juni", "Juli", "August"],
         datasets: [{
         label: "Antal generede fakturaer",
         data: [65, 59, 80, 81, 56, 55, 40]
         }]
      };
      this.monthlyInvoicesChart.options = {
         responsive: true,
         maintainAspectRatio: false
      };
   }

}
