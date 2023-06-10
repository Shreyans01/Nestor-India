import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { NotificationServiceService } from 'src/app/services/notification-service.service';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';

@Component({
  selector: 'app-recharge-bill-dth',
  templateUrl: './recharge-bill-dth.component.html',
  styleUrls: ['./recharge-bill-dth.component.css'],
})
export class RechargeBillDthComponent implements OnInit {
  result: any = '';
  result2: any = '';
  result3: any = '';
  clicked: any = '';
  operatorId: any = '';
  show: boolean = false;
  isLoading = false;
  submitted: boolean = false;
  numberValue: any;
  likeQuote: any;
  Bill: boolean = true;
  operator: any;
  operatorName: any;
  dataView: boolean = true;
  login = false;
  rechargeBillDth: FormGroup = new FormGroup({});
  buttonBlurValidation: boolean = false;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData1: RechargeApiServicesService,
    private notification: NotificationServiceService
  ) {
    this.rechargeBillDth = this.fb.group({
      operator: ['', [Validators.required]],
      SubscribeId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });

    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }


  subjectbeIdValue() {
    this.dataView = true;
  }

  billDth(data: any) {
    this.submitted = true;
    this.operatorName = this.result2.find(
      (e: any) => e.operatorId == this.operatorId
    );
    if (this.rechargeBillDth.valid) {
      this.userData1.setpromocodeType('DTH');
      let data1: any = {
        MobileNumber: data.SubscribeId,
        operator: data.operator,
        amount: data.amount,
        'operator Name': this.operatorName.operatorName,
        value: true,
      };

      this.userData1.setBillPaymentField(data1);
      this.route.navigate(['/orderSummary']);
    }
  }

  processBar() {
    this.isLoading = true;
  }

  get getForm() {
    return this.rechargeBillDth.controls;
  }

  ngOnInit(): void {
    let data = 'DTH';
    this.userData1.operators(data).subscribe(
      (response) => {
        this.result = 'Data not found';
        // this.clicked = false;
      },
      (error) => {
        let errors = error.error;
        //this.userData.getremove();

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData1.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result2 = a.data.Operators;
            } else {
              this.result = a.message;
              //this.clicked = false;
            }
          } else {
            this.result = a.message;
            //this.clicked = false;
          }
        } else {
          let b = this.userData1.get(errors);
          this.result = b.message;
          //this.clicked = false;
        }
      }
    );
  }

  operaId(value: any) {
    this.operatorId = value;
  }

  subscId(value: any) {
    if (this.login) {
      this.dataView = true;

      let data1: any = {
        operatorId: this.operatorId,
        subscribeId: value,
      };

      if (localStorage.getItem('user')) {
        this.userData1.subscribeId1(data1).subscribe(
          (response) => {
            this.result = 'Data not found';
            // this.clicked = false;
          },
          (error) => {
            let errors = error.error;
            //this.userData.getremove();

            if (error.status === 200) {
              let result1 = error.error.text;
              let a = this.userData1.get(result1);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.result3 = a.data;
                  this.buttonBlurValidation = true;
                } else {
                  this.result = a.message;
                  //this.clicked = false;
                }
              } else {
                this.result = a.message;
                //this.clicked = false;
              }
            } else {
              let b = this.userData1.get(errors);
              this.result = b.message;
              //this.clicked = false;
            }
          }
        );
      } else {
        this.userData1.subscribeId(data1).subscribe(
          (response) => {
            this.result = 'Data not found';
            // this.clicked = false;
          },
          (error) => {
            let errors = error.error;
            //this.userData.getremove();

            if (error.status === 200) {
              let result1 = error.error.text;
              let a = this.userData1.get(result1);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.result = a.message;
                } else {
                  this.result = a.message;
                  //this.clicked = false;
                }
              } else {
                this.result = a.message;
                //this.clicked = false;
              }
            } else {
              let b = this.userData1.get(errors);
              this.result = b.message;
              //this.clicked = false;
            }
          }
        );
      }
    } else {
      this.notification.showError('Please Login', '')
    }
  }
}
