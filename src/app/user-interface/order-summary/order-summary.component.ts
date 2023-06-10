import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';
import { environment } from 'src/environments/environment';
import { ApiServicesService } from './../../services/api-services.service';
import { Component, OnInit, OnDestroy, Renderer2, Inject, ElementRef, Input } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT } from '@angular/common';
import { NotificationServiceService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  BillPaymentValue: any;
  BillPaymentField: any;
  BillPaymentFieldValue: any;
  BillPaymentNoFetchFieldValue: any;
  Field: any;
  result4: any;
  result3: any;
  result2: any;
  result: any;
  promocode: any;
  data: any;
  promocodeType: any;
  data1: any;
  field1: any;
  field2: any;
  field3: any;
  field4: any;
  field5: any;
  rupee_sym: any;
  razorpay_prevented_methods = ['Wallet'];
  pay_method: string = '';
  raz_options: any = {};
  rzp1: any;
  address_type = ['Home', 'Office'];
  paymentGatewayId: any;
  interval: any;
  returnabledata: any;
  radio_img: any;
  isLoading: boolean = false;
  submitted: boolean = false;
  promocodValidation: boolean = false;
  promocodeForm: FormGroup = new FormGroup({});
  PaymentForm: FormGroup = new FormGroup({});

  constructor(
    private route: Router,
    private userData1: RechargeApiServicesService,
    private fb: FormBuilder,
    private _renderer2: Renderer2,
    private comm_ser: CommonService,
    private Notification: NotificationServiceService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.promocodeForm = this.fb.group({
      promocode: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')],
      ],
    });

    this.PaymentForm = this.fb.group({
      layout: ['', [Validators.required]],
    });

    this.paymentGatewayId = null;
    this.pay_method = '';
    this.rupee_sym = this.comm_ser.rupee_symbol;

    this.raz_options = {
      key: environment.test_api_key, // Enter the Key ID generated from the Dashboard
      order_id: null, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: this.handlePaymentStatus.bind(this),
      theme: {
        color: '#3399cc',
      },
    };
  }

  get getForm() {
    return this.promocodeForm.controls;
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
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    localStorage.removeItem('BillPaymentValue');
    localStorage.removeItem('BillPaymentField');
    localStorage.removeItem('BillPaymentFieldValue');
    localStorage.removeItem('promocodeType');
  }

  ngOnInit(): void {
    this.BillPaymentValue = '';
    this.BillPaymentField = '';
    this.BillPaymentFieldValue = '';
    this.BillPaymentNoFetchFieldValue = '';
    this.promocodeType = '';


    if (this.userData1.getBillPaymentValue()) {
      this.BillPaymentValue = this.userData1.getBillPaymentValue();

      localStorage.setItem(
        'BillPaymentValue',
        JSON.stringify(this.BillPaymentValue)
      );
    } else {
      const data: any = localStorage.getItem('BillPaymentValue');
      this.BillPaymentValue = JSON.parse(data);
    }

    if (this.userData1.getBillPaymentField()) {
      this.BillPaymentField = this.userData1.getBillPaymentField();
      localStorage.setItem(
        'BillPaymentField',
        JSON.stringify(this.BillPaymentField)
      );
    } else {
      const data1: any = localStorage.getItem('BillPaymentField');
      this.BillPaymentField = JSON.parse(data1);
    }

    if (this.userData1.getBillPaymentFieldValue()) {
      this.BillPaymentFieldValue = this.userData1.getBillPaymentFieldValue();
      localStorage.setItem(
        'BillPaymentFieldValue',
        JSON.stringify(this.BillPaymentFieldValue)
      );
    } else {
      const data2: any = localStorage.getItem('BillPaymentFieldValue');
      this.BillPaymentFieldValue = JSON.parse(data2);
    }

    if (this.userData1.getpromocodeType()) {
      this.promocodeType = this.userData1.getpromocodeType();
      localStorage.setItem('promocodeType', JSON.stringify(this.promocodeType));
    } else {
      const data3: any = localStorage.getItem('promocodeType');
      this.promocodeType = JSON.parse(data3);
    }

    /* this.BillPaymentValue = this.userData1.getBillPaymentValue();
    this.BillPaymentField = this.userData1.getBillPaymentField();
    this.BillPaymentFieldValue = this.userData1.getBillPaymentFieldValue();
    this.promocodeType = this.userData1.getpromocodeType(); */

  }

  promo(value: any) {
    this.userData1.setPromocodes(value);
    this.promocodValidation = false;
  }

  promocodes(data: any) {
    this.submitted = true;
    this.isLoading = true;
    this.promocode = data.promocode;

    if (this.promocodeForm.valid) {
      if (this.BillPaymentField) {
        this.data1 = {
          promocode: this.promocode,
          promocodeType: this.promocodeType,
          operatorId: this.BillPaymentField.operator,
          amount: this.BillPaymentField.amount,
        };
      } else {
        if (!this.BillPaymentValue) {
          this.data1 = {
            promocode: this.promocode,
            promocodeType: this.promocodeType,
            operatorId: this.BillPaymentField.operator,
            amount: this.BillPaymentField.amount,
          };
        } else {
          this.data1 = {
            promocode: this.promocode,
            promocodeType: this.promocodeType,
            operatorId: this.BillPaymentField.operator,
            amount: this.BillPaymentValue,
          };
        }
      }

      this.userData1.promocodes(this.data1).subscribe(
        (response: any) => {
          this.result = 'Data not found';
          // this.clicked = false;
          this.isLoading = false;
        },
        (error: any) => {
          let errors = error.error;
          //this.userData.getremove();

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.userData1.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.isLoading = false;
                this.result4 = a.message;
                this.Notification.showSuccess(this.result4, '');

                let n = a.data;
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

            let b = this.userData1.get(errors);
            this.result3 = b.message;
            this.Notification.showError(this.result3, '');

            //this.clicked = false;
          }
        }
      );
    }
  }

  payment(data1: any) {
    if (this.BillPaymentField.amount > 0 || this.BillPaymentValue > 0) {
      this.promocodValidation = true;
      this.isLoading = true;
      this.result3 = '';
      if (this.promocode == undefined) {
        this.promocode = '';
      } else if (this.result4 != 'Promocode applied successfully.') {
        this.promocode = '';
      }

      if (this.BillPaymentField.amount) {
        if (this.BillPaymentField.field1 == undefined) {
          this.field1 = '';
        } else {
          this.field1 = '';
          this.field1 = this.BillPaymentField.field1;
        }

        if (this.BillPaymentField.field2 == undefined) {
          this.field2 = '';
        } else {
          this.field2 = '';
          this.field2 = this.BillPaymentField.field2;
        }

        if (this.BillPaymentField.field3 == undefined) {
          this.field3 = '';
        } else {
          this.field3 = '';
          this.field3 = this.BillPaymentField.field3;
        }

        if (this.BillPaymentField.field4 == undefined) {
          this.field4 = '';
        } else {
          this.field4 = '';
          this.field4 = this.BillPaymentField.field4;
        }

        if (this.BillPaymentField.field5 == undefined) {
          this.field5 = '';
        } else {
          this.field5 = '';
          this.field5 = this.BillPaymentField.field5;
        }

        this.data = '';
        this.data = {
          operator: this.BillPaymentField.operator,
          customerNo: this.BillPaymentField.MobileNumber,
          field1: this.field1,
          field2: this.field2,
          field3: this.field3,
          field4: this.field4,
          field5: this.field5,
          amount: this.BillPaymentField.amount,
          promocode: this.promocode,
          paymentMode: data1.layout,
        };
      } else {
        if (this.BillPaymentFieldValue.field1 == undefined) {
          this.field1 = '';
        } else {
          this.field1 = '';
          this.field1 = this.BillPaymentFieldValue.field1;
        }

        if (this.BillPaymentFieldValue.field2 == undefined) {
          this.field2 = '';
        } else {
          this.field2 = '';
          this.field2 = this.BillPaymentFieldValue.field2;
        }

        if (this.BillPaymentFieldValue.field3 == undefined) {
          this.field3 = '';
        } else {
          this.field3 = '';
          this.field3 = this.BillPaymentFieldValue.field3;
        }

        if (this.BillPaymentFieldValue.field4 == undefined) {
          this.field4 = '';
        } else {
          this.field4 = '';
          this.field4 = this.BillPaymentFieldValue.field4;
        }

        if (this.BillPaymentFieldValue.field5 == undefined) {
          this.field5 = '';
        } else {
          this.field5 = '';
          this.field5 = this.BillPaymentFieldValue.field5;
        }

        if (!this.BillPaymentValue) {
          this.data = '';
          this.data = {
            operator: this.BillPaymentFieldValue.operator,
            customerNo: this.BillPaymentFieldValue.customerNo,
            field1: this.field1,
            field2: this.field2,
            field3: this.field3,
            field4: this.field4,
            field5: this.field5,
            amount: this.BillPaymentFieldValue.amount,
            promocode: this.promocode,
            paymentMode: data1.layout,
          };
        } else {
          this.data = '';
          this.data = {
            operator: this.BillPaymentFieldValue.operator,
            customerNo: this.BillPaymentFieldValue.customerNo,
            field1: this.field1,
            field2: this.field2,
            field3: this.field3,
            field4: this.field4,
            field5: this.field5,
            amount: this.BillPaymentValue,
            promocode: this.promocode,
            paymentMode: data1.layout,
          };
        }
      }
      this.userData1.payment(this.data).subscribe(
        (response: any) => {
          this.result = 'Data not found';
          this.isLoading = false;
        },
        (error: any) => {
          let errors = error.error;

          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.userData1.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                if (a.message === '') {
                  let order_id = a.data.gatewayResponse.referenceId;

                  this.paymentGatewayId = a.data.gatewayResponse.paymentGatewayId;
                  let keyID = a.data.gatewayResponse.keyID;

                  if (!this.razorpay_prevented_methods.includes(data1.layout)) {
                    this.raz_options.order_id = order_id;
                    this.isLoading = false;

                    this.initPay();
                  } else {
                    window.location.href =
                      window.origin + '/#' + '/thankyou';
                  }
                } else {
                  this.isLoading = false;
                  let msg = a.message;
                  window.location.href =
                    window.origin + '/#' + '/thankyou';
                  this.Notification.showSuccess(msg, '');
                }
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

            let b = this.userData1.get(errors);

            this.result3 = b.message;
            this.Notification.showError(this.result3, '');
          }
        }
      );
    } else {
      this.Notification.showError('Amount is not less then Zero', '')
    }
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

  handlePaymentStatus(response: any) {
    this.processBar();
    let payment_id = response.razorpay_payment_id;
    let order_id = response.razorpay_order_id;
    let signature = response.razorpay_signature;

    if (this.paymentGatewayId != null) {
      this.userData1.payment_status(this.paymentGatewayId).subscribe(
        (response) => {
          this.result = 'Data not found';
          // this.clicked = false;
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData1.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result = a.message;
                let orderId = a.data.orderId;

                this.userData1.setOrderId(orderId);

                this.route.navigate(['/rechargePaymentSuccess'], {
                  skipLocationChange: true,
                });

                let url = '/rechargePaymentSuccess';

                window.location.href =
                  window.origin + '/#' + '/rechargePaymentSuccess';
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
            let b = this.userData1.get(errors);
            this.result = b.message;
          }
        }
      );
    } else {
    }
  }

  public initPay(): void {
    this.rzp1 = new this.comm_ser.nativeWindow.Razorpay(this.raz_options);
    this.rzp1.open();
    this.rzp1.on(
      'payment.failed',
      function (this: OrderSummaryComponent, response: any) {
        let payment_id = response.error.metadata.payment_id;
        if (this.paymentGatewayId != null) {
          this.userData1.payment_status(this.paymentGatewayId).subscribe(
            (response: any) => {
              this.result = 'Data not found';
              // this.clicked = false;
            },
            (error: any) => {
              let errors = error.error;
              if (error.status === 200) {
                let result2 = error.error.text;
                let response = this.userData1.get(result2);

                if (error.error.text) {
                  if (response.status === 'Success') {
                    this.processBar();
                    this.result = response.message;
                  } else {
                    this.result = response.message;
                  }
                } else {
                  let b = this.userData1.get(errors);
                  this.result = b.message;
                }
              } else {
                let b = this.userData1.get(errors);
                this.result = b.message;
              }
            }
          );
        }
      }
    );
  }
  checkstatus(): void {
    this.userData1.payment_status(this.paymentGatewayId).subscribe(
      (response: any) => {
        this.result = 'Data not found';
        // this.clicked = false;
      },
      (error: any) => {
        let errors = error.error;
        if (error.status === 200) {
          let result2 = error.error.text;
          let response = this.userData1.get(result2);

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
          let b = this.userData1.get(errors);
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
