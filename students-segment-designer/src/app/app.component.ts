import { CommonModule } from '@angular/common';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModule } from '@angular/fire/auth';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AuthModule,
    RegisterComponent,
    LoginComponent,
    CommonModule,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private overlayContainer: OverlayContainer
  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSign$.set({
          email: user?.email,
          userName: this.getUserName(user?.displayName),
          entityNumber: this.getEntityNo(user?.displayName),
        });
        this.router.navigateByUrl('/dashboard');
        console.log(this.authService.currentUserSign$());
      } else {
        this.authService.currentUserSign$.set(null);
      }
    });
    this.overlayContainer.getContainerElement().classList.add('light-theme');
  }
  logOut() {
    this.authService.logOut();
  }

  private getEntityNo(nameAndId: string): string {
    return nameAndId.split(',')[1];
  }

  private getUserName(nameAndId: string) {
    return nameAndId.split(',')[0];
  }
}
