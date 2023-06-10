import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalTaxesComponent } from './municipal-taxes.component';

describe('MunicipalTaxesComponent', () => {
  let component: MunicipalTaxesComponent;
  let fixture: ComponentFixture<MunicipalTaxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalTaxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
