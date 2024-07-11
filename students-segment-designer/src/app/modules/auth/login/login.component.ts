import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

import {Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {LoadingStatesEnum} from "../../../models/loading-states.enum";
import {GenericLoadingComponent} from "../../../shared/components/generic-loading/generic-loading.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInput,
    GenericLoadingComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public loadingState = LoadingStatesEnum.LOADED;
  public errorMessage: string;
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.loadingState = LoadingStatesEnum.LOADING;
    const rowForm = this.form.getRawValue();
    this.authService.login(rowForm.email, rowForm.password).subscribe((success) => {
        this.loadingState = LoadingStatesEnum.LOADED
        this.router.navigateByUrl('/dashboard')
        this._snackBar.open('წარმატებით შეხვედით აპლიკაციაში', 'გასაგებია', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        })
      },
      (error) => {
        this.loadingState = LoadingStatesEnum.ERROR
        this._snackBar.open(error.message, 'გასაგებია', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  onRegister() {
    this.router.navigateByUrl('signup');
  }
}
