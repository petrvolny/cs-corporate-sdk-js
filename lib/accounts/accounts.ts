import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber } from '../common';
import { BalanceResource } from './balance';
import { TransactionsResource } from './transactions';

export class AccountsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Account> {

  /**
   * List bank accounts incl. basic account information the current user can see accordign to disposition model.
   */
  list = (params?: AccountsParameters): Promise<AccountList> => {
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'accounts', params, response => {

      // Add convenience methods to listing items
      response.items.forEach(item => {
        resourcifyListing(<Account>item, this.withId((<Account>item).id));
      });

      return response;
    });
  }

  /**
   * Returns Account resource with a given ID
   */
  withId = (accountId: number | string): AccountResource => {
    return new AccountResource(accountId, this.getPath(), this.getClient());
  }
}

export class AccountResource extends CSCoreSDK.InstanceResource {

  /**
   * Returns resource for getting accounts balance
   */
  get balance(): BalanceResource {
    return new BalanceResource(`${this.getPath()}/balance`, this.getClient());
  }

  /**
   * Returns resource for getting accounts transactions
   */
  get transactions(): TransactionsResource {
    return new TransactionsResource(`${this.getPath()}/transactions`, this.getClient());
  }
}

const resourcifyListing = (account: Account, accountReference: AccountResource) => {
  account.transactions = accountReference.transactions;
  account.balance = accountReference.balance;
}

export interface AccountsParameters extends CSCoreSDK.Sortable, CSCoreSDK.Paginated { }

export interface AccountList extends CSCoreSDK.PaginatedListResponse<Account> { }

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