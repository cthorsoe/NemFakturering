import { AppPage, Login, Register } from './app.po';
import { browser, by, element } from 'protractor';

let username:string = 'e2etest' + new Date().getTime();
let password:string = 'password';

describe('Register user and login', () => {
   let page: AppPage;
   let login:Login = new Login();
   let register:Register = new Register();
   
   beforeEach(() => {
      page = new AppPage();
      
   });

   it('1.0: Navigate to register', async() => {
      register.navigateToRegisterPage();
   });

   it('1.1: Fill form and submit', async() => {
      register.registerUser(username, password);
   });

   it('1.2: Login with the user just created', async() => { 
      login.logIn(username, password, true);
   });
});
 