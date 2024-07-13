import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubjectsComponent } from './subjects.component';
import { appConfig } from '../../app.config';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
