import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-left-navigation',
  standalone: true,
  imports: [MatCardModule, RouterModule, CommonModule],
  templateUrl: './left-navigation.component.html',
  styleUrl: './left-navigation.component.scss',
})
export class LeftNavigationComponent {
  constructor(private router: Router) {}
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

  ngOnInit() {
    this.sideMenuConfig.forEach((el) => {
      el.selected = false;
      if (el.url === this.router.url) {
        el.selected = true;
      }
    });
  }

  onClick(itemIndex: number) {
    this.sideMenuConfig.forEach((el, index) => {
      el.selected = false;
    });
    this.sideMenuConfig[itemIndex].selected = true;
  }
}
