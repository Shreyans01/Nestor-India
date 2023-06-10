import { Component, OnInit, Renderer2, Inject, OnDestroy } from '@angular/core';
import { BookingApiService } from 'src/app/services/booking-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';
import { environment } from 'src/environments/environment';
import { RouterModule, Routes, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT } from '@angular/common';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-bus-seat-booking-payment',
  templateUrl: './bus-seat-booking-payment.component.html',
  styleUrls: ['./bus-seat-booking-payment.component.css'],
})
export class BusSeatBookingPaymentComponent implements OnInit,OnDestroy {
  blockedSeatValue: any = '';
  rupee_sym: any;
  razorpay_prevented_methods = ['Wallet'];
  wallet: boolean = false;
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
  promocode: any;
  data: any;
  promocodeType: any;
  result: any = '';
  result1: any = '';
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result7: any = '';
  result8: any = '';
  busBookSeatMsg: any = '';


  PaymentForm: FormGroup = new FormGroup({});
  constructor(
    private bookingServiceApi: BookingApiService,
    private route: Router,
    private fb: FormBuilder,
    private comm_ser: CommonService,
    private _renderer2: Renderer2,
    private Notification: NotificationServiceService,
    private userData: ApiServicesService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.PaymentForm = this.fb.group({
      layout: ['', [Validators.required]],
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

  ngOnInit(): void {

    

    const BlockSeatBlocked: any = localStorage.getItem('BlockSeatBlocked');
    const blockedSeat = JSON.parse(BlockSeatBlocked);

    if (blockedSeat) {
      this.blockedSeatValue = blockedSeat;
      localStorage.setItem(
        'blockedSeatValue',
        JSON.stringify(this.blockedSeatValue)
      );
    } else {
      const data: any = localStorage.getItem('blockedSeatValue');
      this.blockedSeatValue = JSON.parse(data);
    }
    

    this.userData.profile().subscribe(
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
              
              const balance = a.data.balance;
              if (balance) {
                this.result7 = balance;
                localStorage.setItem('balance', JSON.stringify(balance));
              } else {
                
                const data: any = localStorage.getItem('balance');
                this.result7 = JSON.parse(data);
              }
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

    if (this.result7 < this.blockedSeatValue.totalFare) {
      this.wallet = true;
    }
    else
    {
      this.wallet = false;
    }

    

    const busbooking = localStorage.getItem('busbookingSeatMessage');
    if(busbooking)
    {
      this.busBookSeatMsg = busbooking;
      localStorage.setItem(
        'busBookSeatMsg',
        JSON.stringify(this.busBookSeatMsg)
      );
    }
    else{
      const data: any = localStorage.getItem('busBookSeatMsg');
      this.busBookSeatMsg = JSON.parse(data);
    }
  }

  payment(data1: any) {

    let btn_element = document.getElementById('payment');

    this.promocode = localStorage.getItem('promocode');


    

    let data = {
      ticketId: this.blockedSeatValue.ticketId,
      paymentMode: data1.layout,
      promocode: this.promocode,
    };

    if (data1.layout == 'Wallet') {
      btn_element?.classList.add('button--loading');
      this.isLoading = true;
      
      
      let data = this.blockedSeatValue.ticketId;
      this.bookingServiceApi.bookSeat(data).subscribe(
        (response) => {
          
          
          this.result = 'Data not found';
        },
        (error) => {
          let errors = error.error;
          
          
          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);

            if (error.error.text) {
              if (a.status === 'Success') {
                
                localStorage.setItem('bookedSeatmsg', JSON.stringify(a));
                
                this.result8 = a.message;
                btn_element?.classList.remove('button--loading');
                this.Notification.showSuccess(this.result8, '');
                this.route.navigate(['/booking/thankyou']);
                
              } else {
                this.isLoading = false;
                this.result = a.message;
                btn_element?.classList.remove('button--loading');
                this.Notification.showError(this.result,{});
              }
            } else {
              this.isLoading = false;
              this.result = a.message;
              btn_element?.classList.remove('button--loading');
              this.Notification.showError(this.result, {});
            }
          } else {
            this.isLoading = false;
            let b = this.bookingServiceApi.get(errors);
            this.result = b.message;
            btn_element?.classList.remove('button--loading');
            this.Notification.showError(this.result, {});
          }
        }
      );

    }
    else
    {
      btn_element?.classList.add('button--loading');
      this.isLoading = true;
      this.bookingServiceApi.doPayment(data).subscribe(
        (response: any) => {
          this.result = 'Data not found';
          this.isLoading = false;
          btn_element?.classList.remove('button--loading');
        },
        (error: any) => {
          let errors = error.error;
  
          if (error.status === 200) {
            let result1 = error.error.text;
            let a = this.bookingServiceApi.get(result1);
  
            if (error.error.text) {
              if (a.status === 'Success') {
                
                let order_id = a.data.referenceId;
                
  
                this.paymentGatewayId = a.data.paymentGatewayId;
                let keyID = a.data.keyID;
  
                if (!this.razorpay_prevented_methods.includes(data1.layout)) {
  
                  this.raz_options.order_id = order_id;
  
                  this.isLoading = false;
  
                  this.initPay();
                } else {
                  this.isLoading = false;
                  let msg = a.message;
                  btn_element?.classList.remove('button--loading');
                  window.location.href =
                    window.origin + '/#' + '/booking/thankyou';
                  this.Notification.showSuccess(msg, '');
                } 
              } else {
                this.isLoading = false;
  
                this.result3 = a.message;
                btn_element?.classList.remove('button--loading');
                this.Notification.showError(this.result3, '');
              }
            } else {
              this.isLoading = false;
  
              this.result3 = a.message;
              btn_element?.classList.remove('button--loading');
              this.Notification.showError(this.result3, '');
            }
          } else {
            this.isLoading = false;
  
            let b = this.bookingServiceApi.get(errors);
  
            this.result3 = b.message;
            btn_element?.classList.remove('button--loading');
            this.Notification.showError(this.result3, '');
          }
        }
      );
    }

  }

  get getForm() {
    return this.PaymentForm.controls;
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

    /* localStorage.removeItem('busBookSeatMsg');
    localStorage.removeItem('blockedSeatValue');
    localStorage.removeItem('balance'); */

  }

   handlePaymentStatus(response: any) {
     
    let payment_id = response.razorpay_payment_id;
    let order_id = response.razorpay_order_id;
    
    let signature = response.razorpay_signature;

    if (this.paymentGatewayId != null) {
      this.isLoading = true;
     
     
     let btn_element = document.getElementById('payment');
     btn_element?.classList.add('button--loading');
      this.bookingServiceApi.payment_status(this.paymentGatewayId).subscribe(
        (response) => {
          this.result = 'Data not found';
          
        },
        (error) => {
          this.isLoading = false;
          btn_element?.classList.remove('button--loading');
          let errors = error.error;
          
          
          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.bookingServiceApi.get(result2);

            if (error.error.text) {
              if (a.status === 'Success') {
                
                
                localStorage.setItem('bookedSeatmsg', JSON.stringify(a));
                this.result = a.message;
                
                
                this.Notification.showSuccess(this.result, '');
                let orderId = a.data.orderId;

                
                
                this.route.navigate(['/booking/thankyou'], {
                  skipLocationChange: true,
                });

                let url = '/booking/thankyou';

                window.location.href =
                  window.origin + '/#' + '/booking/thankyou';
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
                this.isLoading = false;
                btn_element?.classList.remove('button--loading');
                this.Notification.showError(this.result, {});
              }
            } else {
              this.result = a.message;
              this.isLoading = false;
              btn_element?.classList.remove('button--loading');
              this.Notification.showError(this.result, {});
            }
          } else {
            let b = this.bookingServiceApi.get(errors);
            this.result = b.message;
            this.isLoading = false;
            btn_element?.classList.remove('button--loading');
            this.Notification.showError(this.result, {});
          }
        }
      );
    } else {
    }
  }

  public initPay(): void {
   
     
     let btn_element = document.getElementById('payment');
     btn_element?.classList.add('button--loading');
    this.rzp1 = new this.comm_ser.nativeWindow.Razorpay(this.raz_options);
    this.rzp1.open();
    this.rzp1.on(
      'payment.failed',
      function (this: BusSeatBookingPaymentComponent, response: any) {
        let payment_id = response.error.metadata.payment_id;
        if (this.paymentGatewayId != null) {
          this.isLoading = true;
          
          
          let btn_element = document.getElementById('payment');
          btn_element?.classList.add('button--loading');
          this.bookingServiceApi
            .payment_status(this.paymentGatewayId)
            .subscribe(
              (response: any) => {
                this.result = 'Data not found';
                
              },
              (error: any) => {
                this.isLoading = false;
                btn_element?.classList.remove('button--loading');
                let errors = error.error;
                if (error.status === 200) {
                  let result2 = error.error.text;
                  let response = this.bookingServiceApi.get(result2);

                  if (error.error.text) {
                    if (response.status === 'Success') {
                      
                      this.result = response.message;
                      this.isLoading = false;
                      btn_element?.classList.remove('button--loading');
                      this.Notification.showSuccess(this.result, {});
                    } else {
                      this.result = response.message;
                      this.Notification.showError(this.result, {});
                    }
                  } else {
                    let b = this.bookingServiceApi.get(errors);
                    this.result = b.message;
                    this.Notification.showError(this.result, {});
                  }
                } else {
                  let b = this.bookingServiceApi.get(errors);
                  this.result = b.message;
                  this.Notification.showError(this.result, {});
                }
              }
            );
        }
      }
    );
  }

  checkstatus(): void {
    this.isLoading = true;
    
    
    let btn_element = document.getElementById('payment');
    btn_element?.classList.add('button--loading');
    this.bookingServiceApi.payment_status(this.paymentGatewayId).subscribe(
      (response: any) => {
        this.result = 'Data not found';
        
      },
      (error: any) => {
        this.isLoading = false;
        btn_element?.classList.add('button--loading');
        let errors = error.error;
        if (error.status === 200) {
          let result2 = error.error.text;
          let response = this.bookingServiceApi.get(result2);

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
          let b = this.bookingServiceApi.get(errors);
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
