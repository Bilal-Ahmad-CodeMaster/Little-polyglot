import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsFooterComponent } from './blogs-footer.component';

describe('BlogsFooterComponent', () => {
  let component: BlogsFooterComponent;
  let fixture: ComponentFixture<BlogsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
