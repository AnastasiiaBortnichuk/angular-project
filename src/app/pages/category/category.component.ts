import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@app-services/products.service';
import { API_STRING_MOCK, IProduct } from '@shared/types';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class CategoryComponent implements OnInit {
  public productType$!: string;

  products: IProduct[] = [] as IProduct[];
  brands!: API_STRING_MOCK[];
  filteredProducts: IProduct[] = [];

  constructor (
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productTypeFromRoute = routeParams.get('productType');

    this.productType$ = productTypeFromRoute!;

    this.productsService.fetchData(this.productType$)
    .subscribe((products) => {
        this.products = products;
        this.brands = Array.from(
          new Set(products.map((product: IProduct) => product.brand).sort())
        );
        this.filteredProducts = [...products];
    });
  }

  setFilteredProducts(filteredProducts: IProduct[]): void {
    this.filteredProducts = filteredProducts;
  }

  updateTitle(title: string): string {
    return title.replace(/_/g, ' ');
  }
}
