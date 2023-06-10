import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpgGasComponent } from './lpg-gas.component';

describe('LpgGasComponent', () => {
  let component: LpgGasComponent;
  let fixture: ComponentFixture<LpgGasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpgGasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpgGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
