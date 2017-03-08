import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber, Amount } from '../common';

/**
 * @class TransactionsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.PaginatedListEnabled<Transaction>}
 */
export class TransactionsResource extends CSCoreSDK.Resource
  implements CSCoreSDK.PaginatedListEnabled<Transaction> {

  /**
   * List accounts transactions
   * @param {TransactionsParameters} params
   * @returns {Promise<TransactionList>}
   */
  list = (params: TransactionsParameters): Promise<TransactionList> => {

    // transform date objects to ISO strings
    CSCoreSDK.EntityUtils.transformDatesToISO(['dateStart', 'dateEnd'], params);

    // transform "sort" and "order" parameters to comma separated list from array
    CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);

    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'transactions', params, response => {

      // transform ISO strings to date objects
      CSCoreSDK.EntityUtils.addDatesToItems(['valuationDate', 'bookingDate', 'currRateEURDate'], response);

      return response;
    });
  }
}

/**
 * @interface TransactionsParameters
 * @extends {CSCoreSDK.Paginated}
 * @extends {CSCoreSDK.Sortable}
 */
export interface TransactionsParameters extends CSCoreSDK.Paginated, CSCoreSDK.Sortable {

  /**
   * transactions from 
   */
  dateStart: Date;

  /**
   * transactions to
   */
  dateEnd: Date;
}

/**
 * @interface TransactionList
 * @extends {CSCoreSDK.PaginatedListResponse<Transaction>}
 */
export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction> { }

/**
 * @interface Transaction
 */
export interface Transaction {

  /**
   * transaction reference ID
   */
  id: string;

  /**
   * transaction party info
   */
  accountParty?: AccountNumber;

  /**
   * Amount
   */
  amount?: Amount;

  /**
   * Sender amount
   */
  amountSender?: Amount;

  /**
   * date of booking
   */
  bookingDate?: Date;

  /**
   * number of card used in transaction
   */
  cardNumber?: number;

  /**
   * constant symbol
   */
  constantSymbol?: string;

  /**
   * conversion rates in EUR
   */
  currRateEURValue?: string;

  /**
   * date of conversion
   */
  currRateEURDate?: Date;

  /**
   * user description of the transaction
   */
  description?: string;

  /**
   * note for payee ("zpráva pro příjemce"). Up to 140 chars. For foreign transactions, additional info about currency rate etc.
   */
  payeeNote?: string;

  /**
   * note for payer ("zpráva pro mě"). Up to 140 chars.
   */
  payerNote?: string;

  /**
   * specific symbol
   */
  specificSymbol?: string;

  /**
   * type of transaction
   */
  transactionType: string;

  /**
   * localized type of transaction
   */
  transactionTypeI18N?: string;

  /**
   * date of valuation
   */
  valuationDate?: Date;

  /**
   * variable symbol
   */
  variableSymbol?: string;
}