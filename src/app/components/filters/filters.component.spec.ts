import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { ALL, ASC, PRICE_HIGH, PRICE_LOW, PRICE_SORTING } from '@shared/constants';
import { SimpleChanges } from '@angular/core';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent]
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.products).toEqual([]);
    expect(component.brands).toEqual([]);
    expect(component.filtersApplied).toBeTruthy();
    expect(component.query).toEqual('');
    expect(component.filterBrand).toBeUndefined();
    expect(component.priceRate).toEqual(ALL);
    expect(component.priceSorting).toEqual(PRICE_SORTING);
    expect(component.priceHigh).toEqual(PRICE_HIGH);
    expect(component.priceLow).toEqual(PRICE_LOW);
  });

  it('should call applyFilters on ngOnChanges', () => {
    spyOn(component, 'applyFilters');
    const changes: SimpleChanges = {
      products: {
        currentValue: [],
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    };
    component.ngOnChanges(changes);
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should update query and call applyFilters on changeQuery', () => {
    spyOn(component, 'applyFilters');
    const event = new Event('input');
    const inputElement = document.createElement('input');
    spyOnProperty(event, 'target').and.returnValue(inputElement);

    component.changeQuery(event);

    expect(component.query).toEqual('');
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should update filterBrand and call applyFilters on changeBrand', () => {
    spyOn(component, 'applyFilters');
    const event = new Event('change');
    const selectElement = document.createElement('select');
    spyOnProperty(event, 'target').and.returnValue(selectElement);

    component.changeBrand(event);

    expect(component.filterBrand).toBeUndefined();
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should update priceRate and call applyFilters on changePriceRate', () => {
    spyOn(component, 'applyFilters');
    const event = new Event('change');
    const selectElement = document.createElement('select');
    spyOnProperty(event, 'target').and.returnValue(selectElement);

    component.changePriceRate(event);

    expect(component.priceRate).toEqual(ALL);
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should emit filtersApplied event with filtered products on applyFilters', () => {
    const emitSpy = spyOn(component.filtersApplied, 'emit');
    component.products = [
      { name: 'Product A', brand: 'Brand A', price: '10.00', id: 1, product_type: 'mascara' },
      { name: 'Product B', brand: 'Brand B', price: '20.00', id: 2, product_type: 'mascara' },
      { name: 'Product C', brand: 'Brand A', price: '15.00', id: 3, product_type: 'mascara' },
    ];
    component.brands = ['Brand A', 'Brand B'];
    component.query = 'Product';
    component.filterBrand = 'Brand A';
    component.priceRate = ASC;

    component.applyFilters();

    expect(emitSpy).toHaveBeenCalledWith([
      { name: 'Product A', brand: 'Brand A', price: '10.00', id: 1, product_type: 'mascara' },
      { name: 'Product C', brand: 'Brand A', price: '15.00', id: 3, product_type: 'mascara' },
    ]);
  });
});
