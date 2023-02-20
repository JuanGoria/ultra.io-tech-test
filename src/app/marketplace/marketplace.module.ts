import { NgModule } from '@angular/core';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from './basket/basket.state';


@NgModule({
  imports: [
    MarketplaceRoutingModule,
    NgxsModule.forFeature([BasketState])
  ]
})
export class MarketplaceModule { }
