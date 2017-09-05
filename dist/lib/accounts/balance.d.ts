import * as CSCoreSDK from 'cs-core-sdk';
import { Amount } from '../common';
/**
 * @class BalanceResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.GetEnabled<AccountBalance>}
 */
export declare class BalanceResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<AccountBalance> {
    /**
     * Get balance of the account
     * @returns {Promise<AccountBalance>}
     */
    get: () => Promise<AccountBalance>;
}
/**
 * @interface AccountBalance
 */
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
