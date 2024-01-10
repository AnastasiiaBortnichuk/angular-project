import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { API_STRING_MOCK, IProduct } from '@shared/types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['../../../styles/catalog.scss']
})
export class CatalogComponent implements OnInit {
  products!: IProduct[];
  brands!: API_STRING_MOCK[];
  filteredProducts: IProduct[] = [];

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts()
      .subscribe((products) => {
        this.products = products;
        this.brands = Array.from(
          new Set(products.map((product: IProduct) => product.brand))
        );
        this.filteredProducts = [...products];
      })
  }

  setFilteredProducts(filteredProducts: IProduct[]): void {
    this.filteredProducts = filteredProducts;
  }
}
