import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { StoreService } from '../store/store.service';
import { Select, Store } from '@ngxs/store';
import { BasketState } from '../basket/basket.state';
import { Observable, finalize, take, tap, combineLatest } from 'rxjs';
import { Product } from '../store/store.service.api';
import { Balance, UserState } from '../../core/store/user.state';
import { BasketActions } from '../basket/basket.actions';

@Component({
  selector: 'ultra-name',
  templateUrl: 'checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckoutComponent {

  @Select(BasketState.products) products$: Observable<Product[]>;
  @Select(BasketState.total) total$: Observable<number>;
  @Select(UserState.balance) balance$: Observable<Balance>;

  readonly lettersAndNumbers = new RegExp(/^[\u00BF-\u1FFF\u2C00-\uD7FF\+a-zA-Z0-9 ]+$/);
  readonly letters = new RegExp(/^[\u00BF-\u1FFF\u2C00-\uD7FF\+a-zA-Z ]+$/);
  readonly nameMaxLength = 50;
  readonly commonMaxLength = 255;

  readonly loading$ = new BehaviorSubject(false);
  readonly successfulBuy$ = new BehaviorSubject(false);

  form: FormGroup = new FormGroup({
    firstName: new FormControl('Juan', [Validators.required, Validators.maxLength(this.nameMaxLength), Validators.pattern(this.letters)]),
    lastName: new FormControl('Goria', [Validators.required, Validators.maxLength(this.nameMaxLength), Validators.pattern(this.letters)]),
    street: new FormControl('ZZZXXX', [Validators.required, Validators.maxLength(this.commonMaxLength), Validators.pattern(this.lettersAndNumbers)]),
    city: new FormControl('TTTTYYYY', [Validators.required, Validators.maxLength(this.commonMaxLength), Validators.pattern(this.letters)]),
    state: new FormControl('AAASSS', [Validators.required, Validators.maxLength(this.commonMaxLength), Validators.pattern(this.letters)]),
    email: new FormControl('asd@gmail.com', [Validators.required, Validators.email, Validators.maxLength(this.commonMaxLength)])
  });

  constructor(private $service: StoreService, private $store: Store) {}

  pay(): void {

    this.loading$.subscribe(console.log);

    combineLatest([this.products$, this.total$, this.balance$])
    .pipe(
      take(1),
      tap(() => this.loading$.next(true)),
      tap(([products, total, balance]) => this.$service.pay(products, total, balance.amount)),
      finalize(() => {
        this.$store.dispatch(new BasketActions.StopCheckout())
        this.successfulBuy$.next(true);
      })
    ).subscribe()
  }
}
