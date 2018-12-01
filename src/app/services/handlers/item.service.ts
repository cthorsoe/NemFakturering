import { Injectable } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/enviroments';
import { Item } from 'src/app/entities/item';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private http:HttpClient) { }

   setItems(){
      if(this.dataService.items == undefined){
         var observ = this.requestItems(6 /*this.dataService.account.id*/)
         observ.subscribe((items: Item[]) => {
            this.dataService.items = items;
            this.dataService.itemsSubject.next(items);
            console.log(this.dataService.items);
         });
      }else{
         this.dataService.itemsSubject.next(this.dataService.items);
      }
   }
   requestItems(accountId:number) : Observable<Item[]>{
      var observ = this.http.get<Item[]>(this.apiUrl + 'items/list/' + accountId);
      return observ;
   }
}