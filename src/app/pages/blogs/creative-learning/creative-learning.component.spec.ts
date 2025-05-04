import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeLearningComponent } from './creative-learning.component';

describe('CreativeLearningComponent', () => {
  let component: CreativeLearningComponent;
  let fixture: ComponentFixture<CreativeLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeLearningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreativeLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
