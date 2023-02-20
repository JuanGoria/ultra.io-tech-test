export namespace UserActions {
  export class UpdateBalance {
    static readonly type = '[User] Update Balance';
    constructor(public newAmount: number) {}
  }
}