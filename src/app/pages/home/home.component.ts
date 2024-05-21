import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { CATEGORIES } from '@shared/constants';
import { IProduct } from '@shared/types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../styles/home.scss']
})
export class HomeComponent implements OnInit {
  categories = CATEGORIES;
  types: string[] | undefined;

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().pipe(
      map(products => Array.from(
        new Set(products.map((product: IProduct) => product.product_type))
      ))
    ).subscribe(types => {
        this.types = types;
    });
  }

  updateTitle(title: string): string {
    return title.replace(/_/g, ' ');
  }
}
