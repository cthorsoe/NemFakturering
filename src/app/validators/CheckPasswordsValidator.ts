import { FormGroup } from "@angular/forms";

export class CheckPasswordsValidator {

   static getCheckPasswordsValidator() {
      return function CheckPasswordsValidator(form: FormGroup) {
         let password = form.controls.password.value;
         let passwordConfirm = form.controls.passwordConfirm.value;
         return password === passwordConfirm ? null : { notMatching: true };     
      }
   }
}
