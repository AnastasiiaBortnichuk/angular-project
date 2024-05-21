import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';
import { fetchProductProps } from 'src/app/utils/product-utils';

const LIPS_PRODUCTS = ['lipstick', 'lip_liner'];
//'lip_liner' variable has a name with underscore because it must match
//the value of the product category that comes in response to the request

@Component({
  selector: 'app-lips',
  templateUrl: './lips.component.html',
})
export class LipsComponent implements OnInit {
  products: ProductTypes[] = LIPS_PRODUCTS as ProductTypes[];
  productProps: Record<ProductTypes, IProduct[]> = {} as Record<ProductTypes, IProduct[]>;

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    fetchProductProps(this.products, this.productsService)
      .subscribe({
        next: productProps => {
          this.productProps = productProps as Record<ProductTypes, IProduct[]>;
        },
        error: err => {
          console.error('Error fetching product props:', err);
        }
      });
  }
}
