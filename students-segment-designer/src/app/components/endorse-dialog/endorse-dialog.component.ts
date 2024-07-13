import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogActions, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-endorse-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './endorse-dialog.component.html',
  styleUrl: './endorse-dialog.component.scss'
})
export class EndorseDialogComponent {
  public recommendationForm = this.fb.group({
    recommendation: [null, [Validators.required]]
  })
  private readonly successText: string = 'რეკომენდაცია წარმატებით გაიგზავნა'

  constructor(
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialogRef<EndorseDialogComponent>
  ) {
  }

  public sendRecommendation(): void {
    this.matSnackBar.open(this.successText);
    this.matDialog.close()
  }

}
