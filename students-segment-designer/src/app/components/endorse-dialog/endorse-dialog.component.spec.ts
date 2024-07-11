import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorseDialogComponent } from './endorse-dialog.component';

describe('EndorseDialogComponent', () => {
  let component: EndorseDialogComponent;
  let fixture: ComponentFixture<EndorseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndorseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndorseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
