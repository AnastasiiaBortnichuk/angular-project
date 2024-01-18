import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ALL, ASC, PRICE_HIGH, PRICE_LOW, PRICE_SORTING } from '@shared/constants';
import { API_STRING_MOCK, IProduct, PriceRate } from '@shared/types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['../../../styles/catalog.scss']
})
export class FiltersComponent implements OnChanges {
  @Input() products: IProduct[] = [];
  @Input() brands: API_STRING_MOCK[] = [];
  @Output() filtersApplied = new EventEmitter<IProduct[]>();

  query = '';
  filterBrand?: string;
  priceRate: PriceRate = ALL;
  priceSorting: string = PRICE_SORTING;
  priceHigh: string = PRICE_HIGH;
  priceLow: string = PRICE_LOW;

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['products'].currentValue &&
      changes['products'] &&
      changes['filterBrand'] ||
      changes['query'] ||
      changes['priceRate']
    ) {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    let searchedProducts = [...this.products];

    if (this.query) {
      searchedProducts = searchedProducts.filter(product =>
        product.name.toLowerCase().includes(this.query.toLowerCase())
      );
    }

    let productsByBrand = [...searchedProducts];

    if (this.filterBrand && this.filterBrand !== ALL) {
      productsByBrand = productsByBrand.filter(product => product.brand === this.filterBrand);
    }

    let sortedByPrice = [...productsByBrand];

    if (this.priceRate !== ALL) {
      sortedByPrice = sortedByPrice.sort((a, b) => {
        const priceA = +a.price;
        const priceB = +b.price;

        return this.priceRate === ASC ? priceA - priceB : priceB - priceA;
      });
    }

    this.filtersApplied.emit(sortedByPrice);
  }

  changeQuery(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.query = target.value;
    this.applyFilters();
  }

  changeBrand(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterBrand = target.value;
    this.applyFilters();
  }

  changePriceRate(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.priceRate = target.value as PriceRate;
    this.applyFilters();
  }
}
