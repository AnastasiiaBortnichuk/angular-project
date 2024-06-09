import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct } from '@shared/types';
import { Subject, takeUntil } from 'rxjs';
import { fetchProductProps } from 'src/app/utils/product-utils';

const EYEBROW_PRODUCT = 'eyebrow';

@Component({
  selector: 'app-brows',
  templateUrl: './brows.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class BrowsComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  private unsubscribe$ = new Subject<void>();

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    fetchProductProps([EYEBROW_PRODUCT], this.productsService)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({
      next: productProps => {
        this.products = productProps[EYEBROW_PRODUCT];
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
