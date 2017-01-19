import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber } from '../common';
import { BalanceResource } from './balance';
import { TransactionsResource } from './transactions';

export class AccountsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Account> {

  list = (params?: AccountsParameters): Promise<AccountList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'accounts', params, response => {
      return response;
    });
  }

  withId = (id: number|string): AccountResource => {
    return new AccountResource(id, this.getPath(), this.getClient());
  }
}

export class AccountResource extends CSCoreSDK.InstanceResource {

  get balance(): BalanceResource {
    return new BalanceResource(`${this.getPath()}/balance`, this.getClient());
  }

  get transactions(): TransactionsResource {
    return new TransactionsResource(`${this.getPath()}/transactions`, this.getClient());
  }
}

export interface AccountsParameters extends CSCoreSDK.Sortable, CSCoreSDK.Paginated {}

export interface AccountList extends CSCoreSDK.PaginatedListResponse<Account> {}

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
  accountOwber: AccountOwner;
}

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
  }
}