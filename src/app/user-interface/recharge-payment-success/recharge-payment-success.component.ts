import { Component, OnInit } from '@angular/core';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-recharge-payment-success',
  templateUrl: './recharge-payment-success.component.html',
  styleUrls: ['./recharge-payment-success.component.css'],
})
export class RechargePaymentSuccessComponent implements OnInit {
  orderId: any;
  result: any;
  result1: any;
  result2: any;
  result3: any;
  constructor(private userData1: RechargeApiServicesService) {}

  ngOnInit(): void {
    this.orderId = this.userData1.getOrderId();


    this.userData1.rechargeDetails(this.orderId).subscribe(
      (response: any) => {
        this.result = 'Data not found';
      },
      (error: any) => {
        let errors = error.error;


        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData1.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result = a.data;
            } else {
              this.result2 = a.message;
            }
          } else {
            this.result2 = a.message;
          }
        } else {
          let b = this.userData1.get(errors);

          this.result2 = b.message;
        }
      }
    );

    //this.downloadRechargePdf();
  }

  downloadRechargePdf()
  {
    this.userData1.downloadRechargePdf(this.orderId).subscribe(
      (response: any) => {
        this.result = 'Data not found';
      },
      (error: any) => {
        let errors = error.error;


        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData1.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              
              this.result3 = a.data.receiptURL;
              var FileSaver = require('file-saver');
              var blob = new Blob([this.result3], {type: "text/pdf;charset=utf-8"});
              FileSaver.saveAs(blob, 'Receipt.pdf');
              /* const url = window.URL.createObjectURL(this.result3);
              window.location.href = error.url; */
            } else {
              this.result2 = a.message;
            }
          } else {
            this.result2 = a.message;
          }
        } else {
          let b = this.userData1.get(errors);

          this.result2 = b.message;
        }
      }
    );
  }
}
