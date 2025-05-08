import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishFor7To10YearComponent } from './english-for-7-to-10-year.component';

describe('EnglishFor7To10YearComponent', () => {
  let component: EnglishFor7To10YearComponent;
  let fixture: ComponentFixture<EnglishFor7To10YearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishFor7To10YearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishFor7To10YearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
