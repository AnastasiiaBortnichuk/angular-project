import { Component, Input } from '@angular/core';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class ProductComponent {
  @Input()
  product!: IProduct;
}
