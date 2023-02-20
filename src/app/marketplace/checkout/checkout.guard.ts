import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { BasketState } from '../basket/basket.state';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
  @Select(BasketState.isPaying) isPaying$: Observable<boolean>

  constructor(private $router: Router){}

  canActivate() {

    return this.isPaying$.pipe(map((isPaying) => {
      if (isPaying) {
        return true;
      }

      this.$router.navigate(['/']);
      return false;
    }));
  }
}