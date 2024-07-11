import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatHeaderRow, MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {EnrollmentsModel} from "../../services/models/enrollments-model";
import {CommonModule} from "@angular/common";
import {TransformColumnNamesPipe} from "./pipes/transform-column-names.pipe";
import {MatChip, MatChipsModule} from "@angular/material/chips";
import {FiltersListConst} from "../../shared/constants/filters-list.const";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {MatCardModule} from "@angular/material/card";
import {ActivatedRoute, Router} from "@angular/router";
import {TransformRowNamesPipe} from "./pipes/transform-row-names.pipe";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-chose-students-table',
  standalone: true,
  imports: [MatTableModule, CommonModule, TransformColumnNamesPipe, MatHeaderRow, MatChipsModule, MatChip, CdkDrag, MatCardModule, TransformRowNamesPipe, MatPaginatorModule],
  templateUrl: './chose-students-table.component.html',
  styleUrl: './chose-students-table.component.scss'
})
export class ChoseStudentsTableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('studentsTable', {static: true}) table: MatTable<EnrollmentsModel[]>;
  @ViewChild('studentsPaginator') paginator: MatPaginator;
  @Input() tableDataSource: EnrollmentsModel[];
  public dataSource = new MatTableDataSource([]);
  @Output() selectedFilter: EventEmitter<any> = new EventEmitter<any>();
  public filtersList = FiltersListConst;
  public displayedColumns;
  public queryParamsExist: boolean;

  constructor(private router: ActivatedRoute, private route: Router) {

  }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      if (params) {
        this.queryParamsExist = true;
        if (params['grade']) {
          this.filtersList.find((el) =>
            el.name === params['grade']).selected = true
        }
      }
    })
  }

  toggleChip(event) {
    this.filtersList.forEach((el) => {
      el.selected = false;
    })
    this.filtersList.find((el) =>
      el.name === event.name).selected = true
    this.selectedFilter.emit((event))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableDataSource'].currentValue) {
      this.tableDataSource = changes['tableDataSource'].currentValue;
      this.initialiseTable();
    }
  }

  public getStudent(student) {
    this.route.navigate(['/student'], {
      queryParams: {
        studentId: student.studentId
      }
    })
    console.log(student)
  }

  private initialiseTable() {
    this.dataSource.data = this.tableDataSource;
    this.displayedColumns = Object.keys(this.tableDataSource?.[0])
    if (this.queryParamsExist) {
      this.table.renderRows();
    }
  }

}
