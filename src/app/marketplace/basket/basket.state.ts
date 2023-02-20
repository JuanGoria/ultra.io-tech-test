import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { BasketActions } from './basket.actions';
import { Product } from '../store/store.service.api';
import { StoreService } from '../store/store.service';
import { tap, of } from 'rxjs';

export interface BasketStateModel {
  products: Product[];
  isPaying: boolean;
}

@State<BasketStateModel>({
  name: 'basket',
  defaults: {
    products: [],
    isPaying: false
  }
})
@Injectable()
export class BasketState {

  @Selector()
  static products(state: BasketStateModel) {
    return state.products;
  }

  @Selector()
  static total(state: BasketStateModel) {
    return state.products.reduce((accum,item) => {
      const price = item.discountPrice ? item.discountPrice.amount : item.price.amount;
      return accum + price;
    }, 0)
  }

  @Selector()
  static isPaying(state: BasketStateModel) {
    return state.isPaying;
  }

  constructor(private $service: StoreService, private $store: Store) {}

  @Action(BasketActions.AddProduct)
  addProduct(ctx: StateContext<BasketStateModel>,  action: BasketActions.AddProduct) {
    const products = ctx.getState().products;

    return this.$service.addProductToBasket(action.product)
      .pipe(tap(() => ctx.patchState({ products: [...products, action.product] })))
  }

  @Action(BasketActions.RemoveProduct) 
  removeProduct(ctx: StateContext<BasketStateModel>, action: BasketActions.RemoveProduct) {
    const products = ctx.getState().products;
    const newList = products.filter((product) => product.id !== action.product.id);
    return this.$service.removeProductFromBasket(action.product)
      .pipe(tap(() => ctx.patchState({ products: [...newList] })))
  }

  @Action(BasketActions.ClearProducts)
  clearProducts(ctx: StateContext<BasketStateModel>) {
    return of(ctx.patchState({ products: [] }));
  }

  @Action(BasketActions.StartCheckout)
  startCheckout(ctx: StateContext<BasketStateModel>) {
    return of(ctx.patchState({ isPaying: true }));
  }

  @Action(BasketActions.StopCheckout)
  stopCheckout(ctx: StateContext<BasketStateModel>) {
    return of(ctx.patchState({ isPaying: false }));
  }
}
