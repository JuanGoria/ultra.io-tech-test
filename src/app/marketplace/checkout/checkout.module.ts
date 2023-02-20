import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [CheckoutRoutingModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [CheckoutComponent]
})
export class CheckoutModule { }
