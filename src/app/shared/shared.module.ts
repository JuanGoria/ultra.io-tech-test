import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BalancePipe } from './pipes/balance.pipe';

@NgModule({
  imports: [MaterialModule],
  declarations: [BalancePipe],
  exports: [MaterialModule, BalancePipe]
})
export class SharedModule { }
