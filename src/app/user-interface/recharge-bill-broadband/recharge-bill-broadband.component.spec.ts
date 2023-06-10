import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillBroadbandComponent } from './recharge-bill-broadband.component';

describe('RechargeBillBroadbandComponent', () => {
  let component: RechargeBillBroadbandComponent;
  let fixture: ComponentFixture<RechargeBillBroadbandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillBroadbandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillBroadbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
