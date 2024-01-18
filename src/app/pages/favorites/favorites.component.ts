import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '@app-services/favorites.service';
import { FAVORITES_TITLE, NO_FAVORITES_TITLE } from '@shared/constants';
import { IProduct } from '@shared/types';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: IProduct[] = [];
  title: string = NO_FAVORITES_TITLE;

  constructor(
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit() {
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    })

    this.title = this.favorites.length ? FAVORITES_TITLE : NO_FAVORITES_TITLE;;
  }
}
