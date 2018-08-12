import { Component, OnInit } from '@angular/core';
import { faHome, faReceipt, faCog } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
   faHome = faHome;
   faReceipt = faReceipt;
   faCog = faCog;
   faAddressBook = faAddressBook
   constructor() { }

   ngOnInit() {
   }

}
