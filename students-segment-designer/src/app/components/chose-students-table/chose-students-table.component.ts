import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {EnrollmentsModel} from "../../services/models/enrollments-model";
import {CommonModule} from "@angular/common";
import {TransformColumnNamesPipe} from "./pipes/transform-column-names.pipe";
import {ActivatedRoute, Router} from "@angular/router";
import {TransformRowNamesPipe} from "./pipes/transform-row-names.pipe";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-chose-students-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    TransformColumnNamesPipe,
    TransformRowNamesPipe,
    MatPaginatorModule
  ],
  templateUrl: './chose-students-table.component.html',
  styleUrl: './chose-students-table.component.scss'
})
export class ChoseStudentsTableComponent implements AfterViewInit, OnChanges {
  @ViewChild('studentsTable', {static: true}) table: MatTable<EnrollmentsModel[]>;
  @ViewChild('studentsPaginator') paginator: MatPaginator;

  @Input() tableDataSource: EnrollmentsModel[];
  @Output() selectedFilter: EventEmitter<any> = new EventEmitter<any>();

  public dataSource = new MatTableDataSource([]);
  public displayedColumns;
  public queryParamsExist: boolean;

  constructor(private router: ActivatedRoute, private route: Router) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableDataSource'].currentValue) {
      this.tableDataSource = changes['tableDataSource'].currentValue;
      this.initialiseTable();
    }
  }

  public getStudent(student): void {
    this.route.navigate(['/student'], {
      queryParams: {
        studentId: student.studentId
      }
    }).then()
  }

  private initialiseTable(): void {
    this.dataSource.data = this.tableDataSource;
    this.displayedColumns = Object.keys(this.tableDataSource?.[0])
    if (this.queryParamsExist) {
      this.table.renderRows();
    }
  }

}
