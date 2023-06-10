import { NotificationServiceService } from './../../services/notification-service.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  result: any = '';
  result2: any = '';
  clicked: any = '';
  isLoading = false;
  rupee_sym: any;
  url: any;
  productId: any = '';

  constructor(
    private comm_ser: CommonService,
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private Notification: NotificationServiceService
  ) {
    this.rupee_sym = this.comm_ser.rupee_symbol;
    this.url = this.route.url;
  }

  ngAfterViewInit(): void {
    
  }

  ProductValue(value: any) {
    
    this.productId = '';
    this.productId = value;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  ngOnInit(): void {
    this.userData.getLocation();
    this.isLoading = false;
    this.getWishlist();
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  getWishlist() {
    this.userData.getWishlist().subscribe(
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
    
              this.result2 = a.data.Wishlist;
    
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

  productIds(value: any) {
    $("#wishlistConfirmation").hide();
    this.isLoading = true;

    this.userData.removeProductWishlist(value).subscribe(
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
              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route.onSameUrlNavigation = 'reload';
              this.route.navigate([this.url]);
              this.result = a.message;
              this.Notification.showSuccess(this.result, '');
              
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

          
        }
      }
    );
  }
  reloadComponent() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([this.url]);
  }
}


