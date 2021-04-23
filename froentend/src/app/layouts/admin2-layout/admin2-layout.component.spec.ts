import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin2LayoutComponent } from './admin2-layout.component';

describe('Admin2LayoutComponent', () => {
  let component: Admin2LayoutComponent;
  let fixture: ComponentFixture<Admin2LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Admin2LayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Admin2LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
