import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartParentAcademyComponent } from './smart-parent-academy.component';

describe('SmartParentAcademyComponent', () => {
  let component: SmartParentAcademyComponent;
  let fixture: ComponentFixture<SmartParentAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartParentAcademyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartParentAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
