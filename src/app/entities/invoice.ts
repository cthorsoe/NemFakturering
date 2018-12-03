import { Customer } from "./customer";
import { Item } from "./item";

export class Invoice {
   public id:number;
   public invoicenumber:string;
   public createddate:Date;
   public totalprice:number;
   public totalpercentagediscount:number;
   public remarks:string;
   public items:Item[];
   public customer:Customer;
}