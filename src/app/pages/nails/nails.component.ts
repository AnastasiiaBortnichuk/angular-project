import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-nails',
  templateUrl: './nails.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class NailsComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];

  constructor (
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.fetchData('nail_polish')
    .subscribe(result => {
        this.products = result;
    });
  }
}
