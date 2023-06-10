import { ApiServicesService } from './../../services/api-services.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { NotificationServiceService } from './../../services/notification-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('closeBtn1') closeBtn1!: ElementRef;
  @ViewChild('closeBtn2') closeBtn2!: ElementRef;
  @ViewChild('closeSignUp') closeSignUp!: ElementRef;
  @ViewChild('openBtn')
  openBtn!: ElementRef;
  @ViewChild('openBtn1') openBtn1!: ElementRef;
  @ViewChild('login2') login2!: ElementRef;
  isLoginFlag = new BehaviorSubject<Boolean>(false)
  isLoginObservable = this.isLoginFlag.asObservable();
  result: any = '';
  result1: any = '';
  clicked = false;
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result5: any = '';
  result6: any = '';
  result7: any = '';
  url: any;
  submitted = false;
  submittedLogin = false;
  submittedForgot = false;
  isLoading = false;
  isChecked: boolean = false;
  LoginForm: FormGroup = new FormGroup({});
  SignUpForm: FormGroup;
  ForgotForm: FormGroup = new FormGroup({});
  resetPassword: FormGroup = new FormGroup({});
  otpForm: FormGroup;
  subscription = new Subscription();

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private Notification: NotificationServiceService,
    private comm_ser: CommonService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.url = this.route.url;

    this.LoginForm = this.fb.group({
      username: [
        [],
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(\d{10}|^.+@gmail.com$)$/),
          ]),
        ],
      ],
      // password: [[], [Validators.required]],

      fcmToken: ['123456', []],
      type: ['Angular', []],
      version: ['1', []],
      source: ['NirmalShree', []],
      latitude: ['10', []],
      longitude: ['10', []],
      deviceId: ['', []],
      appVersion: ['', []],
      modelNo: ['', []],
      androidVersion: ['', []],
    });

    this.SignUpForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')],
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      mobileNo: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.ForgotForm = this.fb.group({
      username: [
        [],
        [
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(\d{10}|^.+@gmail.com$)$/),
          ]),
        ],
      ],
    });

    this.resetPassword = this.fb.group({
      otp: [
        [],
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[0-9,]+$'),
        ],
      ],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.otpForm = this.fb.group({
      otp: [
        [],
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[0-9,]+$'),
        ],
      ],
    });
  }
  ngAfterViewInit(): void {
  }

  chekedBox(e: any) {
    if (e.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  ngOnInit(): void {
    console.log("BBBBBBBBBBBBBBBBBb")
  }

  private loginModal(): void {
    this.login2.nativeElement.click();
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
  }

  private closeModal2(): void {
    this.closeBtn2.nativeElement.click();
  }

  private closeSignUpModel(): void {
    this.closeSignUp.nativeElement.click();
  }

  closeSign() {
    this.closeSignUpModel();
  }

  private openModal(): void {
    this.openBtn.nativeElement.click();
  }

  private openModal1(): void {
    this.openBtn1.nativeElement.click();
  }

  get errorCtr() {
    return this.SignUpForm.controls;
  }

  get errorCtrLogin() {
    return this.LoginForm.controls;
  }

  get errorCtrForgot() {
    return this.ForgotForm.controls;
  }

  login(data: any, content: any) {
    console.log("OOOOOOOOOOOOOOOOOOOOOOO")
    let btn_element = document
      .getElementById('login-btn');

    this.submittedLogin = true;
    if (this.LoginForm.valid) {

      btn_element?.classList.add('button--loading');

      let currentRoute: string;
      this.userData.getLocation();
      this.isLoading = true;

      this.userData.loginWithOTP(data).subscribe(
        (response) => {
          btn_element?.classList.remove('button--loading');
          this.isLoading = false;
          this.result2 = 'Data not found';

        },
        (error) => {
          btn_element?.classList.remove('button--loading');
          let errors = error.error;
          if (error.status === 200) {
            this.result = error.error.text;
            let a = this.userData.get(this.result);

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result2 = a.message;
                // this.toastr.success(a.message);
                this.modalService.open(content, { centered: false });
                //this.result = 'Login successful';
                this.closeModal();
                localStorage.setItem('user', JSON.stringify(a));
                if (localStorage.getItem('productId')) {
                  let data = localStorage.getItem('productId');
                  this.subscription.add(
                    this.userData.addProductCart1(data).subscribe(
                      (response) => {
                        this.result4 = 'Data not found';
                        this.isLoading = false;
                      },
                      (error) => {
                        console.log(`error --- `, error)
                        let errors = error.error;
                        if (error.status === 200) {
                          this.result4 = error.error.text;
                          let a = this.userData.get(this.result4);
                          if (error.error.text) {
                            if (a.status === 'Success') {
                              this.isLoading = false;
                              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                              this.route.onSameUrlNavigation = 'reload';
                              this.route.navigate(['/productCart'])
                              let msg = a.message;
                              this.Notification.showSuccess(msg, '');
                            } else {
                              this.isLoading = false;
                              this.result4 = a.message;
                              this.Notification.showError(this.result4, '');
                            }
                          } else {
                            this.isLoading = false;
                            this.result4 = a.message;
                            this.Notification.showError(this.result4, '');
                          }
                        } else {
                          this.isLoading = false;
                          let b = this.userData.get(errors);
                          this.result4 = b.message;
                          this.Notification.showError(this.result4, '');
                          console.log('else result', this.result4);
                        }
                      }
                    )
                  );
                } else {
                  this.isLoading = false;
                  console.log(this.isLoading);
                  this.userData.urlData(this.url);
                  this.userData.getLocalWishlist();
                  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                  this.route.onSameUrlNavigation = 'reload';
                  this.route.navigateByUrl(this.url);
                }
                // this.isLoading = false;

                // this.userData.urlData(this.url);
                // this.userData.getLocalWishlist();
                // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                // this.route.onSameUrlNavigation = 'reload';
                // this.route.navigateByUrl(this.url);

                this.SignUpForm.markAsPristine();
                this.SignUpForm.markAsUntouched();
                this.SignUpForm.updateValueAndValidity();
              } else {
                this.isLoading = false;
                this.result2 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result2 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            console.log('b --- ', b)
            this.isLoading = false;
            this.result2 = b.message;
          }
        }
      );
      this.isLoading = false;
    }
  }

  closeOtpModal() {
    this.modalService.dismissAll();
  }

  resendOtp() {
    this.userData.loginWithOTP(this.LoginForm.value).subscribe(
      (response) => {

      }, (error) => {
        let errors = error.error;
        if (error.status === 200) {
          this.result = error.error.text;
          let a = this.userData.get(this.result);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.toastr.success(a.message);
              this.result2 = a.message;
            } else {
              this.isLoading = false;
              this.result2 = a.message;
            }
          } else {
            this.isLoading = false;
            this.result2 = a.message;
          }
        } else {
          let b = this.userData.get(errors);
          this.isLoading = false;
          this.result2 = b.message;
        }
      }
    );
  }

  verify(data: any) {
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLL")
    let obj = {
      ...this.LoginForm.value,
      'otp': this.otpForm.get('otp')?.value
    }
    console.log('obj --- ', obj)
    let btn_element = document
      .getElementById('otp-Btn');

    this.submittedLogin = true;
    if (this.LoginForm.valid) {

      btn_element?.classList.add('button--loading');

      let currentRoute: string;
      this.userData.getLocation();
      this.isLoading = true;

      this.userData.loginWithOTP(obj).subscribe(
        (response) => {
          btn_element?.classList.remove('button--loading');
          this.isLoading = false;
          this.result2 = 'Data not found';

        },
        (error) => {
          btn_element?.classList.remove('button--loading');
          let errors = error.error;
          if (error.status === 200) {
            this.result = error.error.text;
            let a = this.userData.get(this.result);
            console.log('a --- ', a)

            if (error.error.text) {
              if (a.status === 'Success') {
                this.result2 = a.message;
                console.log('this.result2 --- ', this.result2)
                this.modalService.dismissAll();
                this.toastr.success('Login Successful!');
                this.userData.saveUserDetails(a)
                // localStorage.setItem('user', JSON.stringify(a));
                if (localStorage.getItem('productId')) {
                  let data = localStorage.getItem('productId');
                  this.subscription.add(
                    this.userData.addProductCart1(data).subscribe(
                      (response) => {
                        this.result4 = 'Data not found';
                        this.isLoading = false;
                      },
                      (error) => {
                        console.log(`error --- `, error)
                        let errors = error.error;
                        if (error.status === 200) {
                          this.result4 = error.error.text;
                          let a = this.userData.get(this.result4);
                          if (error.error.text) {
                            if (a.status === 'Success') {
                              this.isLoading = false;
                              this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                              this.route.onSameUrlNavigation = 'reload';
                              this.route.navigate(['/productCart'])
                              let msg = a.message;
                              this.Notification.showSuccess(msg, '');
                            } else {
                              this.isLoading = false;
                              this.result4 = a.message;
                              this.Notification.showError(this.result4, '');
                            }
                          } else {
                            this.isLoading = false;
                            this.result4 = a.message;
                            this.Notification.showError(this.result4, '');
                          }
                        } else {
                          this.isLoading = false;
                          let b = this.userData.get(errors);
                          this.result4 = b.message;
                          this.Notification.showError(this.result4, '');
                          console.log('else result', this.result4);
                        }
                      }
                    )
                  );
                } else {
                  this.isLoading = false;
                  console.log("this.isLoading", this.isLoading);
                  this.addToCart();
                  this.isLoginFlag.next(true);
                  this.userData.urlData(this.url);
                  this.userData.getLocalWishlist();
                  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                  this.route.onSameUrlNavigation = 'reload';
                  this.route.navigateByUrl(this.url);
                }
                // this.isLoading = false;

                // this.userData.urlData(this.url);
                // this.userData.getLocalWishlist();
                // this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                // this.route.onSameUrlNavigation = 'reload';
                // this.route.navigateByUrl(this.url);

                this.SignUpForm.markAsPristine();
                this.SignUpForm.markAsUntouched();
                this.SignUpForm.updateValueAndValidity();
              } else {
                this.isLoading = false;
                this.result2 = a.message;
              }
            } else {
              this.isLoading = false;
              this.result2 = a.message;
            }
          } else {
            let b = this.userData.get(errors);
            console.log('b --- ', b)
            this.isLoading = false;
            this.result2 = b.message;
          }
        }
      );
      this.isLoading = false;
    }
  }

  signup(data: any) {
    let btn_element = document.getElementById('signup-Btn');

    this.submitted = true;
    const data1: Array<any> = Object.keys(this.SignUpForm.controls);
    data1?.some((key) =>
      this.SignUpForm.get(key)?.setValue(this.SignUpForm.get(key)?.value.trim())
    );
    if (this.isChecked) {
      if (this.SignUpForm.valid) {
        btn_element?.classList.add('button--loading');
        this.userData.getLocation();
        this.isLoading = true;
        this.userData.signup(data).subscribe(
          (response) => {
            this.result3 = 'Data not found';
            this.isLoading = false;
          },
          (error) => {
            btn_element?.classList.remove('button--loading');
            let errors = error.error;

            if (error.status === 200) {
              this.result = error.error.text;
              let a = this.userData.get(this.result);
              if (error.error.text) {
                if (a.status === 'Success') {
                  this.result3 = a.message;
                  this.isLoading = false;
                  this.SignUpForm.markAsPristine();
                  this.SignUpForm.markAsUntouched();
                  this.SignUpForm.updateValueAndValidity();
                } else {
                  this.result3 = a.message;
                  this.isLoading = false;
                }
              } else {
                this.result3 = a.message;
                this.isLoading = false;
              }
            } else {
              let b = this.userData.get(errors);
              this.result3 = b.message;
              this.isLoading = false;
            }
          }
        );
      }
    }
  }

  forgot(data: any) {

    let btn_element = document.getElementById('forgot-btn');
    this.submittedForgot = true;
    if (this.ForgotForm.valid) {
      btn_element?.classList.add('button--loading');
      this.userData.getLocation();
      this.isLoading = true;
      localStorage.setItem('userName', JSON.stringify(data));

      this.userData.forgotPassword(data).subscribe(
        (response) => {
          this.result4 = 'Data not found';
          this.isLoading = false;
          btn_element?.classList.remove('button--loading');
        },
        (error) => {
          btn_element?.classList.remove('button--loading');
          let errors = error.error;

          if (error.status === 200) {
            this.result = error.error.text;
            let a = this.userData.get(this.result);
            if (error.error.text) {
              if (a.status === 'Success') {
                this.result4 = a.message;

                this.closeModal1();
                this.openModal();
                this.isLoading = false;
              } else {
                this.result4 = a.message;
                this.isLoading = false;
                this.clicked = false;
                localStorage.removeItem('userName');
              }
            } else {
              this.result4 = a.message;
              this.isLoading = false;
              this.clicked = false;
              localStorage.removeItem('userName');
            }
          } else {
            let b = this.userData.get(errors);
            this.result4 = b.message;
            this.isLoading = false;
            this.clicked = false;
            localStorage.removeItem('userName');
          }
        }
      );
    }

  }

  reset(data: any) {
    let btn_element = document.getElementById('otp-Btn');
    this.userData.getLocation();

    this.isLoading = true;
    console.log("btn_element", btn_element)
    btn_element?.classList.add('button--loading');
    this.userData.resetPassword(data).subscribe(
      (response) => {
        this.result5 = 'Data not found';
        this.isLoading = false;
        btn_element?.classList.remove('button--loading');
      },
      (error) => {
        btn_element?.classList.remove('button--loading');
        let errors = error.error;

        if (error.status === 200) {
          this.result = error.error.text;
          let a = this.userData.get(this.result);
          if (error.error.text) {
            if (a.status === 'Success') {
              this.result5 = a.message;

              this.closeModal2();
              this.openModal1();
              this.isLoading = false;
              this.clicked = false;
              localStorage.removeItem('userName');
            } else {
              this.result5 = a.message;
              this.isLoading = false;
              this.clicked = false;
            }
          } else {
            this.result5 = a.message;
            this.isLoading = false;
            this.clicked = false;
          }
        } else {
          let b = this.userData.get(errors);
          this.result5 = b.message;
          this.isLoading = false;
          this.clicked = false;
        }
      }
    );

  }

  addToCart() {
    if (localStorage.getItem('items')) {
      let data = localStorage.getItem('items');
      if (data) {
        var data1: any = JSON.parse(data);
      }
      if (data1) {
        data1.Cart.forEach((element: any) => {
          this.subscription.add(
            this.userData.addProductCart1(element.productId).subscribe(
              (response) => {
                this.result4 = 'Data not found';
                this.isLoading = false;
              },
              (error) => {
                console.log(`error --- `, error)
                let errors = error.error;
                if (error.status === 200) {
                  this.result4 = error.error.text;
                  let a = this.userData.get(this.result4);
                  if (error.error.text) {
                    if (a.status === 'Success') {
                      this.isLoading = false;
                      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
                      this.route.onSameUrlNavigation = 'reload';
                      this.route.navigate(['/productCart'])
                      let msg = a.message;
                      this.Notification.showSuccess(msg, '');
                    } else {
                      this.isLoading = false;
                      this.result4 = a.message;
                      this.Notification.showError(this.result4, '');
                    }
                  } else {
                    this.isLoading = false;
                    this.result4 = a.message;
                    this.Notification.showError(this.result4, '');
                  }
                } else {
                  this.isLoading = false;
                  let b = this.userData.get(errors);
                  this.result4 = b.message;
                  this.Notification.showError(this.result4, '');
                  console.log('else result', this.result4);
                }
              }
            )
          );
        });

      }
    } else {
      this.isLoading = false;
      console.log(this.isLoading);
      this.userData.urlData(this.url);
      this.userData.getLocalWishlist();
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigateByUrl(this.url);
    }
  }
}
