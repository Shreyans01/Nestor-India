import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppLinkComponent } from './mobile-app-link.component';

describe('MobileAppLinkComponent', () => {
  let component: MobileAppLinkComponent;
  let fixture: ComponentFixture<MobileAppLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAppLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
