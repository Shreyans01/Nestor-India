import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  result: any = '';
  result2: any = '';
  result3: any = '';
  clicked: any = '';
  orderId: any = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userData: ApiServicesService
  ) {}

  orders() {
    
    this.route.queryParamMap.subscribe((params) => {
      this.orderId = params.get('orderId');
    });
  }

  ngOnInit(): void {

    this.orders();
    
    this.userData.orderDetails(this.orderId).subscribe(
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
    
              this.result2 = a.data.items;
              this.result3 = a.data.orderSummary;
    
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
