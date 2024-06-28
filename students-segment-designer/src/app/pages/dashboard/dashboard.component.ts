import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { DashboardFooterComponent } from './dashboard-footer/dashboard-footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    MatCardModule,
    DashboardHeaderComponent,
    DashboardBodyComponent,
    DashboardFooterComponent,
  ],
})
export class DashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
}
