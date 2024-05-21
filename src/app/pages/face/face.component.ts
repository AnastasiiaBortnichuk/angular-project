import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';
import { fetchProductProps } from 'src/app/utils/product-utils';

const FACE_PRODUCTS = ['blush', 'bronzer', 'foundation'];

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
})
export class FaceComponent implements OnInit {
  products: ProductTypes[] = FACE_PRODUCTS as ProductTypes[];
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
