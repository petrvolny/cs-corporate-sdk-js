import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';

export class BalanceResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<AccountBalance> {

  /**
   * Get balance of the account
   */
  get = (): Promise<AccountBalance> => {

    return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {

      // transform ISO strings to date objects
      CSCoreSDK.EntityUtils.addDatesFromISO('overdraftDueDate', response);

      return response;
    });
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