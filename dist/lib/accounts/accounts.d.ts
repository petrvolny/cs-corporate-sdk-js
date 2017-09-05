import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber } from '../common';
import { BalanceResource } from './balance';
import { TransactionsResource } from './transactions';
/**
 * @class AccountsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Account>}
 */
export declare class AccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Account> {
    /**
     * List bank accounts incl. basic account information the current user can see accordign to disposition model.
     * @param {AccountsParameters=} params
     * @returns {Promise<AccountList>}
     */
    list: (params?: AccountsParameters) => Promise<AccountList>;
    /**
     * Returns Account resource with a given ID
     * @param {number|string} accountId
     * @returns {AccountResource}
     */
    withId: (accountId: string | number) => AccountResource;
}
/**
 * @class AccountResource
 * @extends {CSCoreSDK.InstanceResource}
 */
export declare class AccountResource extends CSCoreSDK.InstanceResource {
    /**
     * Returns resource for getting accounts balance
     * @returns {BalanceResource}
     */
    readonly balance: BalanceResource;
    /**
     * Returns resource for getting accounts transactions
     * @returns {TransactionsResource}
     */
    readonly transactions: TransactionsResource;
}
/**
 * @enum AccountsSortableFields
 */
export declare enum AccountsSortableFields {
    ID = "id",
}
/**
 * @interface AccountsParameters
 * @extends {CSCoreSDK.Sortable}
 * @extends {CSCoreSDK.Paginated}
 */
export interface AccountsParameters extends CSCoreSDK.Sortable<AccountsSortableFields>, CSCoreSDK.Paginated {
}
/**
 * @interface AccountList
 * @extends {CSCoreSDK.PaginatedListResponse<Account>}
 */
export interface AccountList extends CSCoreSDK.PaginatedListResponse<Account> {
}
/**
 * @interface Account
 */
export interface Account {
    /**
     * product instance id used to uniquely reference the particular product instance (IBAN is not always present and account number does not always uniquely identify an account/product instance)
     */
    id: string;
    /**
     * Account info object
     */
    accountNo?: AccountNumber;
    /**
     * Name of the bank account
     */
    accountType: string;
    /**
     * Currency of the bank account
     */
    currency: string;
    /**
     * Account owner
     */
    accountOwner: AccountOwner;
    /**
    * Convenience getter for getting accounts's transactions resource
    */
    transactions: TransactionsResource;
    /**
    * Convenience getter for getting accounts's balance resource
    */
    balance: BalanceResource;
}
/**
 * @interface AccountOwner
 */
export interface AccountOwner {
    /**
     * Company owns the account
     */
    company?: {
        /**
         * Name of the client company
         */
        name: string;
        /**
         * Registration number (ICO) of the client company
         */
        regNum: string;
    };
    /**
     * Related person for given account
     */
    person?: {
        /**
         * First name of a person
         */
        firstName: string;
        /**
         * Last name of a person
         */
        lastName: string;
        /**
         * Title of a person
         */
        title?: string;
        /**
         * Additional title of a person
         */
        additionalTitle?: string;
    };
}
