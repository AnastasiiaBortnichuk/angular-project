import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';
import { forkJoin, from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

export function fetchProductProps(products: ProductTypes[], productsService: ProductsService) {
  return forkJoin(
    products.map(product =>
      from(productsService.fetchData(product)).pipe(
        map(products => ({ [product]: products })),
        catchError(error => {
          console.error('Error fetching product data:', error);
          return of({ [product]: [] });
        })
      )
    )
  ).pipe(
    switchMap(results =>
      of(results.reduce((acc, result) => {
        const productType = Object.keys(result)[0] as ProductTypes;
        acc[productType] = result[productType];
        return acc;
      }, {} as Record<ProductTypes, IProduct[]>))
    )
  );
}
