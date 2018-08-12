import { Component, OnInit } from '@angular/core';
import { faHome, faReceipt, faCog, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
   isAdmin:boolean;

   faHome = faHome;
   faReceipt = faReceipt;
   faAddressBook = faAddressBook
   faCog = faCog;
   faCogs = faCogs;
   
   constructor(private authService:AuthService) { }

   ngOnInit() {
      this.isAdmin = this.authService.isAdmin;
      console.log('LOGGED IN IS', this.isAdmin)
   }

}
