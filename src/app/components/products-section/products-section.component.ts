import { Component, Input } from '@angular/core';
import { CLICK } from '@shared/constants';
import { IProduct, ProductTypes } from '@shared/types';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class ProductsSectionComponent {
  @Input()
  products!: ProductTypes[];
  @Input()
  productProps!: Record<ProductTypes, IProduct[]>;

  click = CLICK;

  getTenProducts(product: ProductTypes): IProduct[] {
    return (this.productProps[product] as IProduct[])?.slice(0, 10);
  }

  updateTitle(title: string): string {
    return title.replace(/_/g, ' ');
  }
}
