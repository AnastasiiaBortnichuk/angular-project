import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';
import { Subject, takeUntil } from 'rxjs';
import { fetchProductProps } from 'src/app/utils/product-utils';

const FACE_PRODUCTS = ['blush', 'bronzer', 'foundation'];

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
})
export class FaceComponent implements OnInit {
  products: ProductTypes[] = FACE_PRODUCTS as ProductTypes[];
  productProps: Record<ProductTypes, IProduct[]> = {} as Record<ProductTypes, IProduct[]>;
  private unsubscribe$ = new Subject<void>();

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    fetchProductProps(this.products, this.productsService)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: productProps => {
        this.productProps = productProps as Record<ProductTypes, IProduct[]>;
      },
      error: err => {
        console.error('Error fetching product props:', err);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
