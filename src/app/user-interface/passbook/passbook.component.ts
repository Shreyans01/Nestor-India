import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from './../../services/api-services.service';
import { RechargeApiServicesService } from './../../services/recharge-api-services.service';
import * as dayjs from 'dayjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-passbook',
  templateUrl: './passbook.component.html',
  styleUrls: ['./passbook.component.css'],
})
export class PassbookComponent implements OnInit {
  result: any;
  result2: any = [];
  result4: any;
  rupee_sym: any;
  isLoading = false;
  msg: boolean = true;
  constructor(
    private userData1: RechargeApiServicesService,
    private userData: ApiServicesService,
    private comm_ser: CommonService
  ) {
    this.rupee_sym = this.comm_ser.rupee_symbol;
  }

  ngOnInit(): void {}

  passbook(value: any) {
    this.isLoading = true;
    this.result = '';
    this.userData1.passbook(value).subscribe(
      (response) => {
        this.result = 'Data not found';
        this.isLoading = false;
        this.msg = false;
      },
      (error) => {
        let errors = error.error;
        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData1.get(result1);
          if (error.error.text) {
            if (a.status === 'Success') {
              this.msg = false;
              let result3 = a.data.Passbook;
              for (let index = 0; index < result3.length; index++) {
                const element = result3[index];
                if (element.datetime != '') {
                  this.result2.push(element);
                }
              }
              this.isLoading = false;
            } else {
              this.msg = false;
              this.result = a.message;
              this.isLoading = false;
            }
          } else {
            this.msg = false;
            this.result = a.message;
            this.isLoading = false;
          }
        } else {
          this.msg = false;
          this.isLoading = false;
          let b = this.userData1.get(errors);
          this.result = b.message;
        }
      }
    );
  }
}
