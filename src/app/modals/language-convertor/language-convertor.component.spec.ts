import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageConvertorComponent } from './language-convertor.component';

describe('LanguageConvertorComponent', () => {
  let component: LanguageConvertorComponent;
  let fixture: ComponentFixture<LanguageConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageConvertorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
