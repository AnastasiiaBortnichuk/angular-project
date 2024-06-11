import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '@app-services/favorites.service';
import { FAVORITES_TITLE, NO_FAVORITES_TITLE } from '@shared/constants';
import { IProduct } from '@shared/types';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['../../../styles/products.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: IProduct[] = [];
  title: string = NO_FAVORITES_TITLE;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit() {
    this.favoritesService.favorites$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((favorites) => {
      this.favorites = favorites;
    })

    this.title = this.favorites.length ? FAVORITES_TITLE : NO_FAVORITES_TITLE;;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
