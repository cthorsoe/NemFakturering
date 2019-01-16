import { AccountConfiguration } from "./configuration";
import { Subscription } from "./subscription";

export class Account { 
   constructor(registerForm = undefined) {
      if(registerForm){
         this.email = registerForm.email;
         this.username = registerForm.username
         this.name = registerForm.name
         this.activated = undefined;
      }else{
         this.email = '';
         this.username = '';
         this.name = ''; 
         this.activated = false;
      }
      this.cvr = null;
      this.street = '';
      this.zipcode = '';
      this.city = '';
      this.phone = '';
      this.subscription = undefined;
   }
   
   public id:number;
   public username:string;
   public name:string;
   public cvr:string;
   public street:string;
   public zipcode:string;
   public city:string;
   public email:string;
   public phone:string;
   public configuration:AccountConfiguration
   public activated:boolean
   public subscription:Subscription
}