import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, deleteUser, updateUser } from '../../../state/actions/users.actions';
import { selectAllUsers } from '../../../state/selectors/users.selectors';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from 'src/app/custom-table/table-config.model';
import { User } from 'src/state/models/user.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]>;
  data: any[] = [];
  selection = new SelectionModel<User>(true, []);

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

  constructor(private store: Store<{ users: User[] }>) {
    this.users$ = this.store.select(selectAllUsers);
  };

  ngOnInit() {
    this.loadUsers();
    this.subscribeToUsers();
  }

  ngAfterViewInit() {
    this.customCellTemplates = {
      address: this.customCell
    };
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  updateUserAction = (user: User) => updateUser({ user });

  deleteSelected() {
    const selectedIds = this.selection.selected.map(item => item.id);

    selectedIds.forEach(id => {
      this.store.dispatch(deleteUser({ id }));
    });

    this.selection.clear();

    this.tableConfig.totalItems = this.data.length - selectedIds.length;
  }

  updateSelected() {
    const selectedItems = this.selection.selected[0];
    this.store.dispatch(this.updateUserAction(selectedItems));
  }

  private subscribeToUsers() {
    this.users$.subscribe(users => {
      this.data = users;
    });
  }
}
