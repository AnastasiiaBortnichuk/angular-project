import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '@shared/types';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<IProduct[]>([]);
  favorites$: Observable<IProduct[]> = this.favoritesSubject.asObservable();

  constructor() {
    console.log('FavoritesService instance created');
  }

  get favorites(): IProduct[] {
    return this.favoritesSubject.value;
  }

  setFavorites(product: IProduct): void {
    const currentFavorites = this.favoritesSubject.value;
    console.log('currentFavorites >>>', currentFavorites);
    let updatedFavorites;
    if (currentFavorites.find(fav => fav.id === product.id)) {
      updatedFavorites = currentFavorites.filter(fav => fav.id !== product.id);
    } else {
      updatedFavorites = [...currentFavorites, product];
    }
    console.log('updatedFavorites >>>', updatedFavorites);
    this.favoritesSubject.next(updatedFavorites);
  }

  ngOnDestroy() {
    console.log('FavoritesService instance destroyed');
  }
}
