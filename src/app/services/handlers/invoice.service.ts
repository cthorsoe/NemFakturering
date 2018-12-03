import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../entities/invoice';
import { Observable } from 'rxjs';
import { Item } from '../../entities/item';
import * as moment from 'moment'
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

   apiUrl:string = environment.apiUrl;
   constructor(private dataService:AppDataService, private http:HttpClient) { 
   }

   setInvoices(){
      if(this.dataService.invoices == undefined){
         var observ = this.requestInvoice(6 /*this.dataService.account.id*/)
         observ.subscribe((invoices: Invoice[]) => {
            this.dataService.invoices = invoices;
            this.dataService.invoicesSubject.next(invoices);
         });
      }else{
         this.dataService.invoicesSubject.next(this.dataService.invoices);
      }
   }
   
   requestInvoice(accountId:number) : Observable<Invoice[]>{
      var observ = this.http.get<Invoice[]>(this.apiUrl + 'invoices/list/' + accountId);
      return observ;
   }

   saveInvoice(invoice:any){
      if(this.dataService.account != undefined){
         const data = {
            accountId: 6 /* this.dataService.account.id */,
            invoice: invoice
         }
         console.log('SAVING INVOICE');
         var observ = this.http.post<any>(this.apiUrl + 'invoices/save/', data, { responseType:"json" });
         // this.dataService.customersObserv = observ;
         observ.subscribe((invoice: Invoice) => {
            console.log(invoice);
            if(this.dataService.invoices != undefined){
               this.dataService.invoices.push(invoice)
               this.dataService.invoicesSubject.next(this.dataService.invoices);
            }
         });
      }
   }

   createInvoiceFromForm(data:any){
      var invoice = this.convertFormToInvoice(data);
      if(invoice != null){
         this.generateInvoice(invoice)
      }
   }

   generateInvoice(invoice:Invoice){
      let account = this.dataService.account;
      const xAxis = 15;
      let yAxis = 20;
      var doc = new jsPDF();
      this.addTextToPDF(invoice.customer.name, 
         doc, yAxis, xAxis, 'left', 11, 'bold');
      this.addTextToPDF(account.name, 
         doc, yAxis, xAxis, 'right', 11, 'bold');
      yAxis+= 5;
      this.addTextToPDF(invoice.customer.contactperson, 
         doc, yAxis, xAxis, 'left', 11, 'normal');
      this.addTextToPDF(account.street, 
         doc, yAxis, xAxis, 'right', 11, 'normal');
      yAxis+= 5;
      this.addTextToPDF(invoice.customer.street, 
         doc, yAxis, xAxis, 'left', 11, 'normal');
      this.addTextToPDF(account.zipcode + " " + account.city, 
         doc, yAxis, xAxis, 'right', 11, 'normal');
      yAxis+= 5;
      this.addTextToPDF(invoice.customer.zipcode + " " + invoice.customer.city, 
         doc, yAxis, xAxis, 'left', 11, 'normal');
      this.addTextToPDF(account.phone, 
         doc, yAxis, xAxis, 'right', 11, 'normal');
      yAxis+= 5;
      if(account.cvr != null){
         this.addTextToPDF('CVR: ' + account.cvr, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
      }

      if(account.configuration.bankname != null && account.configuration.bankregnumber != null && account.configuration.bankaccountnumber != null){
         yAxis+= 5;
         this.addTextToPDF('Bank: ' + account.configuration.bankname, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
         this.addTextToPDF('Reg nr: ' + account.configuration.bankregnumber, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
         this.addTextToPDF('Kontonr: ' + account.configuration.bankaccountnumber, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
      }

      yAxis+= 5;
      this.addTextToPDF('Faktura nr.: ' + invoice.invoicenumber, 
         doc, yAxis, xAxis, 'right', 11, 'bold');
         yAxis+= 5;
      this.addTextToPDF('Fakturadato: ' + moment().format('DD-MM-YYYY'), 
         doc, yAxis, xAxis, 'right', 11, 'bold');
         yAxis+= 5;
      this.addTextToPDF('Seneste betalingsdato: ' + moment().add(14, 'days').format('DD-MM-YYYY'),
         doc, yAxis, xAxis, 'right', 11, 'bold');

      this.addTextToPDF('Faktura',
         doc, yAxis, xAxis, 'left', 24, 'bold');
      let itemsColumns = ['Vare', 'Antal', 'Pris pr. stk', 'Samlet']
      let items = [];
      let invoiceTotal:number = 0;
      // console.log('ITEMS', invoice.items)
      for (let i = 0; i < invoice.items.length; i++) {
         const item = invoice.items[i];
         if(typeof(item.id) == 'number' && item.id > 0){
            const itemTotal = item.price * item.amount;
            items.push([item.name, item.amount, item.price, itemTotal])
            invoiceTotal+= itemTotal;
         }
      }
      items.push(['', '', 'I alt', invoiceTotal]);
      yAxis += 8;
      doc.autoTable(itemsColumns, items, {
         theme: 'grid',
         headerStyles: {
            fillColor: 255,
            textColor: 20,
            lineWidth:0.1,
            lineColor:200,

         },
         startY: yAxis
      });

      // Save the PDF
      doc.save('Invoice-' + invoice.invoicenumber + '.pdf');
   }

   addTextToPDF(text:string, doc, yAxis, xAxis, alignment, size, style){
      console.log('ADDING TEXT', text)
      const availableStyles = ['normal', 'bold', 'italic', 'bolditalic'];
      let textWidth = 0;
      let textOffset = 0;
      if(availableStyles.indexOf(style) == -1) style = 'normal';
      
      doc.setFontStyle(style)
      doc.setFontSize(size)
      // console.log(doc.getStringUnitWidth(text), size, doc.internal.scaleFactor, doc.internal.pageSize.getWidth());
      switch (alignment) {
         case 'center':
            textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            textOffset = (doc.internal.pageSize.getWidth() - textWidth) / 2;
            doc.text(textOffset, yAxis, text);
            break;
         case 'right':
            textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            textOffset = (doc.internal.pageSize.getWidth() - textWidth) - xAxis;
            doc.text(textOffset, yAxis, text);
            break;
         default:
            doc.text(xAxis, yAxis, text);
            break;
      }
   }

   convertFormToInvoice(data):Invoice{
      //let account = this.dataService.account;
      let customer = this.dataService.customers.find(x => x.id == data.customerId);
      if(customer != null){
         var invoice:Invoice = new Invoice();
         invoice.customer = customer;
         invoice.createddate = new Date();
         invoice.remarks = /*data.remarks*/'';
         invoice.totalpercentagediscount = /*data.totaldiscount*/0;
         invoice.totalprice = null;
         invoice.items = data.items as Item[]
         return invoice;
      }
      return null;
   }

   // setAccount(){
   //    //TODO: Implement HTTP Request to Server
   //    this.dataService.account = new Account();
   //    this.dataService.account.id = 1;
   //    this.dataService.account.name = "Nem Fakturering";
   //    this.dataService.account.cvr = "123456789";
   //    this.dataService.account.street = "Valby Maskinfabriksvej 17, 3. 2";
   //    this.dataService.account.zipcode = "2500";
   //    this.dataService.account.city = "Valby";
   //    this.dataService.account.email = "christian@thorsoe.dk";
   //    this.dataService.account.phone = "20283907";
   // }

   // getAccount(){
   //    if(this.dataService.account == undefined){
   //       this.setAccount();
   //    }
   //    return this.dataService.account;
   // }
}
