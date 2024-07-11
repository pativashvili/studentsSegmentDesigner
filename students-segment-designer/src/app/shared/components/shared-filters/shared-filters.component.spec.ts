import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFiltersComponent } from './shared-filters.component';

describe('SharedFiltersComponent', () => {
  let component: SharedFiltersComponent;
  let fixture: ComponentFixture<SharedFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
