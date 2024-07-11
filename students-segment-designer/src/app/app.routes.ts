import {CanActivate, Router, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegisterComponent} from './modules/auth/register/register.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {StudentsComponent} from './pages/students/students.component';
import {SubjectsComponent} from './pages/subjects/subjects.component';
import {ArchiveComponent} from './pages/archive/archive.component';
import {inject, Injectable} from "@angular/core";
import {map} from "rxjs";
import {AuthService} from "./services/auth.service";
import {LayoutComponent} from "./components/layout/layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {StudentProfileComponent} from "./pages/student-profile/student-profile.component";

@Injectable({providedIn: 'root'})
class AuthGuardClass implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate() {
    return this.authService.user$.pipe(
      map((user) => {
        if (user !== null) {
          return true;
        }
        this.router.navigateByUrl('/login');
        return false
      })
    );
  }
}

export const routes: Routes = [
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: '',
    canActivate: [AuthGuardClass],
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'student',
        component: StudentProfileComponent,
      },
    ],
  },
];
