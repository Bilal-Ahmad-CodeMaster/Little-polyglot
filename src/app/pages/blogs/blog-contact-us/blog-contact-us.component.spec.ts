import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogContactUsComponent } from './blog-contact-us.component';

describe('BlogContactUsComponent', () => {
  let component: BlogContactUsComponent;
  let fixture: ComponentFixture<BlogContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogContactUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
