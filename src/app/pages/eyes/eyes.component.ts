import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';
import { Subject, takeUntil } from 'rxjs';
import { fetchProductProps } from 'src/app/utils/product-utils';

const EYES_PRODUCTS = ['mascara', 'eyeliner', 'eyeshadow'];

@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
})
export class EyesComponent implements OnInit {
  products: ProductTypes[] = EYES_PRODUCTS as ProductTypes[];
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
