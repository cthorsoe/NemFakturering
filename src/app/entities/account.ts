import { AccountConfiguration } from "./configuration";

export class Account { 
   /**
    *
    */
   constructor(registerForm = undefined) {
      if(registerForm){
         this.email = registerForm.email;
         this.username = registerForm.username
         this.name = registerForm.name
      }else{
         this.email = '';
         this.username = '';
         this.name = ''; 
      }
      this.cvr = null;
      this.street = '';
      this.zipcode = '';
      this.city = '';
      this.phone = '';
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
}