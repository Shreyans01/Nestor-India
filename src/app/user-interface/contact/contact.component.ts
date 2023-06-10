import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApiServicesService } from './../../services/api-services.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  result: any = '';
  result1: any = '';
  clicked = false;
  result2: any = '';
  result3: any = '';
  result4: any = '';
  result5: any = '';
  url: any;
  Iserrormsg: boolean = false;
  submitted: boolean = false;

  contactForm: FormGroup = new FormGroup({});
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userData: ApiServicesService
  ) {
    this.contactForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
        ],
      ],
      mobileNo: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      message: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')],
      ],
    });
  }

  ngOnInit(): void { }

  get errorCtr() {
    return this.contactForm.controls;
  }

  contactAdd(data: any) {
    this.submitted = true;
    this.userData.getLocation();
    if (this.contactForm.valid) {
      this.userData.contactAdd(data).subscribe(
        (response) => {
          this.result3 = 'Data not found';
          setTimeout(() => {
            this.Iserrormsg = true
          }, 3000);
          this.clicked = false;
        },
        (error) => {
          let errors = error.error;
          if (error.status === 200) {
            this.result = error.error.text;
            let a = this.userData.get(this.result);
            if (error.error.text) {
              if (a.status === 'Success') {
                this.result3 = a.message;
                setTimeout(() => {
                  this.Iserrormsg = true
                }, 3000);
                this.contactForm.reset();
                this.clicked = false;
              } else {
                this.result3 = a.message;
                setTimeout(() => {
                  this.Iserrormsg = true
                }, 3000);
                this.clicked = false;
              }
            } else {
              this.result3 = a.message;
              setTimeout(() => {
                this.Iserrormsg = true
              }, 3000);
              this.clicked = false;
            }
          } else {
            let b = this.userData.get(errors);
            this.result3 = b.message;
            setTimeout(() => {
              this.Iserrormsg = true
            }, 3000);
            this.clicked = false;
          }
        }
      );
    }
  }
}
