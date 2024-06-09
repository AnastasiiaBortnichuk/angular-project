import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers, deleteUser, updateUser } from '../../../state/actions/users.actions';
import { selectAllUsers } from '../../../state/selectors/users.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from 'src/app/custom-table/table-config.model';
import { User } from 'src/state/models/user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { USERS_TABLE_CONFIG_TOKEN } from 'src/app/app.tokens';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]>;
  data: any[] = [];
  selection = new SelectionModel<User>(true, []);

  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customCellTemplates: { [key: string]: TemplateRef<any> } = {};

  constructor(
    private store: Store<{ users: User[] }>,
    @Inject(USERS_TABLE_CONFIG_TOKEN) public tableConfig: TableConfig
  ) {
    this.users$ = this.store.select(selectAllUsers);
  };

  private unsubscribe$ = new Subject<void>();

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

  private subscribeToUsers() {
    this.users$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(users => {
      this.data = users;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
