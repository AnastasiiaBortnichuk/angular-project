import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts,deleteProduct, updateProduct } from '../../../state/actions/products.actions';
import { selectAllProducts } from '../../../state/selectors/products.selectors';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from '../../../state/models/product.model';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from 'src/app/custom-table/table-config.model';
import { SelectionModel } from '@angular/cdk/collections';
import { PRODUCTS_TABLE_CONFIG_TOKEN } from 'src/app/app.tokens';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html'
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  products$: Observable<Product[]>;
  data: any[] = [];
  selection = new SelectionModel<Product>(true, []);

  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customCellTemplates: { [key: string]: TemplateRef<any> } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store<{ products: Product[] }>,
    @Inject(PRODUCTS_TABLE_CONFIG_TOKEN) public tableConfig: TableConfig
  ) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit() {
    this.loadProducts();
    this.subscribeToProducts();
  }

  ngAfterViewInit() {
    this.customCellTemplates = {
      address: this.customCell
    };
  }

  loadProducts() {
    this.store.dispatch(loadProducts());
  }

  updateProductAction = (product: Product) => updateProduct({ product });

  deleteSelected() {
    const selectedIds = this.selection.selected.map(item => item.id);

    selectedIds.forEach(id => {
      this.store.dispatch(deleteProduct({ id }));
    });

    this.selection.clear();

    this.tableConfig.totalItems = this.data.length - selectedIds.length;
  }

  private subscribeToProducts() {
    this.products$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(products => {
      this.data = products;
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
