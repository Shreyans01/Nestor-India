import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillDatacardComponent } from './recharge-bill-datacard.component';

describe('RechargeBillDatacardComponent', () => {
  let component: RechargeBillDatacardComponent;
  let fixture: ComponentFixture<RechargeBillDatacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillDatacardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillDatacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
