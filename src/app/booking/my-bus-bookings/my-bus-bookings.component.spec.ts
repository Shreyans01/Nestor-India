import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBusBookingsComponent } from './my-bus-bookings.component';

describe('MyBusBookingsComponent', () => {
  let component: MyBusBookingsComponent;
  let fixture: ComponentFixture<MyBusBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBusBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBusBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
