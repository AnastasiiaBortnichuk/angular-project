import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/products.reducers';

export const selectProductsState = createFeatureSelector<State>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: State) => state.products
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: State) => state.error
);
