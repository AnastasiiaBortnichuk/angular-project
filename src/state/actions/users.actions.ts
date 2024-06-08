import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());

export const deleteUser = createAction('[User] Delete User', props<{ id: number }>());
export const updateUser = createAction('[User] Update User', props<{ user: User }>());
