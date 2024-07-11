import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {Store} from "@ngrx/store";
import {getLecturerInfo} from "../../../+stores/lecturer/selector";
import {LoadingStatesEnum} from "../../../models/loading-states.enum";
import {CommonModule} from "@angular/common";
import {GenericLoadingComponent} from "../generic-loading/generic-loading.component";

export interface SeasonDates {
  spring: string;
  autumn: string;
}

@Component({
  selector: 'app-shared-filters',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, CommonModule, GenericLoadingComponent],
  templateUrl: './shared-filters.component.html',
  styleUrl: './shared-filters.component.scss'
})
export class SharedFiltersComponent implements OnInit {
  @Output() public chosenDate: EventEmitter<string> = new EventEmitter<string>();
  public loadingState: LoadingStatesEnum;
  public startYear: string;
  public objectKeys = Object.keys;
  public yearsConfig = {}
  public selectedYear: number | null = null;
  public selectedSemester: string | null = null;

  public chosenStartYear;
  public chosenLastYear;
  public chosenStartSemester;
  public chosenLastSemester;
  public startDate;
  public endDate;

  constructor(private store$: Store) {
  }

  ngOnInit() {
    this.store$.select(getLecturerInfo).pipe().subscribe((data) => {
      this.loadingState = data.loadingState;
      if (data.lecturerInfo) {
        this.startYear = data.lecturerInfo.startedWorking;
        this.getConfig(this.startYear);
      }
    })
  }

  public getConfig(startDay: string) {
    this.yearsConfig = {};
    const startedYear = this.getDateYear(startDay);
    const currentYear = new Date().getFullYear();

    this.selectedYear = currentYear;
    const currentMonth = new Date().getMonth() + 1;
    this.selectedSemester = currentMonth >= 1 && currentMonth <= 9 ? 'spring' : 'autumn';
    for (let year = startedYear; year <= currentYear; year++) {
      this.yearsConfig[year] = this.getSeasonDates(year);
    }
    this.chosenDate.emit(this.getSeasonDates(this.selectedYear)?.[this.selectedSemester])
  }

  public selectYear(year: number): void {
    this.selectedYear = year;
    this.selectedSemester = null; // Reset selected semester
  }


  public selectSemester(semester: 'spring' | 'autumn'): void {
    this.selectedSemester = semester;
    this.chosenDate.emit(this.getSeasonDates(this.selectedYear)?.[semester])
  }

  private getDateYear(dateString: string): number {
    let dateParts = dateString.split('/');
    let dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return dateObject.getFullYear();
  }

  private getSeasonDates(year: number): SeasonDates {
    return {
      spring: `${year}-03-06T00:00:00`,
      autumn: `${year}-09-16T00:00:00`
    };
  }
}
