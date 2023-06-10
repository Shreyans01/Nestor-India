import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeBillMetroComponent } from './recharge-bill-metro.component';

describe('RechargeBillMetroComponent', () => {
  let component: RechargeBillMetroComponent;
  let fixture: ComponentFixture<RechargeBillMetroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeBillMetroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeBillMetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
