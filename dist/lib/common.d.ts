/**
 * @interface AccountNumber
 */
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
    /**
     * Info
     */
    accountPartyInfo?: string;
    /**
     * Description
     */
    accountPartyDescription?: string;
}
/**
 * @interface Amount
 */
export interface Amount {
    /**
     * Current ledger balance
     */
    value: number;
    /**
     * Value precision, currently always 2 (constant)
     */
    precision: number;
    /**
     * Currency of the bank account
     */
    currency: string;
}
