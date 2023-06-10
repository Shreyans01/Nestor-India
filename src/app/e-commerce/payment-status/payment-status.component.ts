import { Component, OnInit, OnDestroy, Renderer2, Inject, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';
@Component({
    selector: 'app-payment-status',
    templateUrl: './payment-status.component.html',
    styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userData: ApiServicesService

    ) {
    }


    ngOnInit(): void {
        // window.location.href = '/thankyou'
        // this.router.navigate([this.router.url]);
        console.log(localStorage.getItem("user"))
        this.route.queryParams.subscribe(params => {
            console.log("PARAMS",params['orderId']);
            var orderText = 'Thank you for your order. Your order number is' + ' ' + params.orderId;
            this.userData.setOrderId(orderText);
            // window.location.href = '/e-commerce/thankyou';            
            this.router.navigate(['/thankyou'],{queryParams:{orderDetails:JSON.stringify(params)}});
        });
    }

    handlePaymentStatus() {}
}