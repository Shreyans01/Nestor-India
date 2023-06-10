import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargePaymentSuccessComponent } from './recharge-payment-success.component';

describe('RechargePaymentSuccessComponent', () => {
  let component: RechargePaymentSuccessComponent;
  let fixture: ComponentFixture<RechargePaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargePaymentSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargePaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
