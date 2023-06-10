import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-recharge-bill-datacard',
  templateUrl: './recharge-bill-datacard.component.html',
  styleUrls: ['./recharge-bill-datacard.component.css'],
})
export class RechargeBillDatacardComponent implements OnInit {
  rechargeBillDataCard: FormGroup = new FormGroup({});
 

  constructor(private route: Router, private fb: FormBuilder) {
    this.rechargeBillDataCard = this.fb.group({
      rechargeBillpayment: ['', [Validators.required]],
      dataCardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      operator: ['', [Validators.required]],
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
  }

  billDataCard(data: any) {
    console.warn(data);
  }

  ngOnInit(): void {}
}
