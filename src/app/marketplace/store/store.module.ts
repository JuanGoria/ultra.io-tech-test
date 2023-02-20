import { NgModule } from '@angular/core';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { ProductCardComponent } from './product-card/product.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [StoreRoutingModule, CommonModule, NgOptimizedImage, SharedModule],
  declarations: [StoreComponent, ProductCardComponent],
})
export class StoreModule { }
