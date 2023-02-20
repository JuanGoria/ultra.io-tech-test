import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BasketState } from './basket.state';
import { Observable, take } from 'rxjs';
import { UserState, Balance } from '../../core/store/user.state';
import { Product } from '../store/store.service.api';
import { BasketActions } from './basket.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'ultra-basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasketComponent {

  @Select(BasketState.products) products$: Observable<Product[]>;
  @Select(BasketState.total) total$: Observable<number>;
  @Select(UserState.balance) balance$: Observable<Balance>;

  constructor(private $store: Store, private $router: Router) {}

  deleteProduct(product: Product): void {
    this.$store.dispatch(new BasketActions.RemoveProduct(product));
  }

  goToCheckout(): void {
    this.$store.dispatch(new BasketActions.StartCheckout())
      .pipe(take(1))
      .subscribe(() => this.$router.navigate(['/checkout']));
  }
}