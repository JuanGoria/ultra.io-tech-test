import { NgModule } from '@angular/core';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [BasketRoutingModule, CommonModule, NgOptimizedImage, SharedModule],
  declarations: [BasketComponent, ProductPreviewComponent]
})
export class BasketModule { }
