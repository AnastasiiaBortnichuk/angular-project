import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@app-services/products.service';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product$!: Observable<IProduct>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    ) {}

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.product$ = this.productsService.getProductDetails(productIdFromRoute);
  }
}
