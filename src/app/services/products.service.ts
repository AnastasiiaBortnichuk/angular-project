import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '@shared/types';
import { environment as env } from './../../environments/environment.development';

@Injectable()
export class ProductsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(env.BASE_JSON_URL);
  }

  fetchData(param: string): Observable<IProduct[]> {
    const params = new HttpParams().set('product_type', `${param}`);

    return this.http.get<IProduct[]>(`${env.BASE_JSON_URL}`, { params })
  };

  getProductDetails(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${env.BASE_URL}/${productId}.json`)
  };
}
