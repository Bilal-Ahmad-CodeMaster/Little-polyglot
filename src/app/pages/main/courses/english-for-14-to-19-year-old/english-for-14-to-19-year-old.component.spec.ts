import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishFor14To19YearOldComponent } from './english-for-14-to-19-year-old.component';

describe('EnglishFor14To19YearOldComponent', () => {
  let component: EnglishFor14To19YearOldComponent;
  let fixture: ComponentFixture<EnglishFor14To19YearOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishFor14To19YearOldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishFor14To19YearOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
