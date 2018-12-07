export class Item { 
   constructor(id:number = undefined, name:string = undefined, amount:number = undefined, defaultprice:number = undefined, price:number = undefined) {
      console.log('CREATING ITEM', id, name, amount, defaultprice, price)
      this.id = id;
      this.name = name;
      this.amount = amount;
      this.defaultprice = defaultprice;
      this.price = price;
   }
   public id:number;
   public name:string;
   public amount:number;
   public defaultprice:number;
   public price:number;
}