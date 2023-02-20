import { Selector, State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserActions } from './user.actions';

export interface Balance {
  amount: number;
  currency: string;
}

export interface UserStateModel {
  balance: Balance;
}

@State<UserStateModel>({
  name: 'marketplace',
  defaults: {
    balance: {
      amount: 127.33,
      currency: 'USD'
    }
  }
})
@Injectable()
export class UserState {

  @Selector()
  static balance(state: UserStateModel) {
    return state.balance;
  }

  @Action(UserActions.UpdateBalance)
  updateBalance(ctx: StateContext<UserStateModel>, action: UserActions.UpdateBalance) {
    const balance = ctx.getState().balance;
    return ctx.patchState({ balance: { ...balance, amount: action.newAmount } });
  }
}
