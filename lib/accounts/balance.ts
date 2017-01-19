import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

export class BalanceResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<AccountBalance> {

  get = (): Promise<AccountBalance> => {

    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }
}

export interface AccountBalance {

  /**
   * Ledger balance info
   */
  balance?: Amount;

  /**
   * Current available balance info
   */
  disposable?: Amount;

  /**
   * Minimal balance to be kept
   */
  minBalance?: number;

  /**
   * Overdraft info
   */
  overdraft?: Amount;

  /**
   * Overdraft due date
   */
  overdraftDueDate?: Date;
}