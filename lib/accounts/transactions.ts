import * as CSCoreSDK from 'cs-core-sdk';
import { AccountNumber, Amount } from '../common';

export class TransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<Transaction> {

  /**
   * List accounts transactions
   */
  list = (params?: TransactionsParameters): Promise<TransactionList> => {
    
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'transactions', params, response => {
      return response;
    });
  }
}

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

export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction> {}

export interface Transaction {

  /**
   * transaction reference ID
   */
  id: string;

  /**
   * transaction party info
   */
  accountParty?: AccountParty;

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
  validationDate?: Date;

  /**
   * variable symbol
   */
  variableSymbol?: string;
}

export interface AccountParty extends AccountNumber {

  /**
   * name of transaction party. For ATM transaction, masked card number used in transaction
   */
  partyInfo?: string;

  /**
   * whole account number including bank of transaction party. For ATM transaction, address of ATM if known. For card transaction, identification (name) of the merchant.
   */
  partyDescription?: string;
}