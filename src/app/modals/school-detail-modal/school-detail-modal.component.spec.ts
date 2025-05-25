import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailModalComponent } from './school-detail-modal.component';

describe('SchoolDetailModalComponent', () => {
  let component: SchoolDetailModalComponent;
  let fixture: ComponentFixture<SchoolDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
