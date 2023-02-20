import { Product } from '../store/store.service.api';

export namespace BasketActions {
  export class AddProduct {
    static readonly type = '[Basket] Add Product';
    constructor(public product: Product) {}
  }

  export class RemoveProduct {
    static readonly type = '[Basket] Remove Product';
    constructor(public product: Product) {}
  }

  export class ClearProducts {
    static readonly type = '[Basket] Clear Products';
    constructor() {}
  }

  export class StartCheckout {
    static readonly type = '[Basket] Start Checkout';
    constructor() {}
  }

  export class StopCheckout {
    static readonly type = '[Basket] Stop Checkout';
    constructor() {}
  }
}
