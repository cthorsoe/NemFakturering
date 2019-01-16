import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Item } from '../../entities/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private http:HttpClient) { }

   setItems(){
      if(this.dataService.items == undefined){
         var observ = this.requestItems(this.dataService.account.id)
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

   updateItem(item:Item){
      if(this.dataService.items != undefined){
         var observ = this.http.put<Item>(this.apiUrl + 'items/edit/', item, { responseType:"json" });
         observ.subscribe((response: Item) => {
            var items = this.dataService.items;
            const index = items.findIndex(x => x.id == item.id);
            if(index > -1){
               items[index] = response;
               this.dataService.items = items;
               this.dataService.itemsSubject.next(items);
            }
         });
      }
   }

   createItem(item:Item){
      if(this.dataService.items != undefined && this.dataService.account != undefined){
         const data = {
            accountId: this.dataService.account.id,
            item: item
         }
         var observ = this.http.post<Item>(this.apiUrl + 'items/create/', data, { responseType:"json" });
         observ.subscribe((response: Item) => {
            var items = this.dataService.items;
            if(response.id){
               items.push(response)
               this.dataService.items = items;
               this.dataService.itemsSubject.next(items);
            }
         });
      }
   }

   deleteItem(itemId:number){
      if(this.dataService.items != undefined){
         var observ = this.http.delete<any>(this.apiUrl + 'items/delete/' + itemId);
         observ.subscribe((response: any) => {
            if(response.deleted){
               var items = this.dataService.items;
               const index = items.findIndex(x => x.id == itemId);
               if(index > -1){
                  items.splice(index, 1);
                  this.dataService.items = items;
                  this.dataService.itemsSubject.next(items);
               }
            }
         });
      }
   }

}
