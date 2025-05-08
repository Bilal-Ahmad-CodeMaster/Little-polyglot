import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishFor3To6YearKidsComponent } from './english-for-3-to-6-year-kids.component';

describe('EnglishFor3To6YearKidsComponent', () => {
  let component: EnglishFor3To6YearKidsComponent;
  let fixture: ComponentFixture<EnglishFor3To6YearKidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishFor3To6YearKidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishFor3To6YearKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
