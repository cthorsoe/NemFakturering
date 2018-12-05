import { FormControl } from "@angular/forms";

export class PasswordConfirmValidator {

   static getPasswordConfirmValidator() {
      return function PasswordConfirmValidator(control): { [s: string]: boolean } {
         var form = control.parent
         console.log('VALIDATING', control, form, (form != undefined ? form.controls['passwordConfirm'].touched : undefined));
         if(form == undefined || form.value['password'] == undefined || form.value['password'] != control.value){
            try {
               console.log(form.value, form.value['password'], control.value)
               return {
                  notMatching: true
               };
            } catch (error) {
               return {
                  notMatching: true
               };
            }
            
         }
         return null;
      }
   }
}
