import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { error } from 'console';
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
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form = this.fb.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    entityNo: ['', Validators.minLength(11)],
  });

  onSubmit() {
    const rowForm = this.form.getRawValue();
    this.authService
      .register(
        rowForm.email,
        rowForm.userName,
        rowForm.password,
        rowForm.entityNo
      )
      .subscribe(
        (data) => this.router.navigateByUrl('/login'),
        (error) => {
          console.log(error);
        }
      );
  }
}
