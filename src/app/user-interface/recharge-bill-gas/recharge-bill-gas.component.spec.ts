import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillGasComponent } from './recharge-bill-gas.component';

describe('RechargeBillGasComponent', () => {
  let component: RechargeBillGasComponent;
  let fixture: ComponentFixture<RechargeBillGasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillGasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
