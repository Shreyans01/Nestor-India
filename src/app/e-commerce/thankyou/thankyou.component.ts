import { ApiServicesService } from 'src/app/services/api-services.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
})
export class ThankyouComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  orderMsg: any;
  orderDetails: any;
  isLoader: boolean;
  userDetails: any;
  constructor(private userData: ApiServicesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("1111111111111111111111111111111")
    const order = this.userData.getOrderId();
    this.route.queryParams.subscribe(params => {
      if (params.orderDetails) {
        this.orderDetails = JSON.parse(params.orderDetails);
        if (this.orderDetails) {
          this.isLoader = true;
          this.handlePaymentStatus();
        }
      }
      else {
        if (order) {
          this.orderMsg = order;
          localStorage.setItem('orderMsg', JSON.stringify(this.orderMsg));
        } else {
          const data: any = localStorage.getItem('orderMsg');
          this.orderMsg = JSON.parse(data);
        }
      }
    })

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

  handlePaymentStatus() {
    if (this.orderDetails.refId != null) {
      this.isLoading = true;
      this.userData.payment_status(this.orderDetails.refId).subscribe(
        (response) => {
          this.orderMsg = 'Data not found';
        },
        (error) => {
          this.isLoader = false;
            let errors = error.error;

          if (error.status === 200) {
            let result2 = error.error.text;
            let a = this.userData.get(result2);


            if (error.error.text) {
              if (a.status === 'Success') {
                this.orderMsg = a.message;


                this.userData.setOrderId(this.orderMsg);
                this.isLoading = false;

                window.location.href =
                  window.origin + '/#' + '/thankyou/';

              }
              else {
                this.orderMsg = a.message;
              }
            } else {
              this.orderMsg = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData.get(errors);
            this.orderMsg = b.message;

          }

        }
      );
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('busBookSeatMsg');
  }
}
