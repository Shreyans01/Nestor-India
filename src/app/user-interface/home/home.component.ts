import { RechargeApiServicesService } from './../../services/recharge-api-services.service';
import {
  AfterViewInit,
  OnDestroy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';
import { Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  /* @ViewChild('dTable', { static: false }) table: any; */
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild(DataTableDirective, { static: false })
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dataTable: any;
  Value: string = '';
  result: any = '';
  result2: any = '';
  result3: any = [];
  clicked: any = '';
  b: any = '';
  c: any = '';
  operatorId: any = '';
  MobileNo: any = '';
  searchText: any;
  login = false;
  plansAmount: any = '';
  amountValid: boolean = false;
  url: any = '';
  show: boolean = false;
  isLoading = false;
  submitted: boolean = false;
  numberValue: any;
  likeQuote: any;
  Bill: boolean = true;
  operator: any;
  operatorName: any;
  plans: any = "";
  search: any = "";


  rechargeBillMobile: FormGroup = new FormGroup({});

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private userData1: RechargeApiServicesService,
    private rendrer: Renderer2,
    private http: HttpClient
  ) {
    this.url = this.route.url;
    this.rechargeBillMobile = this.fb.group({
      rechargeBillpayment: ['', [Validators.required]],
      MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      operator: ['', [Validators.required]],
      amount: [
        this.plansAmount,
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
    });
    this.rechargeBillMobile.get('amount')?.valueChanges.subscribe((x) => {
      this.amountValid = true;
    });
  }

  close() {
    this.plans = '';
    this.search = '';
    this.searchText = '';
  }

  RechargePlan(value: any) {

    this.Value = '';
    this.plansAmount = value;
    this.amountValid = true;
    this.closeModal();
    this.rechargeBillMobile.get('amount')?.setValue(this.plansAmount);
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  billMobile(data: any) {
    this.submitted = true;
    this.operatorName = this.result2.find(
      (e: any) => e.operatorId == this.operatorId
    );

    this.userData1.setpromocodeType('Mobile');
    if (this.rechargeBillMobile.valid) {
      this.isLoading = true;
      let data1: any = {
        MobileNumber: data.MobileNumber,
        operator: data.operator,
        amount: data.amount,
        'operator Name': this.operatorName.operatorName,
        value: true,
      };

      this.userData1.setBillPaymentField(data1);
      this.isLoading = false;
      this.route.navigate(['/orderSummary']);
    }
  }

  appendScript() {
    const script = this.rendrer.createElement('script');
    script.src = './node_modules/datatables.net/js/jquery.dataTables.js';
    document.body.appendChild(script);

    const script1 = this.rendrer.createElement('script');
    script.src = './node_modules/bootstrap/dist/js/bootstrap.js';
    document.body.appendChild(script1);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: false,
    };

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
    return this.rechargeBillMobile.controls;
  }

  operaId(value: any) {
    this.operatorId = value;
  }
  Mobile(value: any) {
    this.MobileNo = value;
  }

  MobileRecharge(value: any) {
    if (value == 'prepaid') {
      let data = 'Mobile';
      this.userData1.operators(data).subscribe(
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
                this.result2 = a.data.Operators;
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
      let data = 'PP';
      this.userData1.operators(data).subscribe(
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
                this.result2 = a.data.Operators;
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
    }
  }

  MobilePlans() {


    this.result3 = [];
    this.c = [];
    this.plans = '';
    this.searchText = '';
    let data1: any = {
      operatorId: this.operatorId,
      MobileNo: this.MobileNo,
    };

    if (localStorage.getItem('user')) {
      this.isLoading = true;
      this.userData1.MobilePlans1(data1).subscribe(
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
                this.result3 = [];
                this.c = [];
                this.b = a.data.Plans;
                this.result3 = this.b
                  .map((item: any) => item.type)
                  .filter(
                    (value: any, index: any, self: any) =>
                      self.indexOf(value) === index
                  );
                this.c = this.b;

                this.dtTrigger.next();
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
            this.isLoading = false;
            let b = this.userData1.get(errors);

            this.result = b.message;
          }
        }
      );
    } else {
      this.isLoading = true;
      this.userData1.MobilePlans(data1).subscribe(
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
                this.isLoading = false;
                this.result = a.message;
              } else {
                this.isLoading = false;
                this.result = a.message;
              }
            } else {
              this.isLoading = false;
              this.result = a.message;
            }
          } else {
            this.isLoading = false;
            let b = this.userData1.get(errors);
            this.result = b.message;
          }
        }
      );
    }
  }

  MobilePlans1(data: any) {
    //this.c = this.c;
    this.c = [];

    this.c = this.b
      .map((item: any) => item)
      .filter((obj: any) => obj.type === data);
  }
}
