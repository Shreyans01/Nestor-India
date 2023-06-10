import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillDthComponent } from './recharge-bill-dth.component';

describe('RechargeBillDthComponent', () => {
  let component: RechargeBillDthComponent;
  let fixture: ComponentFixture<RechargeBillDthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillDthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillDthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
