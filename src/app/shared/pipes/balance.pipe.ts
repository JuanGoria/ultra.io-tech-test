import { Pipe, PipeTransform } from '@angular/core';
import { Balance } from '../../core/store/user.state';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {
  transform(balance: Balance): string {
    return `${balance.amount} ${balance.currency}`;
  }
}