import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBusConfirmDetailsComponent } from './booking-bus-confirm-details.component';

describe('BookingBusConfirmDetailsComponent', () => {
  let component: BookingBusConfirmDetailsComponent;
  let fixture: ComponentFixture<BookingBusConfirmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingBusConfirmDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingBusConfirmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
