import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { loadUsersSuccess, loadUsersFailure, deleteUser, updateUser } from '../actions/users.actions';

export interface State {
  users: User[];
  error: any;
}

export const initialUserState: State = {
  users: [],
  error: null
};

export const userReducer = createReducer(
  initialUserState,
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  })),
  on(updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u))
  }))
);
