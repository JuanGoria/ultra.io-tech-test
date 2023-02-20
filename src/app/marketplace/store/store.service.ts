import { Injectable } from '@angular/core';
import { StoreApiService, Product } from './store.service.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private readonly $api: StoreApiService) { }
  
  getProducts(): Observable<Product[]> {
    return this.$api.getProducts();
  }

  addProductToBasket(product: Product): Observable<null> {
    return this.$api.addProductToBasket(product);
  }

  removeProductFromBasket(product: Product): Observable<null> {
    return this.$api.removeProductFromBasket(product);
  }

  pay(products: Product[], total: number, balance: number): Observable<Product[]> {
    return this.$api.pay(products, total, balance);
  }
}
