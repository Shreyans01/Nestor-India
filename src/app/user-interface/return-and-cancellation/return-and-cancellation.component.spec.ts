import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAndCancellationComponent } from './return-and-cancellation.component';

describe('ReturnAndCancellationComponent', () => {
  let component: ReturnAndCancellationComponent;
  let fixture: ComponentFixture<ReturnAndCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnAndCancellationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnAndCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
