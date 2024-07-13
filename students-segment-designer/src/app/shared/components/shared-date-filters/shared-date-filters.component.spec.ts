import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedDateFiltersComponent } from './shared-date-filters.component';
import { Store } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('SharedDateFiltersComponent', () => {
  let component: SharedDateFiltersComponent;
  let fixture: ComponentFixture<SharedDateFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDateFiltersComponent, BrowserAnimationsModule],
      providers: [provideHttpClient(), provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedDateFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
