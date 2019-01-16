import { Injectable } from '@angular/core';
import { AppDataService } from '../app-data.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../entities/invoice';
import { Observable } from 'rxjs';
import { Item } from '../../entities/item';
import { InvoicesLanguageService } from '../languages/invoices/invoices-language.service';
import * as moment from 'moment'
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import { Account } from '../../entities/account';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

   apiUrl:string = environment.apiUrl;
   pxToMmScaling = 0.2645833333;
   constructor(private dataService:AppDataService, private http:HttpClient, private invoiceLangService:InvoicesLanguageService) { 
   }

   setInvoices(){
      if(this.dataService.invoices == undefined){
         var observ = this.requestInvoice(this.dataService.account.id)
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

   saveInvoice(invoice:any, callback:any = undefined){
      if(this.dataService.account != undefined){
         const data = {
            accountId: this.dataService.account.id,
            invoice: invoice
         }
         console.log('SAVING INVOICE', this.apiUrl);
         var observ = this.http.post<any>(this.apiUrl + 'invoices/save/', data, { responseType:"json" });
         // this.dataService.customersObserv = observ;
         observ.subscribe((invoice: Invoice) => {
            console.log(invoice);
            if(this.dataService.invoices != undefined){
               this.dataService.invoices.push(invoice)
               this.dataService.invoicesSubject.next(this.dataService.invoices);
               
            }
            console.log('doing callback')
            if(callback != undefined){
               return callback(invoice)
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
      let taxPercentage = (account.configuration.taxpercentage / 100);
      const currentLang = this.invoiceLangService.langService.currentLang;
      let doc:jsPDF = new jsPDF();
      this.getLogo(account.configuration.hasLogo, environment.apiUrl + 'accounts/logo/' + account.id, (logo) => {
         console.log('GOT LOGO', logo)
         switch (account.configuration.invoicetemplate) {
            case 'BASIC':
               this.generateBasicInvoice(doc, invoice, account, logo, taxPercentage, currentLang);
               break;
            /* case 'STYLISH':
               this.generateStylishInvoice(doc, invoice, account, taxPercentage, currentLang);
               break; */
            case 'CLEAN':
               this.generateCleanInvoice(doc, invoice, account, logo, taxPercentage, currentLang);
               break;
            /* case 'FANCY':
               this.generateFancyInvoice(doc, invoice, account, taxPercentage, currentLang);
               break; */
            case 'DEFAULT':
            default:
               this.generateDefaultInvoice(doc, invoice, account, logo, taxPercentage, currentLang);
               break;
         }
         console.log('GENERATED INVOICE', doc)
         // Save the PDF
         doc.save('Invoice-' + invoice.invoicenumber + '.pdf');
      })
   }

   generateDefaultInvoice(doc:jsPDF, invoice:Invoice, account:Account, logo, taxPercentage:number, currentLang:string):jsPDF{
      console.log('GENERATING DEFAULT INVOICE')
      const xAxis = 15;
      let yAxis = 20;
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
      if(account.cvr && account.cvr.length > 0){
         this.addTextToPDF('CVR: ' + account.cvr, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
      }

      if(account.configuration.bankname != null && account.configuration.bankregnumber != null && account.configuration.bankaccountnumber != null){
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.bank[currentLang] + ': ' + account.configuration.bankname, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.regNumber[currentLang] + ': ' + account.configuration.bankregnumber, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.accountNumber[currentLang] + ': ' + account.configuration.bankaccountnumber, 
            doc, yAxis, xAxis, 'right', 11, 'normal');
         yAxis+= 5;
      }

      yAxis+= 5;
      this.addTextToPDF(this.invoiceLangService.invoiceNumber[currentLang] + ': ' + invoice.invoicenumber, 
         doc, yAxis, xAxis, 'right', 11, 'bold');
      yAxis+= 5;
      const invoiceDate = moment(invoice.createddate);
      this.addTextToPDF(this.invoiceLangService.invoiceDate[currentLang] + ': ' + invoiceDate.format('DD-MM-YYYY'), 
         doc, yAxis, xAxis, 'right', 11, 'bold');
      yAxis+= 5;
      this.addTextToPDF(this.invoiceLangService.paymentDue[currentLang] + ': ' + invoiceDate.add(account.configuration.paymentduedays, 'days').format('DD-MM-YYYY'),
         doc, yAxis, xAxis, 'right', 11, 'bold');

      this.addTextToPDF(this.invoiceLangService.invoice[currentLang],
         doc, yAxis, xAxis, 'left', 24, 'bold');
      let itemsColumns = [this.invoiceLangService.item[currentLang], this.invoiceLangService.amount[currentLang], this.invoiceLangService.pricePrUnit[currentLang], this.invoiceLangService.total[currentLang]]
      let items = [];
      let invoiceTotal:number = 0;
      // console.log('ITEMS', invoice.items)
      for (let i = 0; i < invoice.items.length; i++) {
         const item = invoice.items[i];
         if(typeof(item.id) == 'number' && item.id > 0){
            let itemPrice = item.price;
            let itemTotal = itemPrice * item.amount;
            if(account.configuration.usetaxes && account.configuration.itempricesincludetaxes){
               itemPrice = (itemPrice / (1 + taxPercentage))
               itemTotal = (itemTotal / (1 + taxPercentage))
            }
            console.log('ITEM TOTAL', itemTotal, itemPrice, item.amount)
            items.push([item.name, item.amount, itemPrice, itemTotal])
            invoiceTotal+= itemTotal;
         }
      }
      items.push(['', '', '', '']);
      if(!account.configuration.usetaxes){
         items.push(['', '', this.invoiceLangService.inTotal[currentLang], invoiceTotal]);
      }else{
         items.push(['', '', this.invoiceLangService.totalExclTaxes[currentLang], invoiceTotal]);
         let taxesTotal = invoiceTotal * taxPercentage
         items.push(['', '', this.invoiceLangService.taxesTotal[currentLang], taxesTotal]);
         let invoiceTotalInclTaxes = invoiceTotal + taxesTotal
         items.push(['', '', this.invoiceLangService.totalInclTaxes[currentLang], invoiceTotalInclTaxes]);
      }
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
   }

   generateBasicInvoice(doc:jsPDF, invoice:Invoice, account:Account, logo, taxPercentage:number, currentLang:string):jsPDF{
      console.log('GENERATING BASIC INVOICE')
      const xAxis = 15;
      let yAxis = 20;
      let innerPageWidth = doc.internal.pageSize.getWidth() - (xAxis * 2)
      doc.setTextColor('#444444')
      this.addTextToPDF(this.invoiceLangService.invoice[currentLang],
         doc, yAxis, xAxis, 'left', 24, 'normal');
      if(account.configuration.hasLogo){
         /* this.addTextToPDF('LOGO',
            doc, yAxis, xAxis, 'right', 24, 'normal'); */
         /* let width = 256;
         doc.addImage(logo, 'JPEG', xAxis, yAxis, width) */
         
         this.addLogoToPDF(doc, logo, xAxis, yAxis, 32, true);
      }
      yAxis += 30;

      this.addTextToPDF(this.invoiceLangService.from[currentLang], 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      this.addTextToPDF(this.invoiceLangService.for[currentLang], 
         doc, yAxis, 90, 'left', 9, 'normal');
      yAxis+= 7;
      this.addTextToPDF(account.name, 
         doc, yAxis, xAxis, 'left', 13, 'normal');
      this.addTextToPDF(invoice.customer.name, 
         doc, yAxis, 90, 'left', 13, 'normal');
      yAxis+= 7;
      this.addTextToPDF(account.street, 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      this.addTextToPDF(invoice.customer.contactperson, 
         doc, yAxis, 90, 'left', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(account.zipcode + " " + account.city, 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      this.addTextToPDF(invoice.customer.street, 
         doc, yAxis, 90, 'left', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(account.phone, 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      this.addTextToPDF(invoice.customer.zipcode + " " + invoice.customer.city, 
         doc, yAxis, 90, 'left', 9, 'normal');
      yAxis+= 5;
      if(account.cvr && account.cvr.length > 0){
         this.addTextToPDF('CVR: ' + account.cvr, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
      }
      yAxis+= 5;
      // this.addBoxToPDF(doc, innerPageWidth, .5, xAxis, yAxis, true, false)
      doc.setFillColor('#cecece')
      doc.rect(xAxis - 1, yAxis, innerPageWidth + 2, .5, 'F')
      yAxis+= 10;
      this.addTextToPDF(this.invoiceLangService.invoiceNumber[currentLang] + ': ' + invoice.invoicenumber, 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      yAxis+= 5;
      const invoiceDate = moment(invoice.createddate);
      this.addTextToPDF(this.invoiceLangService.invoiceDate[currentLang] + ': ' + invoiceDate.format('DD-MM-YYYY'), 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(this.invoiceLangService.paymentDue[currentLang] + ': ' + invoiceDate.add(account.configuration.paymentduedays, 'days').format('DD-MM-YYYY'),
         doc, yAxis, xAxis, 'left', 9, 'normal');

      let itemsColumns = [this.invoiceLangService.item[currentLang], this.invoiceLangService.amount[currentLang], this.invoiceLangService.pricePrUnit[currentLang], this.invoiceLangService.total[currentLang]]
      let items = [];
      let invoiceTotal:number = 0;
      // console.log('ITEMS', invoice.items)
      for (let i = 0; i < invoice.items.length; i++) {
         const item = invoice.items[i];
         if(typeof(item.id) == 'number' && item.id > 0){
            let itemPrice = item.price;
            let itemTotal = itemPrice * item.amount;
            if(account.configuration.usetaxes && account.configuration.itempricesincludetaxes){
               itemPrice = (itemPrice / (1 + taxPercentage))
               itemTotal = (itemTotal / (1 + taxPercentage))
            }
            console.log('ITEM TOTAL', itemTotal, itemPrice, item.amount)
            items.push([item.name, item.amount, itemPrice, itemTotal])
            invoiceTotal+= itemTotal;
         }
      }
      if(!account.configuration.usetaxes){
         items.push(['', '', this.invoiceLangService.inTotal[currentLang], invoiceTotal]);
      }else{
         items.push(['', '', this.invoiceLangService.totalExclTaxes[currentLang], invoiceTotal]);
         let taxesTotal = invoiceTotal * taxPercentage
         items.push(['', '', this.invoiceLangService.taxesTotal[currentLang], taxesTotal]);
         let invoiceTotalInclTaxes = invoiceTotal + taxesTotal
         items.push(['', '', this.invoiceLangService.totalInclTaxes[currentLang], invoiceTotalInclTaxes]);
      }
      yAxis += 8;
      doc.autoTable(itemsColumns, items, {
         theme: 'plain',
         headerStyles: {
            fillColor: '#008cba',
            textColor: '#ffffff',
            lineWidth:0,
         },
         styles : {
            textColor:'#444444',
            fontSize:9
         },
         startY: yAxis,
         drawRow: function(row, data) {
            if(row.index == (items.length - 3)){
               console.log('FIRST LINE', row)
               doc.setFillColor('#008cba')
               doc.rect(xAxis - 1, (row.y), innerPageWidth + 2, .5, 'F')
            }else if(row.index == (items.length - 1)){
               console.log('SECOND LINE', row)
               doc.setFillColor('#008cba')
               doc.rect(xAxis - 1, (row.y), innerPageWidth + 2, .5, 'F')
            }
         }
      });
      yAxis = doc.autoTable.previous.finalY + 10;
      doc.setFillColor('#cecece')
      doc.rect(xAxis - 1, yAxis, innerPageWidth + 2, .5, 'F')
      yAxis +=10;
      
      doc.setTextColor('#444444')
      this.addTextToPDF(this.invoiceLangService.notes[currentLang], 
         doc, yAxis, xAxis, 'left', 11, 'normal');
      if(account.configuration.bankname != null && account.configuration.bankregnumber != null && account.configuration.bankaccountnumber != null){
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.bank[currentLang] + ': ' + account.configuration.bankname, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.regNumber[currentLang] + ': ' + account.configuration.bankregnumber, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.accountNumber[currentLang] + ': ' + account.configuration.bankaccountnumber, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
      }
   }

   generateStylishInvoice(doc:jsPDF, invoice:Invoice, account:Account, logo, taxPercentage:number, currentLang:string):jsPDF{
      console.log('GENERATING STYLISH INVOICE')
      /*const xAxis = 15;
      let yAxis = 20;*/

      // NOT IMPLEMENTED
   }
   


   generateCleanInvoice(doc:jsPDF, invoice:Invoice, account:Account, logo, taxPercentage:number, currentLang:string):jsPDF{
      console.log('GENERATING CLEAN INVOICE')
      const xAxis = 15;
      let yAxis = 15;
      let innerPageWidth = doc.internal.pageSize.getWidth() - (xAxis * 2)
      const invoiceDate = moment(invoice.createddate);
      
      doc.setFillColor('#fafafa')
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 100, 'F')
      if(account.configuration.hasLogo){
         this.addLogoToPDF(doc, logo, xAxis, yAxis, 32);
      }
      yAxis += 5;
      doc.setTextColor('#777777')
      this.addTextToPDF(account.name.toUpperCase(), 
         doc, yAxis, xAxis, 'right', 9, 'normal');
         yAxis+= 5;
      this.addTextToPDF(account.street, 
         doc, yAxis, xAxis, 'right', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(account.zipcode + " " + account.city, 
         doc, yAxis, xAxis, 'right', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(account.phone, 
         doc, yAxis, xAxis, 'right', 9, 'normal');
      yAxis+= 5;
      if(account.cvr && account.cvr.length > 0){
         this.addTextToPDF('CVR: ' + account.cvr, 
         doc, yAxis, xAxis, 'right', 9, 'normal');
         yAxis+= 5;
      }
      yAxis+= 20;

      
      doc.setTextColor('#111111')
      this.addTextToPDF(this.invoiceLangService.receipent[currentLang].toUpperCase(), 
         doc, yAxis, xAxis, 'left', 9, 'bold');
      this.addTextToPDF(this.invoiceLangService.invoice[currentLang], 
         doc, yAxis, xAxis, 'right', 24, 'bold');
      yAxis+= 10;
      this.addTextToPDF(this.invoiceLangService.invoiceNumber[currentLang].toUpperCase(), 
         doc, yAxis, xAxis, 'right', 9, 'bold');
      doc.setTextColor('#777777')
      this.addTextToPDF(invoice.customer.name.toUpperCase(), 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(invoice.invoicenumber, 
         doc, yAxis, xAxis, 'right', 9, 'normal');
      // if(invoice.customer.contactperson && invoice.customer.contactperson.length > 0){
         this.addTextToPDF(invoice.customer.contactperson, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
      // }
      yAxis+= 5;
      this.addTextToPDF(invoice.customer.street, 
         doc, yAxis, xAxis, 'left', 9, 'normal');
      yAxis+= 5;
      this.addTextToPDF(invoice.customer.zipcode + " " + invoice.customer.city, 
      doc, yAxis, xAxis, 'left', 9, 'normal');
      doc.setTextColor('#111111')
      this.addTextToPDF(this.invoiceLangService.invoiceDate[currentLang].toUpperCase(), 
         doc, yAxis, xAxis, 'right', 9, 'bold');
      doc.setTextColor('#777777')
      yAxis+= 5;
      this.addTextToPDF(invoiceDate.format('DD-MM-YYYY'), 
         doc, yAxis, xAxis, 'right', 9, 'normal');
      yAxis+= 5;

      let itemsColumns = [this.invoiceLangService.item[currentLang].toUpperCase(), this.invoiceLangService.amount[currentLang].toUpperCase(), this.invoiceLangService.pricePrUnit[currentLang].toUpperCase(), this.invoiceLangService.total[currentLang].toUpperCase()]
      let items = [];
      let invoiceTotal:number = 0;
      // console.log('ITEMS', invoice.items)
      for (let i = 0; i < invoice.items.length; i++) {
         const item = invoice.items[i];
         if(typeof(item.id) == 'number' && item.id > 0){
            let itemPrice = item.price;
            let itemTotal = itemPrice * item.amount;
            if(account.configuration.usetaxes && account.configuration.itempricesincludetaxes){
               itemPrice = (itemPrice / (1 + taxPercentage))
               itemTotal = (itemTotal / (1 + taxPercentage))
            }
            console.log('ITEM TOTAL', itemTotal, itemPrice, item.amount)
            items.push([item.name, item.amount, itemPrice, itemTotal])
            invoiceTotal+= itemTotal;
         }
      }
      if(!account.configuration.usetaxes){
         items.push(['', '', this.invoiceLangService.inTotal[currentLang], invoiceTotal]);
      }else{
         items.push(['', '', this.invoiceLangService.totalExclTaxes[currentLang], invoiceTotal]);
         let taxesTotal = invoiceTotal * taxPercentage
         items.push(['', '', this.invoiceLangService.taxesTotal[currentLang], taxesTotal]);
         let invoiceTotalInclTaxes = invoiceTotal + taxesTotal
         items.push(['', '', this.invoiceLangService.totalInclTaxes[currentLang], invoiceTotalInclTaxes]);
      }
      yAxis += 15;
      doc.autoTable(itemsColumns, items, {
         theme: 'plain',
         headerStyles: {
            fillColor: '#ffffff',
            textColor: '#999999',
            lineWidth:0,
            fontSize:8,
            cellPadding:{ top: 5, right: 0, bottom: 5, left: 0 }
         },
         styles : {
            textColor:'#777777',
            fontSize:8,
            cellPadding:{ top: 3.5, right: 0, bottom: 3.5, left: 0 }
         },
         startY: yAxis,
         drawRow: function(row, data) {
            console.log('DRAWING ROW', row);
            doc.setFillColor('#eaeaea');
            if(row.index < items.length - 1){
               doc.rect(xAxis - 1, (row.y + row.height), innerPageWidth + 2, .5, 'F');
            }
         }
      });
      yAxis = doc.autoTable.previous.finalY + 10;
      
      doc.setTextColor('#111111')
      this.addTextToPDF(this.invoiceLangService.notes[currentLang].toUpperCase(), 
         doc, yAxis, xAxis, 'left', 9, 'bold');
      yAxis+= 10;
      doc.setTextColor('#777777')
      if(account.configuration.bankname != null && account.configuration.bankregnumber != null && account.configuration.bankaccountnumber != null){
         
         this.addTextToPDF(this.invoiceLangService.bank[currentLang] + ': ' + account.configuration.bankname, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.regNumber[currentLang] + ': ' + account.configuration.bankregnumber, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
         this.addTextToPDF(this.invoiceLangService.accountNumber[currentLang] + ': ' + account.configuration.bankaccountnumber, 
            doc, yAxis, xAxis, 'left', 9, 'normal');
         yAxis+= 5;
      }
   }
   
   generateFancyInvoice(doc:jsPDF, invoice:Invoice, account:Account, logo, taxPercentage:number, currentLang:string):jsPDF{
      console.log('GENERATING FANCY INVOICE')
      /*const xAxis = 15;
      let yAxis = 20;*/

      // NOT IMPLEMENTED
   }

   addLogoToPDF(doc:jsPDF, logo, xAxis:number, yAxis:number, height:number, leftAlign:boolean = false){
      const origHeight = logo.height;
      const scaling = height / origHeight
      let width = logo.width * scaling
      const maxWidth = logo.width * this.pxToMmScaling
      if(width > maxWidth){
         const maxHeight = logo.height * this.pxToMmScaling
         width = maxWidth
         height = maxHeight
      }
      if(leftAlign){
         let origXAxis = xAxis
         xAxis = (doc.internal.pageSize.getWidth() - origXAxis) - width
      }
      doc.addImage(logo, 'PNG', xAxis, yAxis, width, height)
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

   // addBoxToPDF(doc, width:number, height:number, xAxis:number, yAxis:number, fill:boolean, stroke:boolean){
   //    let style = 'F';
   //    if(fill && stroke){
   //       style += 'FD';
   //    }else if(stroke){
   //       style = 'S';
   //    }
   //    doc.rect(xAxis, yAxis, width, height, style)
   // }

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

   getLogo(hasLogo:boolean, url:string, callback){
      if(!hasLogo){
         callback(undefined)
      }
      var img = new Image();
      img.onload = function() {
         console.log('WH', img.width, img.height)
         callback(img);
      };
      img.crossOrigin = 'Anonymous'
      img.src = url;
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
