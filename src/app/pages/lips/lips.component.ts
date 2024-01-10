import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductsService } from '@app-services/products.service';
import { IProduct, ProductTypes } from '@shared/types';

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
    const observables = this.products.map(product => this.productsService.fetchData(product));

    forkJoin(observables).subscribe(results => {
      results.forEach((products, index) => {
        const productType = this.products[index] as ProductTypes;;
        this.productProps[productType] = products;
      });
    });
  }
}
