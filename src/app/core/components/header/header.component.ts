import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { BasketState } from '../../../marketplace/basket/basket.state';
import { Observable } from 'rxjs';
import { UserState, Balance } from '../../store/user.state';
import { Product } from '../../../marketplace/store/store.service.api';

@Component({
  selector: 'ultra-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderCommponent {
  @Select(UserState.balance) balance$: Observable<Balance>;
  @Select(BasketState.products) products$: Observable<Product[]>;
}