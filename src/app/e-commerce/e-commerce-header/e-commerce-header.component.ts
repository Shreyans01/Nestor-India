import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApiServicesService } from './../../services/api-services.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductCartComponent } from '../product-cart/product-cart.component';

@Component({
  selector: 'app-e-commerce-header',
  templateUrl: './e-commerce-header.component.html',
  styleUrls: ['./e-commerce-header.component.css'],
})
export class ECommerceHeaderComponent implements OnInit, AfterViewInit {
  result: any = '';
  result2: any = '';
  progress: any = '';
  count: any = '';
  Pricing: any;
  isLoading = false;
  login = false;
  rupee_sym: any;
  cartCount: any;
  is_data: any = '';
  result1: any = '';
  url: any = '';
  searchId: any;
  searchCategory: any = 'All Categories';
  searchCategoryName: any = [];
  searchName: any
  submitted: boolean = false;
  searchProductForm: FormGroup = new FormGroup({});
  isCategory: boolean = false;
  /* Subscriptions */
  private cartCountChange: Subscription;
  private cartRemoveCount: Subscription;
  nonLoginCart: boolean = false;
  currentUrl: string;
  isProuctDetailPage: boolean;
  constructor(
    private userData: ApiServicesService,
    private route: Router,
    private comm_ser: CommonService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private homeComponent: HomeComponent,
    private productListComponent: ProductListComponent,
    private productDetailsComponent:ProductDetailsComponent,
    private productCartComponent:ProductCartComponent,
    private activatedRoute: ActivatedRoute
  ) {
    this.url = '/productList';
    this.cartCount = 0;
    this.rupee_sym = this.comm_ser.rupee_symbol;
    this.cartCountChange = this.comm_ser
      .getCartCount()
      .subscribe((cartCountInc) => {
        this.cartCount = cartCountInc.count;
        this.count = +this.count + 1;

        cartCountInc.price =
          Number(this.cartCount) * Number(cartCountInc.price);
        if (!this.Pricing) {
          this.Pricing = {
            subtotal: 0,
          };
          this.Pricing.subtotal = cartCountInc.price;
        } else {
          this.Pricing.subtotal = +this.Pricing.subtotal + +cartCountInc.price;
        }
      });

    this.cartRemoveCount = this.comm_ser
      .getRemoveCartCount()
      .subscribe((cartCountDec) => {
        this.cartCount = cartCountDec.count;
        this.count = -this.count - 1;

        // cartCountInc.price = Number(this.cartCount) * Number(cartCountInc.price);

        this.Pricing.subtotal = -this.Pricing.subtotal - -cartCountDec.price;
        if (this.count < 0) {
          this.count = '0';
        }
        if (this.Pricing.subtotal < 0) {
          this.Pricing.subtotal = 0;
        }
      });

    this.searchProductForm = this.fb.group({
      category: ['', []],
      search: ['', []],
    });
  }

  SearchProduct(data: any) {
    this.submitted = true;
    if (this.searchProductForm.valid) {

      let value = {
        category: data.category,
        search: data.search,
      };

      console.log("value", value)
      this.userData.SearchProduct(value).subscribe(
        (response: any) => {
          console.log("Response", response)
          this.result = 'Data not found';

        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);
            this.searchId
            if (error.error.text) {
              if (a.status === 'Success') {
                this.result = a.data.products;
                this.userData.setSearchValue(this.result);
                this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route.onSameUrlNavigation = 'reload';
                this.route.navigateByUrl(this.url);
                localStorage.setItem('searchKey', this.searchCategory)
                localStorage.setItem('searchKeyName', this.searchCategoryName)
              } else {
                this.result1 = a.message;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            this.result1 = b.message;
            this.route.routeReuseStrategy.shouldReuseRoute = () => false;
            this.route.onSameUrlNavigation = 'reload';
            this.route.navigateByUrl(this.url);
            this.userData.setSearchValue1(this.result1);
            this.is_data = false;
            localStorage.setItem('searchKey', this.searchCategory)
            localStorage.setItem('searchKeyName', this.searchCategoryName)
          }
        }
      );
    }
  }

  getSelected(id: any) {
    return id === this.searchId
  }
  getSearch() {
    return this.searchProductForm.controls;
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  ngAfterViewInit(): void {
    localStorage.removeItem('searchKey')
    localStorage.removeItem('searchKeyName')
    this.homeComponent.currentMessage.subscribe((res: any) => {
      this.nonLoginCart = true;
      if (localStorage.getItem("items")) {
        var itemCount:any = localStorage.getItem("items");
        if(itemCount){
          console.log("itemCount['Cart']",JSON.parse(itemCount)['Cart'].length)
          this.count = JSON.parse(itemCount)['Cart'].length;
        }
        this.cdr.detectChanges();
      }
    });
    this.productListComponent.currentMessage.subscribe((res: any) => {
      this.nonLoginCart = true;
      if (localStorage.getItem("items")) {
        var itemCount:any = localStorage.getItem("items");
        if(itemCount){
          console.log("itemCount['Cart']",JSON.parse(itemCount)['Cart'].length)
          this.count = JSON.parse(itemCount)['Cart'].length;
        }
        this.cdr.detectChanges();
      }
    });
    this.productDetailsComponent.currentMessage.subscribe((res: any) => {
      this.nonLoginCart = true;
      if (localStorage.getItem("items")) {
        var itemCount:any = localStorage.getItem("items");
        if(itemCount){
          this.count = JSON.parse(itemCount)['Cart'].length;
        }
        this.cdr.detectChanges();
      }
    });
    this.cdr.detectChanges();
    if(!this.productCartComponent.result2) {
      this.count = '0';
    }
  }

  ngOnInit(): void {
    //this.processBar();
    this.currentUrl = this.route.url;
    console.log("PPPPPPPPPPPPPPPPPPPPPPPP0",this.currentUrl)
    this.activatedRoute.queryParams
      .subscribe(params => {
        if(params?.categoriesId) {
          this.isCategory = true;
        }
        else {
          this.isCategory = false;
        }
        if( params?.productId) {
          this.isProuctDetailPage = true;
        }
        else {
          this.isProuctDetailPage = false;
        }
      })
    const storage = localStorage.getItem('searchKey')
    if (storage) {
      this.searchCategory = storage
    } else {
      this.searchCategory = 'All Categories';
    }
    const storageName = localStorage.getItem('searchKeyName')
    if (storageName) {
      this.searchCategoryName = storageName
    } else {
      this.searchCategoryName = ''
    }
    this.timeout();
    this.userData.getLocation();

    this.totalCart();

    this.categoryNotLogin();
    this.brandsNotLogin();

    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  ngOnDestroy() {

    this.cartCountChange.unsubscribe();
    this.cartRemoveCount.unsubscribe();
  }

  categoryNotLogin() {
    this.userData.getLocation();


    this.userData.categoryNotLogin().subscribe(
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
              this.result = a.data.Categories;
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

  brandsNotLogin() {
    this.userData.brandsNotLogin().subscribe(
      (response) => {
        this.result2 = 'Data not found';
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result2 = a.data.Brands;
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

  totalCart() {
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
                this.result2 = a.data.Cart;
                this.Pricing = a.data.Pricing;

                this.count = this.result2.filter(
                  (obj: any) => obj.productId
                ).length;
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

  processBar() {
    this.isLoading = true;
    this.timeout();
  }

  reloadPage() {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  onHomePage() {
    this.route.navigate(['logout'])
  }

  fetchCartDetails() {
    this.homeComponent.addProductToCart.subscribe((res: any) => {
      console.log("Response", res)
    })
  }
}
