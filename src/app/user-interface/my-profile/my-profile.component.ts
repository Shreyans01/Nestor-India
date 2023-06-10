import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';
import { NotificationServiceService } from './../../services/notification-service.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit, AfterViewInit {
  profileForm: FormGroup = new FormGroup({});
  result: any = '';
  currLat: any = '';
  currLng: any = '';
  userObj1: any = '';
  isLoading = false;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService,
    private Notification: NotificationServiceService
  ) {
    this.profileForm = this.fb.group({
      firstName: [[], []],
      lastName: [[], []],
      email: [[], []],
      mobileNo: [[], []],
    });
  }

  timeout() {
    setTimeout(() => {
      this.result = '';
      this.isLoading = false;
    }, 3000);
  }

  processBar() {
    this.isLoading = true;
  }

  ngAfterViewInit(): void {
    // this.cdr.detectChanges()
  }

  ngOnInit(): void {
    this.userData.getLocation();

    this.userData.profile().subscribe(
      (response) => {
        this.result = 'Data not found';
      },
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);
          console.log("AAAAAAAAAAAAAAAA",a)

          if (error.error.text) {
            if (a.status === 'Success') {
              this.profileForm = this.fb.group({
                firstName: [
                  a.data['firstName'],
                  [Validators.required, Validators.pattern('^[a-z,A-Z, ,]+$')],
                ],
                lastName: [
                  a.data['lastName'],
                  [Validators.required, Validators.pattern('^[a-z,A-Z, ,]+$')],
                ],
                email: [
                  a.data['email'],
                  [Validators.required, Validators.email],
                ],
                mobileNo: [
                  a.data['mobileNo'],
                  [
                    Validators.required,
                    Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
                  ],
                ],
              });
            } else {
              this.result = a.message;
              this.timeout();
            }
          } else {
            this.result = a.message;
            this.timeout();
          }
        } else {
          let b = this.userData.get(errors);
          this.result = b.message;

          this.timeout();
        }
      }
    );
  }

  profileUpdate(data: any) {
    this.processBar();
    this.userData.getUpdateProfile(data).subscribe(
      (responce) => {},
      (error) => {
        let errors = error.error;

        if (error.status === 200) {
          let result1 = error.error.text;
          let a = this.userData.get(result1);

          if (error.error.text) {
            if (a.status === 'Success') {
              this.ngOnInit();
            } else {
              this.result = a.message;
              this.timeout();
            }
          } else {
            this.result = a.message;
            this.timeout();
          }
        } else {
          let b = this.userData.get(errors);
          this.result = b.message;

          this.timeout();
        }
      }
    );
  }
}
