import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillElectricityComponent } from './recharge-bill-electricity.component';

describe('RechargeBillElectricityComponent', () => {
  let component: RechargeBillElectricityComponent;
  let fixture: ComponentFixture<RechargeBillElectricityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillElectricityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillElectricityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
