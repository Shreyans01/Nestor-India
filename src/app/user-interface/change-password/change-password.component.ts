import { Component, OnInit } from '@angular/core';
import { changePassword } from './../../confirmed.validator';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from 'src/app/services/api-services.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  result: any = '';
  result1: any = '';
  clicked = false;
  submitted: boolean = false;
  changePasswordForm: FormGroup;
  checkPassword: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userData: ApiServicesService
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    })
  }

  ngOnInit() {}
  get errorCtr() {
    return this.changePasswordForm.controls;
  }

  changePassword(data: any) {
    this.submitted = true;
    if (this.changePasswordForm.valid) {
      this.userData.getLocation();
      this.userData.getID();
      this.clicked = true;
      this.userData.changePassword(data).subscribe(
        (response) => {
          this.result = 'Data not found';
          this.clicked = false;
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            this.result = error.error.text;
            let a = this.userData.get(this.result);
            if (error.error.text) {
              if (a.status === 'Success') {
                this.result = a.message;
                this.clicked = false;
              } else {
                this.result = a.message;
                this.clicked = false;
              }
            } else {
              this.result = a.message;
              this.clicked = false;
            }
          } else {
            let b = this.userData.get(errors);
            this.result = b.message;
            this.clicked = false;
          }
        }
      );
    }
  }
}


