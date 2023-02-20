import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Product } from '../store.service.api';
import { Select, Store } from '@ngxs/store';
import { BasketActions } from '../../basket/basket.actions';
import { take, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasketState } from '../../basket/basket.state';

@Component({
  selector: 'ultra-product-card',
  templateUrl: 'product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCardComponent {
  
  @Input() product: Product;
  @Output() onBasketUpdate: EventEmitter<boolean> = new EventEmitter();
  
  @Select(BasketState.products) products$: Observable<string[]>
  
  constructor(private $store: Store, private $snackbar: MatSnackBar) { }

  addToCart(product: Product): void {
    this.$store.dispatch(new BasketActions.AddProduct(product))
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.onBasketUpdate.emit(true);
          this.$snackbar.open(`${product.title} added to the basket!`, null, { duration: 3000, panelClass: ['fs-14', 'ta-c'] })
        }
      })
  }

  removeFromCart(product: Product): void {
    this.$store.dispatch(new BasketActions.RemoveProduct(product))
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.onBasketUpdate.emit(true);
          this.$snackbar.open(`${product.title} removed from the basket!`, null, { duration: 3000, panelClass: ['fs-14', 'ta-c'] })
        }
      })
  }
}
