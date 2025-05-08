import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeroSectionComponent } from './sub-hero-section.component';

describe('SubHeroSectionComponent', () => {
  let component: SubHeroSectionComponent;
  let fixture: ComponentFixture<SubHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubHeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
