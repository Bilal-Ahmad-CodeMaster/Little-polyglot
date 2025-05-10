import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpowerCardComponent } from './superpower-card.component';

describe('SuperpowerCardComponent', () => {
  let component: SuperpowerCardComponent;
  let fixture: ComponentFixture<SuperpowerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperpowerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperpowerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
