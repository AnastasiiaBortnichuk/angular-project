import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersService } from '../../app/services/users.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, deleteUser, updateUser } from '../actions/users.actions';
import { User } from '../models/user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.usersService.getAllUsers()
      .pipe(
        map(users => users.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: user.address,
          phone: user.phone
        }) as User )),
        map(transformedUsers => loadUsersSuccess({ users: transformedUsers })),
        catchError(error => of(loadUsersFailure({ error })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}
