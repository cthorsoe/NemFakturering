import { AppPage } from './app.po';
import { browser} from 'protractor';

describe('workspace-project App', () => {
   let page: AppPage;

   beforeEach(() => {
      page = new AppPage();
   });

   // it('should display welcome message', () => {
   //    page.navigateTo('/home')
   //    expect(page.getParagraphText()).toEqual('Welcome to nem-fakturering-frontend!');
   // });
   
   it('Allow test runner to have some time to open test website', () => {
      page.navigateTo('/')
      browser.sleep(5000);
   });
});
