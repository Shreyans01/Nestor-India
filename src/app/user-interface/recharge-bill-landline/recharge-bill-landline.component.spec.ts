import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillLandlineComponent } from './recharge-bill-landline.component';

describe('RechargeBillLandlineComponent', () => {
  let component: RechargeBillLandlineComponent;
  let fixture: ComponentFixture<RechargeBillLandlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillLandlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillLandlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
