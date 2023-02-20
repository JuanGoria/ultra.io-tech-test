import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from './store.service.api';
import { Subject, takeUntil } from 'rxjs';
import { StoreService } from './store.service';

@Component({
  selector: 'ultra-store',
  templateUrl: 'store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoreComponent implements OnInit, OnDestroy {

  constructor(private $service: StoreService) { }

  readonly products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  readonly unsubscribe$ = new Subject();

  getProducts(): void {
    console.log('hola?');
    this.$service.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (collection) => this.products$.next(collection)
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  trackByFn(_, item: Product) { 
    return item.id;
  }
}
