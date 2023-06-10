import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModalDialogComponent } from 'src/app/user-interface/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  result: any = '';
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result5: any = '';
  result6: any = '';
  result7: any = '';
  result8: any = '';
  result9: any = '';
  progress: any = '';
  login = false;
  count: any = '';
  Pricing: any = '';
  isLoading = false;
  url: any;
  rupee_sym: any;
  qty3: any = 1;
  WishlistArrayValue: any;

  has_featured_products: boolean;
  has_new_arrivals: boolean;
  has_best_seller: boolean;

  price: number;
  pageWidth: any;
  carousel_number: any;

  addtoCart1: FormGroup = new FormGroup({});
  subscription = new Subscription();
  itemAddedWithoutLogin:any = [];
  addProductToCart = new BehaviorSubject<Boolean>(false);
  currentMessage = this.addProductToCart.asObservable();
  abc: any= {
    Cart:[]
  };
  constructor(
    private rendrer: Renderer2,
    private userData: ApiServicesService,
    private route: Router,
    private comm_ser: CommonService,
    private Notification: NotificationServiceService,
    private fb: FormBuilder,
    private modalDialogComponent:ModalDialogComponent
  ) {
    this.has_featured_products = false;
    this.has_new_arrivals = false;
    this.has_best_seller = false;
    this.rupee_sym = comm_ser.rupee_symbol;
    this.url = this.route.url;

    this.pageWidth = document.querySelector('body')?.clientWidth;

    this.carousel_number = null;
    if (this.pageWidth <= 767) {
      this.carousel_number = 1;
    } else if (this.pageWidth >= 768 && this.pageWidth <= 991) {
      this.carousel_number = 2;
    }

    this.price = 0;

    this.addtoCart1 = this.fb.group({
      qty: ['1', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

  ngAfterViewInit(): void {

    this.appendScript();
    this.isLoading = false;
  }

  increase1(quentity: any) {
    if (quentity >= 1) {
      this.qty3 = quentity + 1;

    }
  }

  decrease1(quentity: any) {
    if (quentity > 1) {
      this.qty3 = quentity - 1;

    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.appendScript();
    this.topCategory();
    this.newArrivalProducts();
    this.bestSellerProduct();
    this.featuredProducts();
    this.WishlistArrayValue = this.userData.fetchWishlist();


    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
    this.isLoading = false;
  }

  appendScript() {
    const script = this.rendrer.createElement('script');
    script.src = 'assets/e-commerce/js/theme-script.js';
    document.body.appendChild(script);
  }

  topCategory() {
    this.userData.getLocation();

    this.subscription.add(
      this.subscription.add(
        this.userData.topCategory().subscribe(
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
                  this.result = a.data.TopCategories;
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
        )
      )
    );
  }

  open(productDetails1: any) {
    localStorage.setItem('productId', productDetails1);
  }

  addCart2(data: any) {
    this.isLoading = true;
    this.userData.getLocation();

    this.subscription.add(
      this.userData.addProductCart1(data).subscribe(
        (response) => {
          this.result4 = 'Data not found';
          this.isLoading = false;
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            this.result4 = error.error.text;
            let a = this.userData.get(this.result4);
            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route.onSameUrlNavigation = 'reload';
                this.route.navigateByUrl(this.url);
                let msg = a.message;
                this.Notification.showSuccess(msg, '');
              } else {
                this.isLoading = false;
                this.result4 = a.message;
                this.Notification.showError(this.result4, '');
              }
            } else {
              this.isLoading = false;
              this.result4 = a.message;
              this.Notification.showError(this.result4, '');
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result4 = b.message;
            this.Notification.showError(this.result4, '');

          }
        }
      )
    );
  }

  newArrivalProducts() {



    this.WishlistArrayValue = this.userData.fetchWishlist();



    this.userData.getLocation();


    this.subscription.add(
      this.userData.newArrivalProducts().subscribe(
        (response) => {
          this.result4 = 'Data not found';
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.userData.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result3 = a.data.newArrivals;
                if (Object.keys(this.result3).length == 0) {
                  this.has_new_arrivals = false;
                } else {
                  this.has_new_arrivals = true;
                }
              } else {
                this.result4 = a.message;
              }
            } else {
              this.result4 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            this.result4 = b.message;
          }
        }
      )
    );
  }

  bestSellerProduct() {
    this.userData.getLocation();

    this.subscription.add(
      this.userData.bestSellerProduct().subscribe(
        (response) => {
          this.result6 = 'Data not found';
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.userData.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result5 = a.data.bestSeller;
                if (Object.keys(this.result5).length == 0) {
                  this.has_best_seller = false;
                } else {
                  this.has_best_seller = true;
                }
              } else {
                this.result6 = a.message;
              }
            } else {
              this.result6 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            this.result6 = b.message;
          }
        }
      )
    );
  }

  featuredProducts() {
    this.userData.getLocation();

    this.subscription.add(
      this.userData.featuredProducts().subscribe(
        (response) => {
          this.result8 = 'Data not found';
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.userData.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result7 = a.data.featuredProducts;

                if (Object.keys(this.result7).length == 0) {
                  this.has_featured_products = false;
                } else {
                  this.has_featured_products = true;
                }
              } else {
                this.result8 = a.message;
              }
            } else {
              this.result8 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            this.result8 = b.message;
          }
        }
      )
    );
  }

  processBar() {
    this.isLoading = true;
    this.timeout();
  }

  addCart1() {
    this.result7 = '';

    this.isLoading = true;
    this.userData.getLocation();

    if (this.qty3 <= this.result9.stock) {
      this.subscription.add(
        this.userData.addProductCart2(this.qty3).subscribe(
          (response) => {
            this.result7 = 'Data not found';
            this.isLoading = false;
          },
          (error) => {
            let errors = error.error;
            if (error.status === 200) {
              let c = error.error.text;
              let a = this.userData.get(c);
              if (error.error.text) {
                if (a.status === 'Success') {
                  this.isLoading = false;
                  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                  this.route.onSameUrlNavigation = 'reload';
                  this.route.navigateByUrl(this.url);
                  this.qty3 = '';
                  this.closeModal();
                  let msg = a.message;
                  this.Notification.showSuccess(msg, '');

                } else {
                  this.isLoading = false;
                  this.result7 = a.message;
                  this.Notification.showError(this.result7, '');
                }
              } else {
                this.isLoading = false;
                this.result7 = a.message;
                this.Notification.showError(this.result7, '');
              }
            } else {
              this.isLoading = false;
              let b = this.userData.get(errors);
              this.result7 = b.message;
              this.Notification.showError(this.result7, '');
            }
          }
        )
      );
    } else {
      this.isLoading = false;
      this.result7 = 'Maximum quantity available is ' + this.result9.stock;
      this.Notification.showError(this.result7, '');
    }
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  productIdSet(value: any) {
    console.log("Value", value)

    this.result9 = [];
    this.qty3 = 1;

    this.isLoading = true;
    this.userData.setProductId(value);
    this.subscription.add(
      this.userData.productDetails1().subscribe(
        (response) => {
          this.isLoading = false;
          this.result7 = 'Data not found';
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a:any = this.userData.get(result2);
            if (!this.login) {
              this.itemAddedWithoutLogin = a;
            }
            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result9 = a.data[0];

              } else {
                this.isLoading = false;
                this.result7 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result7 = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result7 = b.message;
          }
        }
      )
    );
  }

  doWishlist(value: any, remove: any) {
    this.userData.urlData(this.url);
    if (remove) {
      this.homeRemoveToWishlist(value);
    } else {
      this.homeAddToWishlist(value);
    }
  }

  homeAddToWishlist(value: any) {
    this.userData.urlData(this.url);
    this.WishlistArrayValue = []
    this.isLoading = true;
    this.userData.addProductWishlist(value).subscribe(
      (response) => {
        this.result7 = 'Data not found';
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
              this.userData.getLocalWishlist();
              this.closeModal();

              this.result4 = a.message;
              this.Notification.showSuccess(this.result4, ' ');
            } else {
              this.isLoading = false;
              this.result7 = a.message;
              this.Notification.showError(this.result7, '');
            }
          } else {
            this.isLoading = false;
            this.result7 = a.message;
            this.Notification.showError(this.result7, '');
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
          this.result7 = b.message;
          this.Notification.showError(this.result7, '');
        }
      }
    );
  }

  homeRemoveToWishlist(value: any) {
    this.userData.urlData(this.url);
    this.WishlistArrayValue = [];
    localStorage.removeItem('Wishlist');
    this.isLoading = true;
    this.userData.removeProductWishlist(value).subscribe(
      (response) => {

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
              this.userData.getLocalWishlist();

              this.result = a.message;
              this.Notification.showSuccess(this.result, '');
              this.WishlistArrayValue = this.userData.fetchWishlist();
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
          this.isLoading = false;
          let b = this.userData.get(errors);

          this.result = b.message;
          this.Notification.showError(this.result, '');

        }
      }
    );
  }

  addToCartWithoutLogin() {
    console.log("this.abc.Cart",this.abc.Cart)
    if(this.itemAddedWithoutLogin['data']) {
      this.abc.Cart.push(this.itemAddedWithoutLogin['data'][0])
    }
    localStorage.setItem("items", JSON.stringify(this.abc))
    localStorage.setItem("itemsQuantity", this.qty3);

    this.addProductToCart.next(true);
    this.closeModal();
  }

  onProductDetailPage(productId:any){
    this.route.navigate(['productDetails'],{queryParams:{productId:productId}})
  }
}
