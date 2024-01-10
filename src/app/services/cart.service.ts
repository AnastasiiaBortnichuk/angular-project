import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<IProduct[]>([]);
  cart$: Observable<IProduct[]> = this.cartSubject.asObservable();

  constructor() {
    console.log('CartService instance created');
  }

  get cart(): IProduct[] {
    return this.cartSubject.value;
  }

  addToCart(product: IProduct): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = [...currentCart, product];
    console.log('currentCart >>>', currentCart);
    console.log('updatedCart >>>', updatedCart);

    this.cartSubject.next(updatedCart);
  }

  removeFromCart(product: IProduct): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== product.id);
    console.log('currentCart >>>', currentCart);
    console.log('updatedCart >>>', updatedCart);

    this.cartSubject.next(updatedCart);
  }

  ngOnDestroy() {
    console.log('CartService instance destroyed');
  }
}
