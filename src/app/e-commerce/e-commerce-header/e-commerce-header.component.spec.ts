import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceHeaderComponent } from './e-commerce-header.component';

describe('ECommerceHeaderComponent', () => {
  let component: ECommerceHeaderComponent;
  let fixture: ComponentFixture<ECommerceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECommerceHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
