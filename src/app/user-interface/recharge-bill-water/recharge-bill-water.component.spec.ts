import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillWaterComponent } from './recharge-bill-water.component';

describe('RechargeBillWaterComponent', () => {
  let component: RechargeBillWaterComponent;
  let fixture: ComponentFixture<RechargeBillWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
