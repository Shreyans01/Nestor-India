import { NotificationServiceService } from './../../services/notification-service.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { ECommerceHeaderComponent } from '../e-commerce-header/e-commerce-header.component';
import { ToastrService } from 'ngx-toastr';
import { ExcerptPipe } from '../../excerpt.pipe';
import { BehaviorSubject } from 'rxjs';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  categoriesId: any = '';
  brandId: any = '';
  result: any;
  result1: any = '';
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result5: any = '';
  result9: any = '';
  result7: any = '';
  WishlistArrayValue: any = '';
  data: any = '';
  data4: any = '';
  dataId: any = false;
  brandArray1: any = [];
  selectedArray: any = [];
  brandArray: any;
  selectedArray1: any;
  array: any = [];
  isLoading = false;
  minimam1: any = '';
  maximam1: any = '';
  val: any = '';
  login = false;
  rupee_sym: any;
  p: number = 1;
  
  url: any;
  gridview: boolean = true;
  is_data: boolean;
  view: boolean = true;
  view1: boolean = true;
  qty1: any = '';
  collection: any = [];
  priceForm: FormGroup;
  form: FormGroup;
  addtoCart1: FormGroup;
  searchData: any = '';
  category: any = '';
  search: any = '';
  qty3: any = 1;
  priceLowHigh: any = '';
  submitted: boolean = false;
  // abc: any= {
  //   Cart:[]
  // };
  itemAddedWithoutLogin:any = [];
  addProductToCart = new BehaviorSubject<Boolean>(false);
  currentMessage = this.addProductToCart.asObservable();
  bgImage: string | null;
  bgTitle: string | null;

  constructor(
    private route: ActivatedRoute,
    private route1: Router,
    private userData: ApiServicesService,
    private Notification: NotificationServiceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private homeComponent: HomeComponent,
  
    private comm_ser: CommonService
  ) {
    this.is_data = false;
    this.url = this.route1.url;

    this.priceForm = this.fb.group({
      min_price: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      max_price: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });

    this.form = this.fb.group({
      checkArray: this.fb.array([]),
    });

    this.addtoCart1 = this.fb.group({
      qty: ['1', [Validators.required]],
    });

    this.url = this.route1.url;
    this.rupee_sym = this.comm_ser.rupee_symbol;
  }

  selectedDay: string = '';

  selectChangeHandler(event: any) {
    this.selectedDay = event.target.value;
  }

  ngAfterViewInit(): void {
  
  }

  getPrice() {
    return this.priceForm.controls;
  }

  ViewValueChange() {
    if (this.view == true) {
      this.view = false;
    } else {
      this.view = true;
    }
  }

  ViewValueChange1() {
    if (this.view1 == true) {
      this.view1 = false;
    } else {
      this.view1 = true;
    }
  }

  addCart(data: any) {
    this.isLoading = true;

    this.userData.getLocation();
  
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
              this.result4 = a.message;
              this.Notification.showSuccess(this.result4, '');
              this.isLoading = false;

              this.route1.routeReuseStrategy.shouldReuseRoute = () => false;
              this.route1.onSameUrlNavigation = 'reload';
              this.route1.navigateByUrl(this.url);
              
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
          
        }
      }
    );
  }

  addCart1(value: any) {
    this.isLoading = true;


    this.userData.getLocation();

    if (this.qty3 <= this.result9.stock) {
      this.userData.addProductCart2(this.qty3).subscribe(
        (response) => {
          this.result5 = 'Data not found';
          this.isLoading = false;

        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            this.result5 = error.error.text;
            let a = this.userData.get(this.result5);
            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;

                this.route1.routeReuseStrategy.shouldReuseRoute = () => false;
                this.route1.onSameUrlNavigation = 'reload';
                this.route1.navigateByUrl(this.url);
                this.result5 = a.message;
                this.Notification.showSuccess(this.result5, '');
                this.closeModal();


              } else {
                this.isLoading = false;

                this.result5 = a.message;
                this.Notification.showError(this.result5, '');

              }
            } else {
              this.isLoading = false;

              this.result5 = a.message;
              this.Notification.showError(this.result5, '');

            }
          } else {
            this.isLoading = false;

            let b = this.userData.get(errors);
            this.result5 = b.message;
            this.Notification.showError(this.result5, '');

          }
        }
      );
    } else {
      this.isLoading = false;

      this.result5 = 'Maximum quantity available is ' + this.result9.stock;
      this.Notification.showError(this.result5, '');
    }
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  productIdSet(value: any) {
    this.result9 = [];
    this.qty3 = 1;


    this.userData.setProductId(value);

    this.userData.productDetails1().subscribe(
      (response) => {
        this.result = 'Data not found';

      },
      (error) => {
        let errors = error.error;


        if (error.status === 200) {
          let result2 = error.error.text;
          let a = this.userData.get(result2);
          if (!this.login) {
            this.itemAddedWithoutLogin = a;
            console.log("LLLLLLLLLLLLL", this.itemAddedWithoutLogin)
            // if(localStorage.getItem("items")) {
            //   this.itemAddedWithoutLogin.data.push(a.data);
            // }
          }
          if (error.error.text) {
            if (a.status === 'Success') {
              this.result9 = a.data[0];
            } else {
              this.result5 = a.message;
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

  minimam(value: any) {
    this.minimam1 = value;
  }
  maximam(value: any) {
    this.maximam1 = value;
  }

  MinMaxiPrice(data1: any) {
    this.submitted = true;
    if (this.priceForm.valid) {
      this.result = [];
      if (this.data) {
        this.isLoading = true;
        const data2 = {
          categoryId: this.data,
          brandId: this.brandArray,
          min_price: data1.min_price,
          max_price: data1.max_price,
          search: this.search,
        };

        this.userData.CategoriesProductListSortMinMaxiPrice(data2).subscribe(
          (response: any) => {
            this.result = 'Data not found';


            this.isLoading = false;

          },
          (error: any) => {
            let errors = error.error;
            if (error.status === 200) {
              let result2 = error.error.text;
              let a = this.userData.get(result2);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.isLoading = false;

                  this.result = a.data.products;
                  if (this.result.length > 0) {
                    this.is_data = true;
                  } else {
                    this.is_data = false;
                  }
                } else {
                  this.isLoading = false;
                  this.result1 = a.message;
                }
              } else {
                this.isLoading = false;
                this.result1 = a.message;
              }
            } else {
              this.isLoading = false;
              let b = this.userData.get(errors);
              this.result1 = b.message;
              this.is_data = false;
            }
          }
        );
      } else {
        this.isLoading = true;
        const data2 = {

          brandId: this.brandArray,
          min_price: data1.min_price,
          max_price: data1.max_price,
        };

        this.userData.allProductListSortMinMaxiPrice(data2).subscribe(
          (response) => {
            this.result = 'Data not found';
            this.isLoading = false;
          },
          (error) => {
            let errors = error.error;
            if (error.status === 200) {
              let result2 = error.error.text;
              let a = this.userData.get(result2);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.isLoading = false;
                  this.result = a.data.products;
                  if (this.result.length > 0) {
                    this.is_data = true;
                  } else {
                    this.is_data = false;
                  }
                } else {
                  this.isLoading = false;
                  this.result1 = a.message;
                }
              } else {
                this.isLoading = false;
                this.result1 = a.message;
              }
            } else {
              this.isLoading = false;
              let b = this.userData.get(errors);
              this.result1 = b.message;
              this.is_data = false;
            }
          }
        );
      }
    }
  }

  categories1() {

    this.route.queryParamMap.subscribe((params) => {

      this.categoriesId = params.get('categoriesId');
      this.bgImage = params.get('image');
      this.bgTitle = params.get('title');
      this.data = this.categoriesId;
      this.test();
    });
  }

  text1() {
    this.result = [];
    this.result1 = [];
    this.result2 = [];
    this.result3 = [];
    this.result5 = [];
  }

  brandId1() {

    this.route.queryParamMap.subscribe((params) => {
      this.result = [];
      this.result1 = [];
      this.result2 = [];
      this.result3 = [];
      this.result5 = [];
      this.brandId = params.get('brandId');
      this.data4 = this.brandId;
    });


  }

  ngOnInit(): void {
    this.categories1();

    this.searchData = this.userData.SearchDataGet();
    if (!this.searchData) {
      this.category = '';
      this.search = '';
    } else {
      this.category = this.searchData.category;
      this.search = this.searchData.search;
    }


  }

  allProductListNotLogin() {
    this.WishlistArrayValue = this.userData.fetchWishlist();
    this.result = [];
    let a = this.userData.getSearchValue();

    let b = this.userData.getSearchValue1();

    if (a != '') {
      this.result = [];
      this.result = a;

      if (this.result.length > 0) {
        this.is_data = true;
      } else {
        this.is_data = false;
      }
    } else if (b != '') {
      this.result = [];
      this.result1 = [];
      this.result1 = b;
      this.is_data = false;
    } else {
      this.userData.allProductListNotLogin(this.data4).subscribe(
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
                this.result = a.data.products;

                if (this.result.length > 0) {
                  this.is_data = true;
                } else {
                  this.is_data = false;
                }
              } else {
                this.result1 = a.message;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            this.result1 = b.message;
            this.is_data = false;
          }
        }
      );
    }
  }

  allProductListLogin() {
    this.result = [];
    this.userData.allProductListLogin(this.data4).subscribe(
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
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result1 = b.message;
          this.is_data = false;
        }
      }
    );
  }

  CategoriesProductViewNotLogin() {
    this.WishlistArrayValue = this.userData.fetchWishlist();
    let data: any = {
      categoriesId: this.data,
      brandId: this.data4,
    };

    this.result = [];
    this.userData.CategoriesProductViewNotLogin(data).subscribe(
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
              this.result = a.data.products;

              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result1 = b.message;
          this.is_data = false;
        }
      }
    );
  }

  CategoriesProductViewLogin() {
    let data: any = {
      categoriesId: this.data,
      brandId: this.data4,
    };
    this.result = [];
    this.userData.CategoriesProductViewLogin(data).subscribe(
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
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result1 = b.message;
          this.is_data = false;
        }
      }
    );
  }

  sort(value: any) {
    this.priceLowHigh = '';
    const data2 = {
      categories: this.data,
      min_price: this.minimam1,
      max_price: this.maximam1,
      brandId: this.brandArray,
    };

    if (value == 1) {
      this.priceLowHigh = 'price-low-high';
      this.isLoading = true;
      this.userData.priceLowToHighNotLogin(data2).subscribe(
        (response) => {
          this.result = 'Data not found';
          this.isLoading = false;
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result = a.data.products;
                if (this.result.length > 0) {
                  this.is_data = true;
                } else {
                  this.is_data = false;
                }
              } else {
                this.isLoading = false;
                this.result1 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result1 = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result1 = b.message;
            this.is_data = false;
          }
        }
      );
    } else if (value == 2) {
      this.priceLowHigh = 'price-high-low';
      this.isLoading = true;
      this.userData.priceHighToLowNotLogin(data2).subscribe(
        (response) => {
          this.result = 'Data not found';
          this.isLoading = false;
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result = a.data.products;

                if (this.result.length > 0) {
                  this.is_data = true;
                } else {
                  this.is_data = false;
                }
              } else {
                this.isLoading = false;
                this.result1 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result1 = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result1 = b.message;
            this.is_data = false;
          }
        }
      );
    } else if (value == 3) {
      this.priceLowHigh = 'newest';
      this.isLoading = true;
      this.userData.newestNotLogin(data2).subscribe(
        (response) => {
          this.result = 'Data not found';
          this.isLoading = false;
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result = a.data.products;
                if (this.result.length > 0) {
                  this.is_data = true;
                } else {
                  this.is_data = false;
                }
              } else {
                this.isLoading = false;
                this.result1 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result1 = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result1 = b.message;
            this.is_data = false;
          }
        }
      );
    } else if (value == 4) {
      this.priceLowHigh = '';
      this.isLoading = true;
      this.userData.noSortingNotLogin(data2).subscribe(
        (response) => {
          this.result = 'Data not found';
          this.isLoading = false;
        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result = a.data.products;
                if (this.result.length > 0) {
                  this.is_data = true;
                } else {
                  this.is_data = false;
                }
              } else {
                this.isLoading = false;
                this.result1 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result1 = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result1 = b.message;
            this.is_data = false;
          }
        }
      );
    }

    this.userData.priceLowHighSet(this.priceLowHigh);
  }

  categoryNotLogin() {
    this.userData.categoryNotLogin().subscribe(
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
              this.result2 = a.data.Categories;
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

  brandsNotLogin() {
    this.userData.brandsNotLogin().subscribe(
      (response) => {
        this.result3 = 'Data not found';
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result3 = a.data.Brands;
            } else {
              this.result3 = a.message;
            }
          } else {
            this.result3 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result3 = b.message;
        }
      }
    );
  }

  categoryLogin() {
    this.userData.categoryLogin().subscribe(
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
              this.result2 = a.data.Categories;
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

  brandsLogin() {
    this.userData.brandsLogin().subscribe(
      (response) => {
        this.result3 = 'Data not found';
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result3 = a.data.Brands;
            } else {
              this.result3 = a.message;
            }
          } else {
            this.result3 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result3 = b.message;
        }
      }
    );
  }

  brandIds(e: any) {
    this.result = [];
    if (e.target.checked) {
      this.brandArray1.push(e.target.value);
      this.brandArray1.concat(',' + e.target.value);
    } else {
      const index = this.brandArray1.indexOf(e.target.value);
      if (index > -1) {
        this.brandArray1.splice(index, 1);
      }
    }
    this.brandArray = this.brandArray1.join();

    if (this.data) {


      this.processBar();
      this.CategoriesProductViewSortBrandNotLogin();
    } else {

      this.processBar();
      this.allProductListSortBrandNotLogin();
      
    }
  }

  brandTectchange(id: any, e: any) {
    this.brandArray = id;
    if (this.data) {
      this.processBar();
      this.CategoriesProductViewSortBrandNotLogin();
    } else {
      this.processBar();
      this.allProductListSortBrandNotLogin();
      
    }
  }

  getActive(id: any) {
    return this.selectedArray.some((e: any) => e === id);
  }

  selectLabelActive(id: any, item: any) {
    const index = this.selectedArray.findIndex((e: any) => e === id);
    if (index === -1) {
      this.processBar();
      this.selectedArray.push(item?.id);
      this.selectedArray.concat(',' + item?.id);
    } else {
      this.processBar();
      this.selectedArray.splice(index, 1);
    }
    this.selectedArray1 = this.selectedArray.join();
    
    const data1 = {
      categories: this.data,
      min_price: this.minimam1,
      max_price: this.maximam1,
      brandId: this.selectedArray1,
      search: this.search,
    };
    
    this.userData.allProductListSortBrandNotLogin(data1).subscribe(
      (response) => {
        this.result = 'Data not found';
      },
      (error) => {
        this.result = [];
        let errors = error.error;

        if (error.status === 200) {
          let result2 = error.error.text;
          let a = this.userData.get(result2);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);

          this.result1 = b.message;
          this.is_data = false;
        }
        this.isLoading = false;
      }
    );
  }

  allProductListSortBrandNotLogin() {
    const data1 = {
      categories: this.data,
      min_price: this.minimam1,
      max_price: this.maximam1,
      brandId: this.brandArray,
      search: this.search,
    };
    this.userData.allProductListSortBrandNotLogin(data1).subscribe(
      (response) => {
        this.result = 'Data not found';
      },
      (error) => {
        this.result = [];
        let errors = error.error;

        if (error.status === 200) {
          let result2 = error.error.text;
          let a = this.userData.get(result2);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);

          this.result1 = b.message;
          this.is_data = false;
        }
        this.isLoading = false;
      }
    );
  }

  allProductListSortBrandLogin() {
    this.result = [];
    this.userData.allProductListSortBrandLogin(this.brandArray).subscribe(
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
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result1 = b.message;
          this.is_data = false;
        }
      }
    );
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

  CategoriesProductViewSortBrandNotLogin() {
    this.result = [];
    

    const data1 = {
      categories: this.data,
      min_price: this.minimam1,
      max_price: this.maximam1,
      brandId: this.brandArray,
      search: this.search,
    };
    this.userData.CategoriesProductViewSortBrandNotLogin(data1).subscribe(
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
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result1 = b.message;
          this.is_data = false;
        }
      }
    );
  }

  CategoriesProductViewSortBrandLogin() {
    this.result = [];
    const data1 = {
      categoryId: this.data,
      brandId: this.brandArray,
    };
    this.userData.CategoriesProductViewSortBrandLogin(data1).subscribe(
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
              this.result = a.data.products;
              if (this.result.length > 0) {
                this.is_data = true;
              } else {
                this.is_data = false;
              }
            } else {
              this.result1 = a.message;
            }
          } else {
            this.result1 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.result1 = b.message;
          this.is_data = false;
        }
      }
    );
  }

  processBar() {
    this.isLoading = true;
    this.timeout();
  }
  test() {
    this.userData.getLocation();

    this.brandId1();
    this.categoryNotLogin();
    this.brandsNotLogin();    

    if (this.data) {
      this.CategoriesProductViewNotLogin();
    } else {
      this.allProductListNotLogin();
    }

    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  gridView() {
    this.gridview = true;
  }

  listView() {
    this.gridview = false;
  }

  doWishlist(value: any, remove: any) {

    this.userData.urlData(this.url);

    if (remove) {
      this.ProductListRemoveToWishlist(value);
    } else {
      this.ProductListAddToWishlist(value);
    }
  }

  ProductListAddToWishlist(value: any) {
    this.userData.urlData(this.url);
    this.WishlistArrayValue = [];

    localStorage.removeItem('Wishlist');

    this.WishlistArrayValue = this.userData.fetchWishlist();

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
              this.result7 = a.message;
              
              this.isLoading = false;

              this.closeModal();
              this.userData.getLocalWishlist();
              this.Notification.showSuccess(this.result7, '');
              
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

  ProductListRemoveToWishlist(value: any) {
    this.userData.urlData(this.url);
    this.WishlistArrayValue = [];
    localStorage.removeItem('Wishlist');
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

  getPage(e: any) {
    console.log("EEEEEEEEEEEEEEEEEEe",e)
    this.p = e;
  }

  addToCartWithoutLogin() {
    // console.log("this.abc.Cart",this.abc.Cart)
    if(this.itemAddedWithoutLogin['data']) {
      this.homeComponent.abc.Cart.push(this.itemAddedWithoutLogin['data'][0])
    }
    localStorage.setItem("items", JSON.stringify(this.homeComponent.abc))
    localStorage.setItem("itemsQuantity", this.qty3);

    this.addProductToCart.next(true);
    this.closeModal();
  }

  onPageChange(event:any){
    console.log("event",event)
  }
}
