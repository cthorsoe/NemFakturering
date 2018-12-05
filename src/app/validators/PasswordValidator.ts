import { FormControl } from "@angular/forms";

export class PasswordValidator {

   static getPasswordValidator() {
      return function PasswordValidator(control): { [s: string]: boolean } {
         var form = control.parent
         if(form){
            var pwConfirm = form.controls['passwordConfirm'];
            if(pwConfirm && pwConfirm.touched && pwConfirm.value != control.value){
               return {
                  notMatching: true
               };
            }
         }
         return null;
      }
   }
}
