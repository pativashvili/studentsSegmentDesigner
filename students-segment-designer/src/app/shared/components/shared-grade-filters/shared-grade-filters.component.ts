import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FiltersListConst} from "../../constants/filters-list.const";
import {MatChipsModule} from "@angular/material/chips";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {CoursesControllerService} from "../../../services/courses-controller.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shared-grade-filters',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './shared-grade-filters.component.html',
  styleUrl: './shared-grade-filters.component.scss'
})
export class SharedGradeFiltersComponent implements OnInit {
  @Output() onFilterSelected: EventEmitter<{
    minGrade: number,
    maxGrade: number
  }> = new EventEmitter<{ minGrade: number; maxGrade: number }>();
  public courses;
  public filtersList = FiltersListConst;

  constructor(private coursesControllerService: CoursesControllerService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.filtersList.forEach((el) => el.selected = false)
      if (params['grade']) {
        this.filtersList.find((el) => el.name === params['grade']).selected = true;
      } else {
        this.filtersList.find((el) => el.name === 'All').selected = true
      }
    })
    this.coursesControllerService.fetchCoursesByLecturerId(Number(localStorage.getItem('lecturer')))
      .subscribe((data) => {
        this.courses = data;
      })

  }

  public getSelectedFilter(filter) {
    this.onFilterSelected.emit({
      minGrade: filter.minValue,
      maxGrade: filter.maxValue
    })
  }


}
