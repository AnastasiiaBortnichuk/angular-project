import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../../app/services/products.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure, deleteProduct, updateProduct } from '../actions/products.actions';
import { Product } from '../models/product.model';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(loadProducts),
    mergeMap(() => this.productsService.getAllProducts()
      .pipe(
        map(products => products.map(product => ({
          id: product.id,
          brand: product.brand,
          name: product.name,
          price: product.price,
          product_type: product.product_type,
          image: product.image_link
        }) as Product )),
        map(transformedProducts => loadProductsSuccess({ products: transformedProducts })),
        catchError(error => of(loadProductsFailure({ error })))
      ))
  ));

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
