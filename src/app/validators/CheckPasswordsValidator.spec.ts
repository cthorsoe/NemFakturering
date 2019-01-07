import { TestBed, async } from '@angular/core/testing';
import { CheckPasswordsValidator } from './CheckPasswordsValidator';
import { FormGroup, FormControl } from "@angular/forms";

describe('CheckPasswordsValidator', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [
            CheckPasswordsValidator
         ],
      });
   });

   describe('Test CheckPasswordsValidator', () => {
      let validator = new CheckPasswordsValidator();
      let form = new FormGroup({
         password: new FormControl(),
         passwordConfirm: new FormControl()
      })
      it('Should not be matching', () => {
         form.controls.password.setValue('password');
         form.controls.passwordConfirm.setValue('1234');
         let result = validator.CheckPasswordsTest(form)
         expect(result == null).toBe(false)
         expect(result.notMatching).toBe(true);
      });
      it('Should be matching', () => {
         form.controls.passwordConfirm.setValue('password');
         let result = validator.CheckPasswordsTest(form)
         expect(result == null).toBe(true)
      });
   });
});
