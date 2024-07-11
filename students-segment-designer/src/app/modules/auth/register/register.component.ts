import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {MustMatch} from "../helpers/methods/must-matc.validator";
import {LoadingStatesEnum} from "../../../models/loading-states.enum";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public loadingState = LoadingStatesEnum.INIT;
  form = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required, Validators.minLength(6)],
    repeatPassword: ['', Validators.required],
    entityNo: ['', Validators.minLength(11)],
  },);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form.addValidators([MustMatch('password', 'repeatPassword')])
  }

  onSubmit() {
    this.loadingState = LoadingStatesEnum.LOADING
    const rowForm = this.form.getRawValue();
    debugger
    this.authService
      .register(
        rowForm.email,
        rowForm.userName,
        rowForm.password,
        rowForm.entityNo
      )
      .subscribe(
        (data) => {
          this.loadingState = LoadingStatesEnum.LOADED
          this.router.navigateByUrl('/login')
        },
        (error) => {
          this.loadingState = LoadingStatesEnum.ERROR
          console.log(error);
        }
      );
  }
}
