import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenionCrousalComponent } from './openion-crousal.component';

describe('OpenionCrousalComponent', () => {
  let component: OpenionCrousalComponent;
  let fixture: ComponentFixture<OpenionCrousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenionCrousalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenionCrousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
