import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseStudentsTableComponent } from './chose-students-table.component';
import { appConfig } from '../../app.config';

describe('ChoseStudentsTableComponent', () => {
  let component: ChoseStudentsTableComponent;
  let fixture: ComponentFixture<ChoseStudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoseStudentsTableComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoseStudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
