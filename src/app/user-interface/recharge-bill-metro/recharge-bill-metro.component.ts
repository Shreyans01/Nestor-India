import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-recharge-bill-metro',
  templateUrl: './recharge-bill-metro.component.html',
  styleUrls: ['./recharge-bill-metro.component.css'],
})
export class RechargeBillMetroComponent implements OnInit {
  rechargeBillMetro: FormGroup = new FormGroup({});



  constructor(private route: Router, private fb: FormBuilder) {
    this.rechargeBillMetro = this.fb.group({
      operator: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  billMetro(data: any) {
    console.warn(data);
  }

  ngOnInit(): void {}
}
