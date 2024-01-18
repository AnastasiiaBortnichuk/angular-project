import { Component, Input } from '@angular/core';
import { CartService } from '@app-services/cart.service';
import { FavoritesService } from '@app-services/favorites.service';
import { CART_ADDED, CART_ADD_TO, EMPTY_HEART, FILLED_HEART } from '@shared/constants';
import { isAdded } from '@shared/helpers';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class ButtonsComponent {
  @Input() product!: IProduct;

  public isAddedToCart: boolean = false;
  private isInFavorites: boolean = false;
  public buttonTitle: string = CART_ADD_TO;
  public heartIcon: string = EMPTY_HEART;

  constructor(
    private cartService: CartService,
    private favoritesService: FavoritesService,
    ) { }

  ngOnInit(): void {
    // Access cart data
    this.cartService.cart$.subscribe((cart) => {
      this.isAddedToCart = isAdded(cart, this.product.id);
      this.buttonTitle = this.isAddedToCart ? CART_ADDED : CART_ADD_TO;
    });
    // Access favorites data
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.isInFavorites = isAdded(favorites, this.product.id);
      this.heartIcon = this.isInFavorites ? FILLED_HEART : EMPTY_HEART;
    });
  }

  get submitBtnClass(): string {
    return this.isAddedToCart ? 'button_buy__active' : 'button_buy'
  }

  handleAddToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  handleSetFavorites(product: IProduct) {
    this.favoritesService.setFavorites(product);
  }
}
