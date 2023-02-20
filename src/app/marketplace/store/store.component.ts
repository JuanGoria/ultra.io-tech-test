import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from './store.service.api';
import { Subject, take } from 'rxjs';
import { StoreService } from './store.service';

@Component({
  selector: 'ultra-store',
  templateUrl: 'store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoreComponent implements OnInit {

  constructor(private $service: StoreService) { }

  readonly products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  readonly unsubscribe$ = new Subject();

  getProducts(): void {
    this.$service.getProducts()
      .pipe(take(1))
      .subscribe({
        next: (collection) => this.products$.next(collection)
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  trackByFn(_, item: Product) { 
    return item.id;
  }
}
