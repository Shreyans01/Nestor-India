import { NotificationServiceService } from './../../services/notification-service.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Renderer2 } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { CommonService } from 'src/app/services/common.service';
import * as $ from 'jquery';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  result: any = '';
  result1: any = '';
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result5: any = '';
  result6: any = '';
  result7: any = '';
  result8: any = '';
  WishlistArrayValue: any = '';
  clicked: any = '';
  productId: any = '';
  isLoading = false;
  login = false;
  rupee_sym: any;
  url: any;
  data: any;
  qty2: number = 1;
  qty3: any = 1;

  price: number;
  pageWidth: any;
  carousel_number: any;
  Rela: any = true;

  addtoCart: FormGroup = new FormGroup({});
  addtoCart1: FormGroup = new FormGroup({});
  imgSrc:string | undefined;
  addProductToCart = new BehaviorSubject<Boolean>(false);
  currentMessage = this.addProductToCart.asObservable();
  itemAddedWithoutLogin:any = [];
  abc: any= {
    Cart:[]
  };
  step = 0;
  collapsibleButtons = document.querySelectorAll(
    ".accordian-header"
  );
  constructor(
    private rendrer: Renderer2,
    private fb: FormBuilder,
    private route: Router,
    private userData: ApiServicesService,
    private router: ActivatedRoute,
    private comm_ser: CommonService,
    private Notification: NotificationServiceService,
    private homeComponent: HomeComponent
  ) {
    this.pageWidth = document.querySelector('body')?.clientWidth;
    this.carousel_number = null;
    if (this.pageWidth <= 767) {
      this.carousel_number = 1;

    } else if (this.pageWidth >= 768 && this.pageWidth <= 991) {
      this.carousel_number = 2;

    } else {

    }
    this.price = 0;
    this.rupee_sym = this.comm_ser.rupee_symbol;
    this.url = this.route.url;


    this.addtoCart1 = this.fb.group({
      qty: ['1', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.appendScript();
    setTimeout(() => {
    }, 2000);
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  ngOnInit() {
    this.appendScript();
    this.productIdGet();
    this.relatedProducts();
    this.addtoCart = this.fb.group({
      productId: [this.data, [Validators.required]],
      qty: ['1', [Validators.required]],
    });

    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }

    this.result4 = this.userData.messagesGet();   



    const collapsibleButtons = document.querySelectorAll(
      ".collapsible-trigger-btn"
    );
    
    collapsibleButtons.forEach((collapsibleButton) => {
      collapsibleButton.addEventListener("click", (e:any) => {
        console.log("PPPPPPPPPPPPPPPPPP",e)
        if(e.target.value == undefined) {
        }
        e.currentTarget.parentElement.classList.toggle("collapsible-tab__open");
      });
    });
    
  }

  productIdGet() {
    this.result = [];
    this.router.queryParamMap.subscribe((params) => {
      this.productId = params.get('productId');

      this.data = this.productId;
      this.productIdSet(this.data);
      this.productDetails();
    });
  }

  productDetails() {
    this.userData.productDetails(this.data).subscribe(
      (response): void => {

        this.result = 'Data not found';

      },
      (error) => {

        let errors = error.error;



        if (error.status === 200) {
          let result2 = error.error.text;
          let a = this.userData.get(result2);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result = a.data;

            } else {
              this.result1 = a.message;

            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);

          this.result1 = b.message;
        }
      }
    );
  }

  relatedProducts() {
    this.WishlistArrayValue = this.userData.fetchWishlist();
    this.router.queryParamMap.subscribe((params) => {
      this.productId = params.get('productId');

      this.data = this.productId;
      this.userData.relatedProducts(this.data).subscribe(
        (response) => {

          this.result = 'Data not found';

        },
        (error) => {

          let errors = error.error;



          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result3 = a.data.relatedProducts;
                if (this.result3.length > 0) {
                  this.Rela = true;
                } else {
                  this.Rela = false;
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
      );
    });
  }

  processBar() {
    this.isLoading = true;
    this.timeout();
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  appendScript() {
    const script = this.rendrer.createElement('script');
    script.src = 'assets/e-commerce/js/theme-script.js';
    document.body.appendChild(script);
    const script1 = this.rendrer.createElement('script');
    script1.src = 'document.querySelector("body").clientWidth';
    document.body.appendChild(script1);
  }

  increase(quentity: any) {
    if (quentity >= 1) {
      this.qty2 = quentity + 1;

    }
  }

  decrease(quentity: any) {
    if (quentity > 1) {
      this.qty2 = quentity - 1;

    }
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

  doWishlist(value: any, remove: any) {
    this.userData.urlData(this.url);
    if (remove) {
      this.productDeetailsRemoveToWishlist(value);
    } else {
      this.productDeetailsAddToWishlist(value);
    }
  }

  productDeetailsAddToWishlist(value: any) {
    this.userData.urlData(this.url);
    this.WishlistArrayValue = [];

    this.isLoading = true;
    this.WishlistArrayValue = this.userData.fetchWishlist();

    this.userData.addProductWishlist(value).subscribe(
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
              this.result8 = a.message;

              this.isLoading = false;

              this.Notification.showSuccess(this.result8, '');

              this.closeModal();
              this.userData.getLocalWishlist();
            } else {
              this.isLoading = false;
              this.result8 = a.message;
              this.Notification.showError(this.result8, '');
            }
          } else {
            this.isLoading = false;
            this.result8 = a.message;
            this.Notification.showError(this.result7, '');
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
          this.result8 = b.message;
          this.Notification.showError(this.result7, '');
        }
      }
    );
  }

  productDeetailsRemoveToWishlist(value: any) {
    this.userData.urlData(this.url);
    this.WishlistArrayValue = [];

    this.isLoading = true;
    this.userData.removeProductWishlist(value).subscribe(
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
              this.isLoading = false;
              this.closeModal();
              this.userData.getLocalWishlist();

              this.result = a.message;
              this.Notification.showSuccess(this.result, '');
              this.WishlistArrayValue = this.userData.fetchWishlist();
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

  addCart() {
    this.userData.getLocation();
    this.clicked = true;
    this.isLoading = true;
    let data1: any = {
      productId: this.data,
      qty: this.qty2,
    };



    if (this.qty2 <= this.result[0].stock) {
      this.userData.addProductCart(data1).subscribe(
        (response) => {
          this.isLoading = false;
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

                this.isLoading = false;

                this.result2 = a.message;
                this.Notification.showSuccess(this.result2, '');
                this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route.onSameUrlNavigation = 'reload';
                this.route.navigateByUrl(this.url);

              } else {
                this.isLoading = false;
                this.result2 = a.message;
                this.Notification.showError(this.result2, '');

                this.clicked = false;
              }
            } else {
              this.isLoading = false;
              this.result2 = a.message;
              this.Notification.showError(this.result2, '');

              this.clicked = false;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result2 = b.message;
            this.Notification.showError(this.result2, '');
            this.clicked = false;
            this.ngOnInit();
          }
        }
      );
    } else {
      this.result2 = 'Maximum quantity available is ' + this.result[0].stock;
    }

  }

  addToWishlist(value: any) {


    this.isLoading = true;

    this.userData.addProductWishlist(value).subscribe(
      (response) => {

        this.result2 = 'Data not found';
        this.isLoading = false;
      },
      (error) => {
        console.log("Errorrrrrr",error)
        let errors = error.error;


        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;

              this.result2 = a.message;
              this.Notification.showSuccess(this.result2, '');


            } else {
              this.isLoading = false;
              this.result2 = a.message;
              this.Notification.showError(this.result2, '');

            }
          } else {
            this.isLoading = false;
            this.result2 = a.message;
            this.Notification.showError(this.result2, '');

          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);

          this.result2 = b.message;
          this.Notification.showError(this.result2, '');

        }
      }
    );
  }

  addToWishlist1(value: any) {


    this.isLoading = true;

    this.userData.addProductWishlist(value).subscribe(
      (response) => {

        this.result7 = 'Data not found';
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

              this.result4 = a.message;
              this.Notification.showSuccess(this.result4, '');


              this.closeModal();

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

  addCart2(data: any) {
    this.isLoading = true;

    this.userData.getLocation();

    this.userData.addProductCart1(data).subscribe(
      (response) => {
        this.isLoading = false;
        this.result4 = 'Data not found';

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
    );


  }

  productIdSet(value: any) {

    this.qty3 = 1;
    this.result6 = [];


    this.userData.setProductId(value);

    this.userData.productDetails1().subscribe(
      (response) => {

        this.result7 = 'Data not found';

      },
      (error) => {

        let errors = error.error;

        if (error.status === 200) {
          let result2 = error.error.text;
          console.log("this.userData.get(result2)",this.userData.get(result2))
          let a:any = this.userData.get(result2);
          if (!this.login) {
            console.log("AAAAAAAAAAAAAA",a)
            this.itemAddedWithoutLogin = a;
          }
          if (error.error.text) {
            if (a.status === 'Success') {
              this.result6 = a.data[0];
              console.log("this.result6",this.result6)

            } else {
              this.result7 = a.message;

            }
          } else {
            this.result7 = a.message;
          }
        } else {
          let b = this.userData.get(errors);

          this.result7 = b.message;
        }
      }
    );
  }

  addCart1() {
    this.isLoading = true;

    this.userData.getLocation();

    if (this.qty3 <= this.result6.stock) {
      this.userData.addProductCart2(this.qty3).subscribe(
        (response) => {
          this.result7 = 'Data not found';
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
                let msg = a.message;
                this.Notification.showSuccess(msg, '');

                this.closeModal();
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
    } else {
      this.isLoading = false;
      this.result7 = 'Maximum quantity available is ' + this.result6.stock;

    }


  }

  onClick(event:any){
    const imgElem = event.target;
    var target = event.target || event.srcElement || event.currentTarget;
    var srcAttr = target.attributes.src;
    this.imgSrc = srcAttr.nodeValue;
  }

  addToCartWithoutLogin() {
    // console.log("this.data",this.abc)
    if(this.itemAddedWithoutLogin['data']) {
      this.homeComponent.abc.Cart.push(this.itemAddedWithoutLogin['data'][0])
    }
    localStorage.setItem("items", JSON.stringify(this.homeComponent.abc))
    localStorage.setItem("itemsQuantity", this.qty3);

    this.addProductToCart.next(true);
    this.closeModal();
  }
  panelOpenState = false;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  accordianStatus(ev:any){
  }

  open(productDetails1: any){
    localStorage.setItem('productId', productDetails1);
  }
}
