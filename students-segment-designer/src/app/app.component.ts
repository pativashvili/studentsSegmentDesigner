import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthModule} from '@angular/fire/auth';
import {RegisterComponent} from './modules/auth/register/register.component';
import {AuthService} from './services/auth.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import {LecturerInfoControllerService} from "./services/lecturer-info-controller.service";
import {Store} from "@ngrx/store";
import {loadLecturer} from "./+stores/lecturer/lecturer-actions";
import {LayoutComponent} from "./components/layout/layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AuthModule,
    RegisterComponent,
    CommonModule,
    RouterOutlet,
    LayoutComponent,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private lecturerInfoController: LecturerInfoControllerService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSign$.set({
          email: user?.email,
          userName: this.getUserName(user?.displayName),
          entityNumber: this.getEntityNo(user?.displayName),
        });
        this.store.dispatch(loadLecturer({entityNo: this.getEntityNo(user?.displayName)}))
      } else {
        this.authService.currentUserSign$.set(null);
      }
    });
    this.overlayContainer.getContainerElement().classList.add('light-theme');
  }

  private getEntityNo(nameAndId: string): string {
    return nameAndId.split(',')[1];
  }

  private getUserName(nameAndId: string): string {
    return nameAndId.split(',')[0];
  }
}
