import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBookingPaymentComponent } from './bus-booking-payment.component';

describe('BusBookingPaymentComponent', () => {
  let component: BusBookingPaymentComponent;
  let fixture: ComponentFixture<BusBookingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusBookingPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusBookingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
