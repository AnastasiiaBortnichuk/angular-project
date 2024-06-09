import { Component, OnInit } from '@angular/core';
import { CartService } from '@app-services/cart.service';
import { CART_EMPTY, CART_TITLE } from '@shared/constants';
import { IProduct } from '@shared/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../styles/cart.scss']
})
export class CartComponent implements OnInit {
  isPopupShown: boolean = false;
  count: number = 0;
  cart: IProduct[] = [];
  title: string = CART_EMPTY;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    ) {}

  ngOnInit() {
    this.cartService.cart$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((cart) => {
      this.cart = cart;
    })

    this.count = this.cart.length
      ? this.cart.map((product) => +product.price).reduce((a, b) => a + b)
      : 0;

    this.title = this.cart.length ? CART_TITLE : CART_EMPTY;
  }

  handleClick(): void {
    console.log('isPopupShown <<', this.isPopupShown)
    this.isPopupShown = true;
  };

  handleDelete(product: IProduct) {
    this.cartService.removeFromCart(product);
  };

  handleClosePopup(): void {
    this.isPopupShown = false;
    console.log('handleClosePopup', this.isPopupShown)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
