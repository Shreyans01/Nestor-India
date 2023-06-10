import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterfaceLayoutComponent } from './user-interface-layout.component';

describe('UserInterfaceLayoutComponent', () => {
  let component: UserInterfaceLayoutComponent;
  let fixture: ComponentFixture<UserInterfaceLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInterfaceLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInterfaceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
