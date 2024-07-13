import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsSegmentationComponent } from './subjects-segmentation.component';
import { appConfig } from '../../app.config';

describe('SubjectsSegmentationComponent', () => {
  let component: SubjectsSegmentationComponent;
  let fixture: ComponentFixture<SubjectsSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsSegmentationComponent],
      providers: [...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectsSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
