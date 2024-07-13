import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {CommonModule, NgTemplateOutlet} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AuthService} from "../../services/auth.service";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    RouterOutlet,
    MatGridListModule,
    NgTemplateOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    CommonModule,
    MatMenuModule
  ],
})
export class LayoutComponent implements OnInit {
  public opened = false;
  public currentUser = this.authService?.currentUserSign$();

  sideMenuConfig = [
    {
      title: 'პროფილი',
      url: '/profile',
      selected: false,
    },
    {
      title: 'დაფა',
      url: '/dashboard',
      selected: false,
    },
    {
      title: 'სტუდენტები',
      url: '/students',
      selected: false,
    },
    {
      title: 'საგნები',
      url: '/subjects',
      selected: false,
    },
    {
      title: 'არქივიი',
      url: '/archive',
      selected: false,
    },
  ];

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.sideMenuConfig.forEach((el) => {
      el.selected = el.url === this.router.url;
    });
  }

  onClick(itemIndex: number): void {
    this.sideMenuConfig.forEach((el, index) => {
      el.selected = false;
    });
    this.sideMenuConfig[itemIndex].selected = true;
  }

  logOut(): void {
    this.authService
      .logOut()
      .subscribe((data) => this.router.navigateByUrl('/login'));
  }
}
