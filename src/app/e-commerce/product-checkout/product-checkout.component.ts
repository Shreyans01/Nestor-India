import { environment } from 'src/environments/environment';
import { ApiServicesService } from './../../services/api-services.service';
import { Component, OnInit, OnDestroy, Renderer2, Inject, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT } from '@angular/common';
declare var Razorpay: any;
@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css'],
})
export class ProductCheckoutComponent implements OnInit, OnDestroy {
  result: any = '';
  result1: any = '';
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result7: any = '';
  result9: any = '';
  rupee_sym: any;
  payment_methods: any = ['Gateway', 'COD', 'Wallet'];
  razorpay_prevented_methods = ['COD'];
  // payment_methods:any = ['UPI','Gateway','COD','Wallet'];
  pay_method: string;
  raz_options: any = {};
  rzp1: any;
  address_type = ['Home', 'Office'];
  paymentGatewayId: any;
  interval: any;
  returnabledata: any;
  radio_img: any;
  isLoading = false;
  submitted: boolean = false;
  states: any = [];
  promocode: any = [];

  checkOutForm: FormGroup = new FormGroup({});
  promocodeForm: FormGroup = new FormGroup({});
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private comm_ser: CommonService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.paymentGatewayId = null;
    this.pay_method = '';
    // this.pay_method = this.payment_methods[0];
    this.rupee_sym = this.comm_ser.rupee_symbol;
    this.checkOutForm = this.fb.group({
      fullName: [
        '',
        [Validators.required],
      ],
      // , Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      addressLine1: [
        '',
        [
          Validators.required,
        ],
        // Validators.pattern('^[d#.0-9a-zA-Zs,-, ,]+[#.0-9a-zA-Zs,-, ,]$')
      ],

      addressLine2: [
        '',
        [
          Validators.required
        ],
        // Validators.pattern('^[a-zA-Z0-9,-, ,]+( [a-zA-Z0-9,-, ,]+)*$'),
      ],
      city: [
        '',
        [Validators.required],
      ],
      stateId: ['', [Validators.required]],
      pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]+( [0-9]+)*$'),
        ],
      ],
      paymentMode: ['', []],
      addressType: [
        '',
        [Validators.required, Validators.pattern('^[a-z,A-Z, ,]+$')],
      ],
      layout: ['COD'],
    });

    this.promocodeForm = this.fb.group({
      promocode: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')],
      ],
    });

    this.raz_options = {
      key: environment.test_api_key, // Enter the Key ID generated from the Dashboard
      order_id: '',
      name: null,
      amount: '',
      currency: 'INR',
      handler: (res: any) => {
        console.log("res", res)
      },
      theme: {
        color: '#3399cc',
      },
    };
  }

  get f() {
    return this.promocodeForm.controls;
  }

  timeout() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.userData.getLocation();
    this.getCart();

    let user1: any = localStorage.getItem('user');

    let userObj = JSON.parse(user1);

    let data = userObj.data;

    this.checkOutForm = this.fb.group({
      fullName: [
        '',
        [Validators.required],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      addressLine1: [
        '',
        [
          Validators.required
        ],
      ],
      addressLine2: [
        '',
        [
          Validators.required
        ],
      ],
      city: [
        '',
        [Validators.required],
      ],
      stateId: ['', [Validators.required]],
      pincode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]+( [0-9]+)*$'),
        ],
      ],
      paymentMode: ['', []],
      addressType: [
        '',
        [Validators.required, Validators.pattern('^[a-z,A-Z, ,]+$')],
      ],
      layout: ['COD'],
    });

    this.stateList();
  }

  stateList() {
    this.userData.states().subscribe(
      (response: any) => {
        //console.log('response', response);
        this.result = 'Data not found';
        this.isLoading = false;
        // this.clicked = false;
      },
      (error: any) => {
        let errors = error.error;
        //this.userData.getremove();
        console.log('err', errors);

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          console.warn(a);
          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.states = a.data.stateList;
              //this.result4 = a.message;
              //let n = a.data;
              //console.warn('n', n);
              //console.log('this.result2', this.result2);
            } else {
              //this.isLoading = false;
              //this.result3 = a.message;
              //this.clicked = false;
            }
          } else {
            //this.isLoading = false;
            //this.result3 = a.message;
            //this.clicked = false;
          }
        } else {
          //this.isLoading = false;
          let b = this.userData.get(errors);
          //console.log('b', b.message);
          //this.result3 = b.message;

          //this.clicked = false;
        }
      }
    );
  }

  get errorCtr() {
    return this.checkOutForm.controls;
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  promo(value: any) {
    this.promocode = value;
    //this.userData.setPromocodes(value);
  }

  promocodes(data: any) {
    console.log(data);
    this.isLoading = true;
    this.userData.promocodes(data).subscribe(
      (response: any) => {
        //console.log('response', response);
        this.result = 'Data not found';
        this.isLoading = false;
        // this.clicked = false;
      },
      (error: any) => {
        let errors = error.error;
        //this.userData.getremove();
        console.log('err', errors);

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          console.warn(a);
          if (error.error.text) {
            if (a.status === 'Success') {
              this.isLoading = false;
              this.result4 = a.message;
              let n = a.data;
              console.warn('n', n);
              console.log('this.result2', this.result2);
            } else {
              this.isLoading = false;
              this.result3 = a.message;
              //this.clicked = false;
            }
          } else {
            this.isLoading = false;
            this.result3 = a.message;
            //this.clicked = false;
          }
        } else {
          this.isLoading = false;
          let b = this.userData.get(errors);
          console.log('b', b.message);
          this.result3 = b.message;

          //this.clicked = false;
        }
      }
    );
  }

  ngAfterViewInit(): void {
    const script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.text = `
    $(".payment_img").click(function(){
      $('input[name="layout"]').prop('checked', false);
      $(this).closest('input').prop('checked', true);
    });

    `;
    this._renderer2.appendChild(this._document.body, script);
    // $("#checkout_frm").submit(function(event){
    //   event.preventDefault();
    // });
    // $('input[name="layout"]').click(function(){
    //   $('input[name="layout"]').prop('checked', false);
    //   // console.log($(this).closest('input'));
    //   $(this).closest('input').prop('checked', true);
    //   $(this).unbind('submit').submit();
    // });

    // script.text = `$("#checkout_frm").submit(function(event){event.preventDefault();alert("hi");});`;
  }

  getCart() {
    this.userData.getCart().subscribe(
      (response: any) => {
        //console.log('response', response);
        this.result = 'Data not found';
        // this.clicked = false;
      },
      (error: any) => {
        let errors = error.error;
        //this.userData.getremove();
        //console.log('err',errors);

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              //console.warn(a);
              this.result2 = a.data;
              this.userData.subTotal(this.result2.Pricing.subtotal);
              console.log(this.result2);
            } else {
              this.result = a.message;
              //this.clicked = false;
            }
          } else {
            this.result = a.message;
            //this.clicked = false;
          }
        } else {
          let b = this.userData.get(errors);
          //console.log('b', b.message);
          this.result = b.message;
          //this.clicked = false;
        }
      }
    );
  }

  checkOut(data: any) {
    if (this.promocode == undefined) {
      this.promocode = '';
    } else if (this.result4 != 'Promocode applied successfully.') {
      this.promocode = '';
    }

    console.log('hello');

    this.submitted = true;
    data.paymentMode = data.layout;
    this.userData.getLocation();

    if (this.checkOutForm.valid) {
      this.isLoading = true;
      console.log('hello');

      const data1 = {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        stateId: data.stateId,
        pincode: data.pincode,
        paymentMode: data.paymentMode,
        addressType: data.addressType,
        promocode: this.promocode,
      };

      this.userData.checkOut(data1).subscribe(
        (response) => {
          this.result = 'Data not found';
          this.isLoading = false;
          // this.clicked = false;
        },
        (error) => {
          let errors = error.error;
          console.log(errors);
          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);
            console.log(a);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result9 = a.message;
                console.log(this.result9);

                this.userData.setOrderId(this.result9);
                localStorage.setItem("orderMessage", this.result9)
                console.log("a.data", a.data)
                if (a.data.paymentGatewayId) {
                  let order_id = a.data.orderId;
                  this.paymentGatewayId = a.data.paymentGatewayId;
                  localStorage.setItem("paymentGatewayId", this.paymentGatewayId)
                  if (
                    !this.razorpay_prevented_methods.includes(data.paymentMode)
                  ) {
                    // this.raz_options.key = a.data.keyID;
                    // this.raz_options.amount = parseInt(a.data.otherData.order_amount) * 100;
                    // this.raz_options.currency = a.data.otherData.order_currency;
                    // this.raz_options.order_id = order_id;
                    // this.raz_options.name = data.fullName;
                    // this.raz_options.callback_url = 'https://nirmalinfo.com/' + '#' + '/e-commerce/thankyou/';
                    // this.raz_options.return_url = 'https://nirmalinfo.com/' + '#' + '/e-commerce/thankyou/';
                    // this.raz_options.handler = this.handlePaymentStatus.bind(this);
                    window.location.href = a.data.paymentLink;
                    // window.open(a.data.paymentLink)
                    // this.initPay();
                  } else {
                    window.location.href =
                      window.origin + '/#' + '/thankyou/';
                  }
                } else {
                  window.location.href =
                    window.origin + '/#' + '/thankyou/';
                }
                console.log(this.result);
              } else {
                this.result = a.message;
              }
            } else {
              this.result = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result = b.message;
            console.log(this.result);
          }
          console.log(this.result);
          console.log(error);
        }
      );
      this.isLoading = false;
    }
  }

  setPayMethod(method: any) {
    this.pay_method = method.target.value;
  }

  handlePaymentStatus(response: any) {
    console.log("response123456789", response)
    this.isLoading = true;
    console.log('hit2');
    let payment_id = response.razorpay_payment_id;
    let order_id = response.razorpay_order_id;
    let signature = response.razorpay_signature;

    if (this.paymentGatewayId != null) {
      this.userData.payment_status(this.paymentGatewayId).subscribe(
        (response) => {

          this.isLoading = false;
          this.result = 'Data not found';

        },
        (error) => {
          let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);


            if (error.error.text) {
              if (a.status === 'Success') {
                this.result = a.message;


                this.userData.setOrderId(this.result);
                this.isLoading = false;

                this.route.navigate(['/thankyou'], {
                  skipLocationChange: true,
                });


                let url = '/thankyou';

                window.location.href =
                  window.origin + '/#' + '/thankyou/';

              } else if (response.status === 'Pending') {
                this.interval = setInterval(() => {
                  if (!this.returnabledata) {
                    this.checkstatus();
                  } else {
                    this.destroyInterval();
                  }
                }, 10);
              } else {
                this.result = a.message;
              }
            } else {
              this.result = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.result = b.message;

          }

        }
      );
      this.isLoading = false;
    }

  }

  public initPay(): void {
    console.log("this.ra ", this.raz_options)
    this.rzp1 = new this.comm_ser.nativeWindow.Razorpay(this.raz_options);
    this.rzp1.open();
    this.rzp1.on(
      'payment.failed',
      function (this: ProductCheckoutComponent, response: any) {
        let payment_id = response.error.metadata.payment_id;
        if (this.paymentGatewayId != null) {
          this.userData.payment_status(this.paymentGatewayId).subscribe(
            (response: any) => {


              this.result = 'Data not found';
              // this.clicked = false;
            },
            (error: any) => {
              let errors = error.error;

              if (error.status === 200) {
                let result2 = error.error.text;
                let response = this.userData.get(result2);


                if (error.error.text) {
                  if (response.status === 'Success') {
                    this.isLoading = true;
                    this.result = response.message;
                    this.userData.setOrderId(this.result);


                    this.isLoading = false;
                  } else {
                    this.result = response.message;
                  }

                } else {
                  let b = this.userData.get(errors);
                  this.result = b.message;

                }
              } else {
                let b = this.userData.get(errors);
                this.result = b.message;

              }
            }
          );
        }

      }
    );
  }
  checkstatus(): void {
    this.userData.payment_status(this.paymentGatewayId).subscribe(
      (response: any) => {


        this.result = 'Data not found';

      },
      (error: any) => {
        let errors = error.error;

        if (error.status === 200) {
          let result2 = error.error.text;
          let response = this.userData.get(result2);


          if (error.error.text) {
            if (response.status === 'Success') {
              this.returnabledata = true;
            } else if (response.status === 'Pending') {
              this.returnabledata = false;
            } else {
              this.returnabledata = true;
            }

          } else {
            this.returnabledata = true;
          }
        } else {
          let b = this.userData.get(errors);
          this.result = b.message;

        }
      }
    );
  }

  destroyInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
