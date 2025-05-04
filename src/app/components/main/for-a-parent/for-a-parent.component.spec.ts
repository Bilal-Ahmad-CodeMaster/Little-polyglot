import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForAParentComponent } from './for-a-parent.component';

describe('ForAParentComponent', () => {
  let component: ForAParentComponent;
  let fixture: ComponentFixture<ForAParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForAParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForAParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
