import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSchoolsComponent } from './find-schools.component';

describe('FindSchoolsComponent', () => {
  let component: FindSchoolsComponent;
  let fixture: ComponentFixture<FindSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindSchoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
