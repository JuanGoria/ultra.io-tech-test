import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../store/store.service.api';

@Component({
  selector: 'ultra-product-preview',
  templateUrl: 'product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductPreviewComponent {
  @Input() product: Product;
  @Output() onDelete: EventEmitter<Product> = new EventEmitter();

  delete(product: Product): void {
    this.onDelete.emit(product);
  }
}
