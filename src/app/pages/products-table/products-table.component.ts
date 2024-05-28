import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsService } from '@app-services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TableConfig } from 'src/app/custom-table/table-config.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  data: any[] = [];

  tableConfig: TableConfig = {
    sortableColumns: ['id', 'brand', 'name', 'price', 'product_type', 'image'],
    pagination: true,
    infiniteScroll: false,
    pageSize: 10,
    actionButtons: ['delete', 'update'],
  };

  @ViewChild('customCell', { static: true }) customCell!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customCellTemplates: { [key: string]: TemplateRef<any> } = {};
  dataSource = new MatTableDataSource<any>();

  constructor(private productsService: ProductsService) {};

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.data = data.map(product => ({
        id: product.id,
        brand: product.brand,
        name: product.name,
        price: product.price,
        product_type: product.product_type,
        image: product.image_link
      }));
    });
  }


  ngAfterViewInit() {
    this.customCellTemplates = {
      address: this.customCell
    };
  }
}
