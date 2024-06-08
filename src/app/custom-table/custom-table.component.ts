import { Component, OnInit, Input, ViewChild, TemplateRef, OnChanges, SimpleChanges  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { TableConfig } from './table-config.model';
import { Store, Action } from '@ngrx/store';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() tableConfig!: TableConfig;
  @Input() customCellTemplates: { [key: string]: TemplateRef<any> } = {};
  @Input() deleteAction!: () => void;
  @Input() updateAction!: (item: any) => Action;

  displayedColumns: string[] = [];
  displayedColumnsWithSelect: string[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  selection = new SelectionModel<any>(true, []);
  currentPage = 0;
  private allData: any[] = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.tableConfig) {
      this.displayedColumns = this.tableConfig.sortableColumns;
      this.displayedColumnsWithSelect = ['select', ...this.displayedColumns];
    }

    if (this.tableConfig.pagination && !this.tableConfig.currentPage) {
      this.tableConfig.currentPage = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      if (this.tableConfig.pagination && !this.tableConfig.totalItems) {
        this.tableConfig.totalItems = this.data.length;
      }
      this.allData = this.data;
      this.updateData();
    }
  }

  updateData() {
    const startIndex = this.currentPage * this.tableConfig.pageSize;
    const endIndex = startIndex + this.tableConfig.pageSize;
    this.dataSource.data = this.allData.slice(startIndex, endIndex);
  }

  toggleCheckbox(row: any) {
    this.selection.toggle(row);
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  deleteSelected() {
    this.deleteAction();
    this.selection.clear();
  }

  updateSelected() {
    const selectedItems = this.selection.selected;
    this.store.dispatch(this.updateAction(selectedItems));
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updateData();
  }

  onScroll() {
    if (this.tableConfig.infiniteScroll) {
      const endIndex = this.dataSource.data.length + this.tableConfig.pageSize;
      this.dataSource.data = this.allData.slice(0, endIndex);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}

