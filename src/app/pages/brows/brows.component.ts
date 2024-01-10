import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-brows',
  templateUrl: './brows.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class BrowsComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.fetchData('eyebrow')
    .subscribe(result => {
        this.products = result;
    });
  }
}
