import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import { loadProductsSuccess, loadProductsFailure, deleteProduct, updateProduct } from '../actions/products.actions';

export interface State {
  products: Product[];
  error: any;
}

export const initialProductState: State = {
  products: [],
  error: null
};

export const productReducer = createReducer(
  initialProductState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(deleteProduct, (state, { id }) => ({
    ...state,
    products: state.products.filter(product => product.id !== id)
  })),
  on(updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map(p => (p.id === product.id ? product : p))
  }))
);
