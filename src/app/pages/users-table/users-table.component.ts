import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { UsersService } from '@app-services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from 'src/app/custom-table/table-config.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  data: any[] = [];

  tableConfig: TableConfig = {
    sortableColumns: ['id', 'name', 'username', 'email', 'address', 'phone'],
    pagination: true,
    infiniteScroll: false,
    pageSize: 10,
    actionButtons: ['delete', 'update'],
  };

  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customCellTemplates: { [key: string]: TemplateRef<any> } = {};
  dataSource = new MatTableDataSource<any>();

  constructor(private usersService: UsersService) {};

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((data) => {
      this.data = data.map(user => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: user.address,
        phone: user.phone
      }));
    });
  }

  ngAfterViewInit() {
    this.customCellTemplates = {
      address: this.customCell
    };
  }
}
