import { Component, OnInit } from '@angular/core';
import { forkJoin, from } from 'rxjs';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';

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
    forkJoin(
      this.products.map(product =>
        from(this.productsService.fetchData(product))
      )
    ).subscribe(results => {
      results.forEach((products, index) => {
        const productType = this.products[index] as ProductTypes;;
        this.productProps[productType] = products;
      });
    });
  }
}
