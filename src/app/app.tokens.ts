import { InjectionToken, Injectable } from '@angular/core';
import { AppConfig } from './app-config.model';
import { TableConfig } from '../app/custom-table/table-config.model';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const USERS_TABLE_CONFIG_TOKEN = new InjectionToken<TableConfig>('UsersTableConfig');
export const PRODUCTS_TABLE_CONFIG_TOKEN = new InjectionToken<TableConfig>('ProductsTableConfig');

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  getUsersTableConfig(): TableConfig {
    return {
      sortableColumns: ['id', 'name', 'username', 'email', 'address', 'phone'],
      pagination: true,
      infiniteScroll: false,
      pageSize: 10,
      actionButtons: ['delete', 'update'],
    };
  }

  getProductsTableConfig(): TableConfig {
    return {
      sortableColumns: ['id', 'brand', 'name', 'price', 'product_type', 'image'],
      pagination: false,
      infiniteScroll: true,
      pageSize: 10,
      actionButtons: ['delete', 'update'],
    };
  }
}
