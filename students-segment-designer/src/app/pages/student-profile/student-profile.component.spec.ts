import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfileComponent } from './student-profile.component';
import { appConfig } from '../../app.config';

describe('StudentProfileComponent', () => {
  let component: StudentProfileComponent;
  let fixture: ComponentFixture<StudentProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfileComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
