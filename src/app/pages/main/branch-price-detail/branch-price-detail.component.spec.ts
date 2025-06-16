import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPriceDetailComponent } from './branch-price-detail.component';

describe('BranchPriceDetailComponent', () => {
  let component: BranchPriceDetailComponent;
  let fixture: ComponentFixture<BranchPriceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchPriceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchPriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
