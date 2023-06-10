import { NotificationServiceService } from './../../services/notification-service.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  result: any = '';
  result2: any = '';
  result3: any = '';
  clicked: any = '';
  isLoading = false;
  orderIdValue: any = '';

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private Notification: NotificationServiceService
  ) {}

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  orderIds1(value: any) {
    
    this.orderIdValue = '';
    this.orderIdValue = value;
  }

  ngOnInit(): void {
    this.viewOrders();
  }

  viewOrders() {
    this.isLoading = true;
    this.userData.myOrders().subscribe(
      (response) => {
        
        this.result = 'Data not found';
        this.isLoading = false;
        
      },
      (error) => {
        let errors = error.error;
        
        console.log("ErrorMyOrder",error)
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);
        
          console.log("Decrypted A My Order",a)
          if (error.error.text) {
            if (a.status === 'Success') {
        
              this.isLoading = false;
              this.result2 = a.data.myOrders;
            } else {
              this.isLoading = false;
              this.result = a.message;
        
            }
          } else {
            this.isLoading = false;
            this.result = a.message;
        
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
        
          this.result = b.message;
        
        }
      }
    );
  }

  orderIds(data: any) {
    
    this.isLoading = true;
    this.userData.orderIds(data).subscribe(
      (response) => {
        
        this.result = 'Data not found';
        this.isLoading = false;
        
      },
      (error) => {
        let errors = error.error;
        

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);
          

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.closeModal();
              this.result3 = a.message;
              this.Notification.showSuccess(this.result3, '');
              this.ngOnInit();
            } else {
              this.isLoading = false;
              this.result3 = a.message;
              this.Notification.showError(this.result3, '');
             
            }
          } else {
            this.isLoading = false;
            this.result3 = a.message;
            this.Notification.showError(this.result3, '');
            
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
          
          this.result3 = b.message;
          this.Notification.showError(this.result3, '');
          
        }
      }
    );
  }

  orderTracking(data: any)
  {
    
    this.isLoading = true;
    this.userData.orderTracking(data).subscribe(
      (response) => {
    
        this.result = 'Data not found';
        this.isLoading = false;
    
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);
    

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.closeModal();
              this.result3 = a.data;
              console.log(this.result3);
              
            } else {
              this.isLoading = false;
              this.result3 = a.message;
              this.Notification.showError(this.result3, '');
              
            }
          } else {
            this.isLoading = false;
            this.result3 = a.message;
            this.Notification.showError(this.result3, '');
            
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
          
          this.result3 = b.message;
          this.Notification.showError(this.result3, '');
          
        }
      }
    );
  }

  receiptOrderIds(value: any) {
    this.userData.downloadRechargePdf(value).subscribe(
      (response: any) => {
        this.result = 'Data not found';
      },
      (error: any) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result3 = a.data.receiptURL;
              var FileSaver = require('file-saver');
              var blob = new Blob([this.result3], {
                type: 'text/pdf;charset=utf-8',
              });
              FileSaver.saveAs(blob, 'Receipt.pdf');
          
            } else {
              this.result2 = a.message;
            }
          } else {
            this.result2 = a.message;
          }
        } else {
          let b = this.userData.get(errors);

          this.result2 = b.message;
        }
      }
    );
  }
}
