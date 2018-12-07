import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../entities/item';
import { ItemsLanguageService } from '../../services/languages/items/items-language.service';
import { ItemService } from '../../services/handlers/item.service';
import { AppDataService } from '../../services/app-data.service';

declare var $:any;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
   itemForm: FormGroup;
   items:Item[];
   editItem:Item;
   faTimes = faTimes;
   faEdit = faEdit;
   strings:ItemsLanguageService;
   subscription;
   constructor(private itemService:ItemService, private itemsLangService:ItemsLanguageService, private fb: FormBuilder, private appService:AppDataService) {
      this.strings = itemsLangService;
   }

   ngOnInit() {
      this.createEmptyForm();
      this.subscription = this.appService.itemsSubject.subscribe((items: Item[]) => {
         console.log('VIEW SUBSCRIBE TRIGGER');
         this.items = items;
      });
      this.itemService.setItems();
      console.log('SET ITEMS TO', this.items)
      console.log('RESPONSE')
   }
   
   ngOnDestroy(){
      if(this.subscription){
         this.subscription.unsubscribe();
      }
   }

   deleteItem(itemId:number){
      this.itemService.deleteItem(itemId);
   }

   showItemModal(item:Item = undefined, event:Event){
      console.log('EVENT', item, event);
      if(item == undefined){
         this.createEmptyForm();
         this.editItem = null;
      }else{
         this.createForm(item)
         this.editItem = item;
      }
      $("#itemModal").modal('show');
   }

   createForm(item:Item){
      this.itemForm = this.fb.group({
         name: [item.name, Validators.required],
         defaultprice: [item.defaultprice,  [Validators.required, Validators.min(0)]],
      });
   }

   createEmptyForm(){
      this.itemForm = this.fb.group({
         name: ['', Validators.required],
         defaultprice: [0,  [Validators.required, Validators.min(0)]],
      });
   }

   itemFormSubmit(itemForm:FormGroup, event:Event){
      console.log('SUBMIT', itemForm, event);
      var newItem:Item = itemForm.value as Item;
      if(this.editItem != null){
         newItem.id = this.editItem.id;
         this.itemService.updateItem(newItem);
      }else{
         this.itemService.createItem(newItem);
      }
      $("#itemModal").modal('hide');
   }

}
