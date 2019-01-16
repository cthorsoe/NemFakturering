export class StripePayment { 
   constructor(data:any = undefined) {
      if(data && data.id && data.type && data.email){ 
         this.stripeToken = data.id;
         this.stripeTokenType = data.type;
         this.stripeTokenEmail = data.email;
      }
   }
   public stripeToken:string;
   public stripeTokenType:string;
   public stripeTokenEmail:string;

}