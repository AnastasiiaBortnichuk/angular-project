import { Component, Input } from '@angular/core';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class ProductsComponent {
  @Input()
  products!:  IProduct[];
}
