import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSeatBookingPaymentComponent } from './bus-seat-booking-payment.component';

describe('BusSeatBookingPaymentComponent', () => {
  let component: BusSeatBookingPaymentComponent;
  let fixture: ComponentFixture<BusSeatBookingPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusSeatBookingPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSeatBookingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
