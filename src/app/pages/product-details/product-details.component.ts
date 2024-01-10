import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '@app-services/cart.service';
import { FavoritesService } from '@app-services/favorites.service';
import { ProductsService } from '@app-services/products.service';
import { CART_ADDED, CART_ADD_TO, EMPTY_HEART, FILLED_HEART } from '@shared/constants';
import { isAdded } from '@shared/helpers';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class ProductDetailsComponent implements OnInit {
  public product$!: Observable<IProduct>;
  public isAddedToCart: boolean = false;
  private isInFavorites: boolean = false;
  public buttonTitle: string = CART_ADD_TO;
  public heartIcon: string = EMPTY_HEART;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private productsService: ProductsService,
    ) {}

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.product$ = this.productsService.getProductDetails(productIdFromRoute);

    // Access cart data
    this.cartService.cart$.subscribe((cart) => {
      this.product$.subscribe((product) => {
        this.isAddedToCart = isAdded(cart, product.id);
        this.buttonTitle = this.isAddedToCart ? CART_ADDED : CART_ADD_TO;
      })
    });

    // Access favorites data
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.product$.subscribe((product) => {
        this.isInFavorites = isAdded(favorites, product.id);
        this.heartIcon = this.isInFavorites ? FILLED_HEART : EMPTY_HEART;
      })
    })

    console.log('isInFavorites', this.isInFavorites);
    this.heartIcon = this.isInFavorites ? FILLED_HEART : EMPTY_HEART;
  }

  handleAddToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  handleSetFavorites(product: IProduct) {
    this.favoritesService.setFavorites(product);
  }
}
