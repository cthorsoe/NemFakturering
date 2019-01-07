import { browser, by, element } from 'protractor';

export class AppPage {
   navigateTo(url:string = '/') {
      return browser.get(url);
   }

   getParagraphText() {
      return element(by.css('app-root h1')).getText();
   }
}

export class Login {
   page: AppPage = new AppPage();
   logIn(username = 'cthorsoe', password = '1234', sleep:boolean = false){
      this.page.navigateTo('/account/login');
      element(by.id('txtLoginUserName')).sendKeys(username);
      element(by.id('txtLoginPassword')).sendKeys(password);
      if(sleep){
         browser.sleep(2000);
      }
      element(by.id('btnLogIn')).click().then(() => {
         browser.sleep(2000);
         expect(browser.getCurrentUrl()).toContain('/app/dashboard');
      });
   }

   logOut(){
      expect(element(by.id('navbarDropdown')).isPresent()).toBeTruthy();
      element(by.id('navbarDropdown')).click().then(() => {
         element(by.id('btnLogoutLink')).click().then(() => {
            expect(browser.getCurrentUrl()).toContain('/');
         });
      });
   }
}

export class Register {
   navigateToRegisterPage(){
      expect(element(by.id('btnRegisterLink')).isPresent()).toBeTruthy();
      element(by.id('btnRegisterLink')).click().then(() => {
         expect(browser.getCurrentUrl()).toContain('/account/register');
      });
   }
   
   registerUser(username:string, password:string){
      element(by.id('txtRegisterEmail')).sendKeys(username + '@e2eaccount.test');
      element(by.id('txtRegisterUserName')).sendKeys(username);
      element(by.id('txtRegisterName')).sendKeys('E2E TEST ACCOUNT');
      element(by.id('txtRegisterPassword')).sendKeys(password);
      element(by.id('txtRegisterPasswordConfirm')).sendKeys(password);
      expect(element(by.id('frmRegister')).getAttribute('class')).toContain('ng-valid');
      browser.sleep(2000);
      element(by.id('frmRegister')).submit().then(() => {
         browser.sleep(2000);
         expect(element(by.id('alertAccountCreated')).isPresent()).toBeTruthy();
      });
   }
}
