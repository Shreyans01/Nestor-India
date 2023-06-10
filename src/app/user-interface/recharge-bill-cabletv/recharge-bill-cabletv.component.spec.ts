import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillCabletvComponent } from './recharge-bill-cabletv.component';

describe('RechargeBillCabletvComponent', () => {
  let component: RechargeBillCabletvComponent;
  let fixture: ComponentFixture<RechargeBillCabletvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillCabletvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillCabletvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
