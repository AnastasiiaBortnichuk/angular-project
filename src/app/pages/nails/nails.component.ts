import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct } from '@shared/types';
import { Subject, takeUntil } from 'rxjs';
import { fetchProductProps } from 'src/app/utils/product-utils';

const NAIL_PRODUCT = 'nail_polish';

@Component({
  selector: 'app-nails',
  templateUrl: './nails.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class NailsComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  private unsubscribe$ = new Subject<void>();

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    fetchProductProps([NAIL_PRODUCT], this.productsService)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: productProps => {
        this.products = productProps[NAIL_PRODUCT];
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
