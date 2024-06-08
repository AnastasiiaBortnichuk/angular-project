import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/users.reducers';

export const selectUsersState = createFeatureSelector<State>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: State) => state.users
);

export const selectProductsError = createSelector(
  selectUsersState,
  (state: State) => state.error
);
