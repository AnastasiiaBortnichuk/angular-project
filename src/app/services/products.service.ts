import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '@shared/types';
import { ConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.configService.baseJsonUrl);
  }

  fetchData(param: string): Observable<IProduct[]> {
    const params = new HttpParams().set('product_type', param);

    return this.http.get<IProduct[]>(this.configService.baseJsonUrl, { params })
  };

  getProductDetails(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.configService.baseUrl}/${productId}.json`)
  };
}
