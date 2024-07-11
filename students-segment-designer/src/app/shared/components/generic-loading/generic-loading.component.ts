import {Component, Input, OnInit} from '@angular/core';
import {LoadingStatesEnum} from "../../../models/loading-states.enum";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-generic-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './generic-loading.component.html',
  styleUrl: './generic-loading.component.scss',
})
export class GenericLoadingComponent implements OnInit {
  @Input() state: LoadingStatesEnum;
  @Input() flat: boolean = true;

  ngOnInit() {
  }
}
