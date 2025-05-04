import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsLayoutComponent } from './blogs-layout.component';

describe('BlogsLayoutComponent', () => {
  let component: BlogsLayoutComponent;
  let fixture: ComponentFixture<BlogsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
