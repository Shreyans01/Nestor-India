import { NotificationServiceService } from './../../services/notification-service.service';
import { AfterViewInit, ElementRef, ViewChild,ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { HomeComponent } from '../home/home.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  result: any = '';
  result2: any = '';
  result5: any = '';
  clicked: any = '';
  isLoading = false;
  rupee_sym: any;
  url: any;
  productId: any = '';

  removeToCart: FormGroup = new FormGroup({});
  login: boolean;
  openLoginModal: boolean =false;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private comm_ser: CommonService,
    private Notification: NotificationServiceService,
    private cdr: ChangeDetectorRef
  ) {
    this.url = this.route.url;
    this.rupee_sym = this.comm_ser.rupee_symbol;
  }
  ngAfterViewInit(): void {
    this.ngOnInit();
    let hello = this.comm_ser.getCartCount();
    
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  ngOnInit(): void {
    if(localStorage.getItem("user")){
      this.login = true;
    }else {
      this.login = false;
      
    }
    this.userData.getLocation();
    if(localStorage.getItem("user")) {
      this.getCart();
    }
    else {
      var items;
      if(localStorage.getItem("items")){
        items = localStorage.getItem("items")
      }
      if(items){
        this.result2 = JSON.parse(items)

      }
    }
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  getCart() {
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
        
              if (a.data) {
                this.result2 = a.data;
              }
        
            } else {
              this.result5 = a.message;
              this.ngOnInit();
        
            }
          } else {
            this.result5 = a.message;
        
          }
        } else {
          let b = this.userData.get(errors);
        
          this.result5 = b.message;
        
        }
      }
    );
  }

  increase(id: any, quentity: any, value: any) {
    if (value >= 1) {
      const payload = {
        productId: id,
        qty: quentity
      };
      this.userData.addProductCart(payload).subscribe(
        (response) => {
          this.result = 'Data not found';
        
          this.clicked = false;
        
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            this.result2 = error.error.text;
            let a = this.userData.get(this.result2);
        
            if (error.error.text) {
              if (a.status === 'Success') {
                this.getCart()
              } else {

              }
            } else {

            }
          } else {

          }
        }
      );
    }
  }

  decrease(id: any, quentity: any, value: any) {
    if (value > 1) {
      const payload = {
        productId: id,
        qty: quentity
      };
      this.userData.addProductCart(payload).subscribe(
        (response) => {
          this.result = 'Data not found';
          
          this.clicked = false;
          
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            this.result2 = error.error.text;
            let a = this.userData.get(this.result2);
          
            if (error.error.text) {
              if (a.status === 'Success') {
                this.getCart()
              } else {

              }
            } else {

            }
          } else {

          }
        }
      );
    }
  }

  ProductValue(value: any) {
    
    this.productId = '';
    this.productId = value;
    if(!this.result2){
      localStorage.removeItem("items")
      localStorage.removeItem("itemsQuantity")
    }
  }

  productIds(value: any) {
    this.isLoading = true;

    this.userData.removeProductCart(value).subscribe(
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
              this.comm_ser.setRemoveCartCount();
              this.result = a.message;
              this.closeModal();
              this.Notification.showSuccess(this.result, '');
              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route.onSameUrlNavigation = 'reload';
              this.route.navigateByUrl(this.url);
              this.ngOnInit();
            } else {
              this.isLoading = false;
              this.result = a.message;
              this.Notification.showError(this.result, '');
            }
          } else {
            this.isLoading = false;
            this.result = a.message;
            this.Notification.showError(this.result, '');
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
          this.result = b.message;
          this.Notification.showError(this.result, '');
    

          if (
            error.status == 400 &&
            this.result.includes('cart') &&
            this.result.includes('empty')
          ) {

            this.result2.Cart = [];
          }
          this.isLoading = false;
    
        }
      }
    );
  }

  onProductCheckOut(){
    if(this.login) {
      this.route.navigate(['/productCheckout'])
    }
  }
}
