import { Component, OnInit } from '@angular/core';
import { forkJoin, from } from 'rxjs';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';

const EYES_PRODUCTS = ['mascara', 'eyeliner', 'eyeshadow'];

@Component({
  selector: 'app-eyes',
  templateUrl: './eyes.component.html',
})
export class EyesComponent implements OnInit {
  products: ProductTypes[] = EYES_PRODUCTS as ProductTypes[];
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
