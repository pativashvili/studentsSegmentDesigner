import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LeftNavigationComponent } from '../left-navigation/left-navigation.component';
import { RightNavigationComponent } from '../right-navigation/right-navigation.component';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatGridListModule,
    LeftNavigationComponent,
    RightNavigationComponent,
    NgTemplateOutlet,
  ],
})
export class LayoutComponent {}
