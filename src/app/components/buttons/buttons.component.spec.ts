import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsComponent } from './buttons.component';
import { CartService } from '@app-services/cart.service';
import { FavoritesService } from '@app-services/favorites.service';
import { CART_ADD_TO, EMPTY_HEART } from '@shared/constants';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;
  let cartService: CartService;
  let favoritesService: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsComponent],
      providers: [CartService, FavoritesService],
    });
    fixture = TestBed.createComponent(ButtonsComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    favoritesService = TestBed.inject(FavoritesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isAddedToCart).toBeFalse();
    expect(component.isInFavorites).toBeFalse();
    expect(component.buttonTitle).toEqual(CART_ADD_TO);
    expect(component.heartIcon).toEqual(EMPTY_HEART);
  });

  it('should provide correct CSS class based on isAddedToCart', () => {
    component.isAddedToCart = true;
    expect(component.submitBtnClass).toEqual('button_buy__active');

    component.isAddedToCart = false;
    expect(component.submitBtnClass).toEqual('button_buy');
  });

  it('should call addToCart method on handleAddToCart', () => {
    const addToCartSpy = spyOn(cartService, 'addToCart');
    component.handleAddToCart(component.product);
    expect(addToCartSpy).toHaveBeenCalledWith(component.product);
  });

  it('should call setFavorites method on handleSetFavorites', () => {
    const setFavoritesSpy = spyOn(favoritesService, 'setFavorites');
    component.handleSetFavorites(component.product);
    expect(setFavoritesSpy).toHaveBeenCalledWith(component.product);
  });
});
