import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedGradeFiltersComponent } from './shared-grade-filters.component';

describe('SharedGradeFiltersComponent', () => {
  let component: SharedGradeFiltersComponent;
  let fixture: ComponentFixture<SharedGradeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedGradeFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedGradeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
