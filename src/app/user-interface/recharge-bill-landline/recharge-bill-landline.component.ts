import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';

@Component({
  selector: 'app-recharge-bill-landline',
  templateUrl: './recharge-bill-landline.component.html',
  styleUrls: ['./recharge-bill-landline.component.css'],
})
export class RechargeBillLandlineComponent implements OnInit {
  result: any = '';
  result2: any = [];
  clicked: any = '';
  inputarr: any = [];
  inputavail: boolean = false;
  validatorArray: any = [];
  form: any;
  removeValue: any = [];
  msg: boolean = false;
  show: boolean = false;
  field: any;
  operator: any;
  NameArray: any = [];
  element: any;
  submitted: boolean = false;
  numberValue: any;
  likeQuote: any;
  Bill: boolean = true;
  result3: any = '';
  isLoading = false;
  fieldName: any;
  data2: any;
  keys: any;
  RechargeFormData: any;
  amounts: boolean = false;
  ValidationMsg: boolean = true;
  login: boolean = false;
  isBillAmount: boolean = false;
  rechargeBillLandline: FormGroup = new FormGroup({});

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData1: RechargeApiServicesService
  ) {
    this.rechargeBillLandline = this.fb.group({
      operator: ['', [Validators.required]],
      amount: ['', []],
      MobileNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        ],
      ],
    });
    if (localStorage.getItem('user')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  processBar() {
    this.isLoading = true;
  }

  get getForm() {
    return this.rechargeBillLandline.controls;
  }

  billLandline(formData: any) {
    this.submitted = true;
    this.ValidationMsg = true;
    this.RechargeFormData = formData;
    if (this.rechargeBillLandline.valid) {
      const data = { ...formData };
      const operator = data.operator;
      const MobileNumber = data.MobileNumber;
      const amount = data.amount;
      delete data.operator;
      delete data.MobileNumber;
      delete data.amount;

      if (this.show == false) {
        this.data2 = '';
        this.processBar();

        this.data2 = {
          operator: operator,
          customerNo: MobileNumber,
          amount: amount,
        };
        this.keys = Object.keys(data);
        for (let i = 0; i < this.keys.length; i++) {
          this.data2['field' + (i + 1)] = data[this.keys[i]];
        }

        this.userData1.fetchBill(this.data2).subscribe(
          (response) => {
            this.result = 'Data not found';
            // this.clicked = false;
          },
          (error) => {
            let errors = error.error;

            if (error.status === 200) {
              let result1 = error.error.text;
              let a = this.userData1.get(result1);

              if (error.error.text) {
                if (a.status === 'Success') {
                  this.isBillAmount = true;
                  this.result3 = a.data.billDetails;
                  this.Bill = false;
                  this.isLoading = false;
                } else {
                  this.result = a.message;
                  this.isLoading = false;
                }
              } else {
                this.result = a.message;
                this.isLoading = false;
              }
            } else {
              let b = this.userData1.get(errors);
              this.result = b.message;
              this.isLoading = false;
            }
          }
        );
      } else {
        this.data2 = '';

        this.data2 = {
          operator: operator,
          customerNo: MobileNumber,
          amount: amount,
        };
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          this.data2['field' + (i + 1)] = data[keys[i]];
        }

        this.userData1.setBillPaymentField(this.RechargeFormData);
        this.userData1.setpromocodeType('Electricity');
        this.userData1.setBillPaymentFieldValue(this.data2);

        this.route.navigate(['/orderSummary']);
      }
    } else {
      //this.result = 'Data not Found';
    }
  }

  billPayment(value: any) {
    this.userData1.setBillPaymentAmount(value);

    this.userData1.setBillPaymentField(this.RechargeFormData);

    this.userData1.setBillPaymentFieldValue(this.data2);
    this.userData1.setpromocodeType('Electricity');

    this.route.navigate(['/orderSummary']);
  }

  ngOnInit(): void {
    let data = 'LL';
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
              for (let i = 0; i < a.data.Operators.length; i++) {
                if (a.data.Operators[i]['inputFields'].length > 0) {
                  this.result2.push(a.data.Operators[i]);
                }
              }
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

  operatorsId(value: any) {
    this.ValidationMsg = false;
    let temp1: any;
    this.inputarr = [];
    //this.validatorArray = [];
    this.previousControls.forEach((e: string) => {
      this.rechargeBillLandline.removeControl(e);
    });
    this.operator = this.result2.find((e: any) => e.operatorId == value);

    if (this.operator.fetchBill != 'Yes') {
      this.show = true;
    } else {
      this.show = false;
    }

    this.test1(this.operator);
    this.rechargeBillLandline.removeControl(this.removeValue);
  }

  previousControls: string[] = [];
  test1(element: any) {
    let fields: any[] = [];
    // this.result2
    // this.result2.forEach((element:any) => {
    let item = {} as any;
    item = element;
    this.inputavail = false;
    this.msg = true;
    this.inputarr = element?.inputFields;
    this.inputarr.forEach((input: any) => {
      this.inputavail = true;
      item.Validators = [];
      item.detail = input;
      if (input.maxLength && input.maxLength < 0) {
        item.Validators.push(Validators.maxLength(input.maxLength));
        input.error = 'maxLength Error';
      }
      if (input.minLength && input.minLength < 0) {
        item.Validators.push(Validators.minLength(input.minLength));
        input.error = 'minLength Error';
      }
      if (input.regEx) {
        item.Validators.push(Validators.pattern(input.regEx));
        input.error = 'pattern Error';
      }
      // form.controls[input.Name].addValidators(item.Validators);
      this.rechargeBillLandline.addControl(
        input.Name,
        new FormControl('', item.Validators)
      );
      this.previousControls.push(input.Name);
    });
    // });
    // this.rechargeBillLandline.removeControl('dynamic');
  }
}
