import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorseDialogComponent } from './endorse-dialog.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EndorseDialogComponent', () => {
  let component: EndorseDialogComponent;
  let fixture: ComponentFixture<EndorseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EndorseDialogComponent,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(EndorseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
