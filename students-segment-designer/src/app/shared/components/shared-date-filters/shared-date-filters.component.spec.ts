import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDateFiltersComponent } from './shared-date-filters.component';

describe('SharedDateFiltersComponent', () => {
  let component: SharedDateFiltersComponent;
  let fixture: ComponentFixture<SharedDateFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDateFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDateFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
