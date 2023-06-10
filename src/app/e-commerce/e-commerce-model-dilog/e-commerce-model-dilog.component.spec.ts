import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceModelDilogComponent } from './e-commerce-model-dilog.component';

describe('ECommerceModelDilogComponent', () => {
  let component: ECommerceModelDilogComponent;
  let fixture: ComponentFixture<ECommerceModelDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ECommerceModelDilogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceModelDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
