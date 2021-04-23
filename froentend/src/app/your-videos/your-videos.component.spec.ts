import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourVideosComponent } from './your-videos.component';

describe('YourVideosComponent', () => {
  let component: YourVideosComponent;
  let fixture: ComponentFixture<YourVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
