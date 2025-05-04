import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsHeaderComponent } from './blogs-header.component';

describe('BlogsHeaderComponent', () => {
  let component: BlogsHeaderComponent;
  let fixture: ComponentFixture<BlogsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
