import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishFor11To14YearTeenComponent } from './english-for-11-to-14-year-teen.component';

describe('EnglishFor11To14YearTeenComponent', () => {
  let component: EnglishFor11To14YearTeenComponent;
  let fixture: ComponentFixture<EnglishFor11To14YearTeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnglishFor11To14YearTeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnglishFor11To14YearTeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
