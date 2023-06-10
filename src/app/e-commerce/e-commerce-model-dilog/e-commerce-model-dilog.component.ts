import { NotificationServiceService } from './../../services/notification-service.service';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-e-commerce-model-dilog',
  templateUrl: './e-commerce-model-dilog.component.html',
  styleUrls: ['./e-commerce-model-dilog.component.css'],
})
export class ECommerceModelDilogComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('closeBtn1') closeBtn1!: ElementRef;
  productId: any = '';
  result: any = '';
  result2: any = '';
  clicked: any = '';
  count: any = '';
  isLoading = false;
  rupee_sym: any;

  removeToCart: FormGroup = new FormGroup({});
  url: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private comm_ser: CommonService,
    private Notification: NotificationServiceService
  ) {
    this.url = this.route.url;
    this.rupee_sym = this.comm_ser.rupee_symbol;
  }
  ngAfterViewInit(): void {
    
  }

  ProductValue(value: any) {
    console.log(value);
    this.productId = '';
    this.productId = value;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userData.getLocation();

      this.userData.getCart().subscribe(
        (response) => {
          
          this.result = 'Data not found';
          
        },
        (error) => {
          let errors = error.error;
          

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.userData.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result2 = a.data;
                
              } else {
                this.result = a.message;
                
              }
            } else {
              this.result = a.message;
              
            }
          } else {
            let b = this.userData.get(errors);
            
            this.result = b.message;
            
          }
        }
      );
    }
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  productIds(value: any) {
    $("#CartConfirmation").hide();
    $("#cartModal").hide();
    this.isLoading = true;

    this.userData.removeProductCart(value).subscribe(
      (response) => {
        console.log(response);

        
        this.result = 'Data not found';
        
        this.isLoading = false
      },
      (error) => {
        let errors = error.error;
        

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false
              this.closeModal();
              this.closeModal1();
              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route.onSameUrlNavigation = 'reload';
              this.route.navigateByUrl(this.url);
              this.comm_ser.setRemoveCartCount();
              this.result = a.message;
              this.Notification.showSuccess(this.result, '');
            } else {
              this.isLoading = false
              this.result = a.message;
              this.Notification.showError(this.result, '');

            }
          } else {
            this.isLoading = false
            this.result = a.message;
            this.Notification.showError(this.result, '');

          }
        } else {
          this.isLoading = false
          let b = this.userData.get(errors);
          this.result = b.message;
          this.Notification.showError(this.result, '');
          
        }
      }
    );
  }
}
