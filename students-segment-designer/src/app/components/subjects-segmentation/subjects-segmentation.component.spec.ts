import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsSegmentationComponent } from './subjects-segmentation.component';

describe('SubjectsSegmentationComponent', () => {
  let component: SubjectsSegmentationComponent;
  let fixture: ComponentFixture<SubjectsSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectsSegmentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
