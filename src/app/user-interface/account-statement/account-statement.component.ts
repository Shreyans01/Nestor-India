import { ApiServicesService } from './../../services/api-services.service';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';
import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
})
export class AccountStatementComponent implements OnInit {
  result: any;
  result2: any;
  result4: any;
  rupee_sym: any;
  isLoading = false;
  ngOnInit(): void {
    this.userData1.accountStatement(this.currentDate).subscribe(
      (response) => {
        this.result = 'Data not found';
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData1.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.result2 = a.data.AccountStatement.Transactions;
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
              this.result4 = a.data.balance;
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
  currentDate = new Date();

  constructor(
    private userData1: RechargeApiServicesService,
    private userData: ApiServicesService,
    private comm_ser: CommonService
  ) {
    this.rupee_sym = this.comm_ser.rupee_symbol;
  }

  accountStatement(value: any) {
    this.isLoading = true;
    this.result = '';
    this.userData1.accountStatement(value).subscribe(
      (response) => {
        this.result = 'Data not found';
        this.isLoading = false;
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData1.get(result1);
          if (error.error.text) {
            if (a.status === 'Success') {
              this.result2 = a.data.AccountStatement.Transactions;
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
  }
}
