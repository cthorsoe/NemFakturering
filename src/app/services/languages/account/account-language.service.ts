import { Injectable } from '@angular/core';
import { LanguageService } from '../../language.service';
import { LanguageString } from '../../../entities/language-string';

@Injectable({
  providedIn: 'root'
})
export class AccountLanguageService {
   register:LanguageString = new LanguageString('Register', 'Registrer');
   signIn:LanguageString = new LanguageString('Sign in', 'Log ind');
   email:LanguageString = new LanguageString('E-mail', 'E-mail');
   emailRequired:LanguageString = new LanguageString('You have to fill an e-mail', 'Du skal udfylde en email adresse');
   emailNotValid:LanguageString = new LanguageString('You inserted e-mail is not valid. Please check again', 'Den indtastede email adresse er ikke korrekt. Tjek venligst igen.');
   username:LanguageString = new LanguageString('Username', 'Brugernavn');
   usernameRequired:LanguageString = new LanguageString('You have to fill a username', 'Du skal udfylde et brugernaavn');
   name:LanguageString = new LanguageString('Name', 'Navn');
   nameRequired:LanguageString = new LanguageString('You have to fill a name (Company name or personal name)', 'Du skal udfylde et navn (Firmanavn eller personligt navn)');
   password:LanguageString = new LanguageString('Password', 'Password');
   passwordRequired:LanguageString = new LanguageString('You have to fill a password', 'Du skal udfylde et password');
   passwordConfirm:LanguageString = new LanguageString('Password', 'Password');
   passwordConfirmRequired:LanguageString = new LanguageString('Please type your password again', 'Indtast venligst dit password igen');
   passwordsNotMatching:LanguageString = new LanguageString('The passwords is not matching', 'De to passwords er ikke ens');
   alreadyHaveAnAccount:LanguageString = new LanguageString('Already have an account', 'Har du allerede en konto');
   logInHere:LanguageString = new LanguageString('Log in here', 'Log ind her');
   
   dontHaveAnAccount:LanguageString = new LanguageString('Don\'t have an account', 'Har du ingen konto endnu');
   registerHere:LanguageString = new LanguageString('Register here', 'Opret dig her');
   loginFailed:LanguageString = new LanguageString('The login-information was not correct. Try again.', 'Login-informationerne var ikke korrekte. Prøv igen.');
   notVerified:LanguageString = new LanguageString('Your account has not been verified. Please check your email', 'Din konto er ikke blevet verificeret. Check din email.');
   accountCreatedSuccess:LanguageString = new LanguageString('The account has been created successfully. You can now login using your new account.', 'Kontoen blev oprettet successfuldt. Du kan ku logge ind med din nye account.');
   usernameOrEmailTaken:LanguageString = new LanguageString('The username and/or email is already taken. Try something else.', 'Brugernavnet eller emailen er allerede taget. Prøv noget andet.');
   invalidEmail:LanguageString = new LanguageString('The email is invalid. Please verify the email and try again.', 'Emailen er invalid. Venligst verificer emailen og prøv igen.');
   submitError:LanguageString = new LanguageString('An error occured. Please try again later.', 'Der opstod en fejl. Venligst prøv igen senere.');

   constructor(public langService:LanguageService) { }
}
