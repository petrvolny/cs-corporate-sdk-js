export interface AccountNumber {

  /**
   * IBAN
   */
  iban?: string;

  /**
   * Prefix of the bank account number
   */
  accountPrefix?: string;

  /**
   * Number of the bank account
   */
  accountNumber?: string;

  /**
   * Bank code of the account
   */
  bankCode?: string;

  /**
   * id of bank/branch, constant for domestic accounts in csas
   */
  bic?: string;
}