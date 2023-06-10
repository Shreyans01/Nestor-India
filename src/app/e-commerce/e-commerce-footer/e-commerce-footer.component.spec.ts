import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceFooterComponent } from './e-commerce-footer.component';

describe('ECommerceFooterComponent', () => {
  let component: ECommerceFooterComponent;
  let fixture: ComponentFixture<ECommerceFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECommerceFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
