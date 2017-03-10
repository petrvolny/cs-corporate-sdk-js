/// <reference types="es6-promise" />
declare module 'cs-corporate-sdk/common' {
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

}
declare module 'cs-corporate-sdk/accounts/balance' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { Amount } from 'cs-corporate-sdk/common';
	/**
	 * @class BalanceResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<AccountBalance>}
	 */
	export class BalanceResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<AccountBalance> {
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

}
declare module 'cs-corporate-sdk/accounts/transactions' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { AccountNumber, Amount } from 'cs-corporate-sdk/common';
	/**
	 * @class TransactionsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Transaction>}
	 */
	export class TransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Transaction> {
	    /**
	     * List accounts transactions
	     * @param {TransactionsParameters} params
	     * @returns {Promise<TransactionList>}
	     */
	    list: (params: TransactionsParameters) => Promise<TransactionList>;
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
	export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction> {
	}
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

}
declare module 'cs-corporate-sdk/accounts/accounts' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { AccountNumber } from 'cs-corporate-sdk/common';
	import { BalanceResource } from 'cs-corporate-sdk/accounts/balance';
	import { TransactionsResource } from 'cs-corporate-sdk/accounts/transactions';
	/**
	 * @class AccountsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.PaginatedListEnabled<Account>}
	 */
	export class AccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Account> {
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
	export class AccountResource extends CSCoreSDK.InstanceResource {
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
	 * @interface AccountsParameters
	 * @extends {CSCoreSDK.Sortable}
	 * @extends {CSCoreSDK.Paginated}
	 */
	export interface AccountsParameters extends CSCoreSDK.Sortable, CSCoreSDK.Paginated {
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

}
declare module 'cs-corporate-sdk/companies/campaigns' {
	import * as CSCoreSDK from 'cs-core-sdk';
	/**
	 * @class CampaignsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<Campaign>}
	 */
	export class CampaignsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Campaign> {
	    /**
	     * List marketing campaigns
	     * @returns {Promise<CampaignList>}
	     */
	    list: () => Promise<CampaignList>;
	}
	/**
	 * @interface CampaignList
	 * @extends {CSCoreSDK.ListResponse<Campaign>}
	 */
	export interface CampaignList extends CSCoreSDK.ListResponse<Campaign> {
	}
	/**
	 * @interface Campaign
	 */
	export interface Campaign {
	    /**
	     * Id of a campaign
	     */
	    id: string;
	    /**
	     * name of campaign
	     */
	    name?: string;
	    /**
	     * End date of a campaign
	     */
	    endDate?: Date;
	    /**
	     * Channel of a campaign
	     */
	    channel?: string;
	    /**
	     * Comment
	     */
	    comment?: string;
	    /**
	     * Target number group
	     */
	    targetListId?: number;
	}

}
declare module 'cs-corporate-sdk/companies/photo/info' {
	import * as CSCoreSDK from 'cs-core-sdk';
	/**
	 * @class RelationshipManagerPhotoInfoResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.GetEnabled<RelationshipManagerPhotoInfo>}
	 */
	export class RelationshipManagerPhotoInfoResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<RelationshipManagerPhotoInfo> {
	    /**
	     * Get information about the relationship manager photo
	     * @returns {Promise<RelationshipManagerPhotoInfo>}
	     */
	    get: () => Promise<RelationshipManagerPhotoInfo>;
	}
	/**
	 * @interface RelationshipManagerPhotoInfo
	 */
	export interface RelationshipManagerPhotoInfo {
	    /**
	     * employee identifier
	     */
	    empId?: number;
	    /**
	     * agreement time
	     */
	    agreementDate?: Date;
	    /**
	     * mime type of photos
	     */
	    mimeType?: string;
	    /**
	     * Returns true if photo was approved
	     */
	    agreement?: boolean;
	    /**
	     * list of available photos
	     */
	    types?: [string];
	}

}
declare module 'cs-corporate-sdk/companies/photo/photo' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { RelationshipManagerPhotoInfoResource } from 'cs-corporate-sdk/companies/photo/info';
	/**
	 * @class RelationshipManagerPhotoResource
	 * @implements {CSCoreSDK.Resource}
	 */
	export class RelationshipManagerPhotoResource extends CSCoreSDK.Resource implements CSCoreSDK.ParametrizedDownloadEnabled<RelationshipManagerPhotoDownloadParameters, Uint8Array> {
	    /**
	     * Download relations managers photo.
	     * @param {RelationshipManagerPhotoDownloadParameters} params
	     * @returns {Promise<Uint8Array>}
	     */
	    download: (params: RelationshipManagerPhotoDownloadParameters) => Promise<Uint8Array>;
	    /**
	     * Returns RelationshipManagerPhotoInfoResource for getting infomation about the photo
	     * @returns {RelationshipManagerPhotoInfoResource}
	     */
	    readonly info: RelationshipManagerPhotoInfoResource;
	}
	/**
	 * @interface RelationshipManagerPhotoDownloadParameters
	 */
	export interface RelationshipManagerPhotoDownloadParameters {
	    /**
	     * type of photo (BW, THUMBNAIL, MINI, STANDARD, LARGE)
	     */
	    type: string;
	}

}
declare module 'cs-corporate-sdk/companies/relationship-managers' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { RelationshipManagerPhotoResource } from 'cs-corporate-sdk/companies/photo/photo';
	/**
	 * @class RelationshipManagersResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.ListEnabled<RelationshipManager>}
	 * @implements {CSCoreSDK.HasInstanceResource<RelationshipManagerResource>}
	 */
	export class RelationshipManagersResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<RelationshipManager>, CSCoreSDK.HasInstanceResource<RelationshipManagerResource> {
	    /**
	     * List all relationship managers grouped by their positions. You will get an array of positions whilst each position may include one or more relationship managers. Typically there should be just one position flagged as primary as well as one contact in each position.
	     * You can filter for all positions (ALL) or for primary only (PRIMARY).
	     * @param {RelationshipManagerListParameters=} params
	     * @returns {Promise<RelationshipManagerList>}
	     */
	    list: (params?: RelationshipManagerListParameters) => Promise<RelationshipManagerList>;
	    /**
	     * Returns RelationshipManagerResource for a given employee id
	     * @param {string|number} emplId
	     * @returns {RelationshipManagerResource}
	     */
	    withId: (emplId: string | number) => RelationshipManagerResource;
	}
	/**
	 * @class RelationshipManagerResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<EmployeeDetail>}
	 */
	export class RelationshipManagerResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<EmployeeDetail> {
	    /**
	     * Get a reletionshipt manager detail
	     * @returns {Promise<EmployeeDetail>}
	     */
	    get: () => Promise<EmployeeDetail>;
	    /**
	     * Returns RelationshipManagerPhotoResource for getting relationship managers photo
	     * @returns {RelationshipManagerPhotoResource}
	     */
	    readonly photo: RelationshipManagerPhotoResource;
	}
	/**
	 * @interface RelationshipManagerListParameters
	 */
	export interface RelationshipManagerListParameters {
	    /**
	     * Filter for all positions (ALL) or for primary only (PRIMARY).
	     */
	    filter?: string;
	}
	/**
	 * @interface RelationshipManagerList
	 * @extends {CSCoreSDK.ListResponse<RelationshipManager>}
	 */
	export interface RelationshipManagerList extends CSCoreSDK.ListResponse<RelationshipManager> {
	}
	/**
	 * @interface RelationshipManager
	 */
	export interface RelationshipManager {
	    /**
	     * Position identifier.
	     */
	    id: string;
	    /**
	     * 	Position name.
	     */
	    name: string;
	    /**
	     * Marks a positions as primary for a client.
	     */
	    primaryFlag?: boolean;
	    /**
	     * List of branch specialists in this position
	     */
	    employees: [ListingEmployee];
	}
	/**
	 * @interface Employee
	 */
	export interface Employee {
	    /**
	     * Employee id, used in API-s like PhoneBook
	     */
	    empId?: number;
	    /**
	     * Specialist's first name.
	     */
	    firstName: string;
	    /**
	     * Specialist's last name.
	     */
	    lastName: string;
	    /**
	    * Convenience getter for getting relationship managers's photo resource
	    */
	    photo: RelationshipManagerPhotoResource;
	    /**
	     * Convenience method for getting detail of the relationship manager from the list
	     * @returns {Promise<Employee>|Promise<RelationshipManager>}
	     */
	    get: () => Promise<Employee | RelationshipManager>;
	}
	/**
	 * @interface ListingEmployee
	 * @extends {Employee}
	 */
	export interface ListingEmployee extends Employee {
	    /**
	     * Marks a specialist as primary for a client.
	     */
	    primaryFlag?: boolean;
	}
	/**
	 * @interface EmployeeDetail
	 * @extends {Employee}
	 */
	export interface EmployeeDetail extends Employee {
	    /**
	     * Employee personal number
	     */
	    personalNumber?: number;
	    /**
	     * Title
	     */
	    titleA?: string;
	    /**
	     * Title
	     */
	    titleB?: string;
	    /**
	     * First name
	     */
	    name?: string;
	    /**
	     * Surname
	     */
	    surname?: string;
	    /**
	     * Full name composite
	     */
	    fullName?: string;
	    /**
	     * Enumeration: MALE/FEMALE
	     */
	    gender?: string;
	    /**
	     * Identifier of employee manager
	     */
	    employeeManagerId?: number;
	    /**
	     * Identifier of employee team
	     */
	    teamId?: string;
	    /**
	     * Contact details
	     */
	    contact?: {
	        /**
	         * Employee login name
	         */
	        loginName?: string;
	        /**
	         * Email of the employee
	         */
	        email?: string;
	        /**
	         * Phone 1 number
	         */
	        phone1?: string;
	        /**
	         * Phone 2 number
	         */
	        phone2?: string;
	        /**
	         * Fax number
	         */
	        fax?: string;
	        /**
	         * Mobile number
	         */
	        mobil?: string;
	        /**
	         * Office number
	         */
	        officeNumber?: string;
	        /**
	         * Contact cost unit
	         */
	        costUnit?: number;
	        /**
	         * Contact location unit
	         */
	        locationUnit?: string;
	        /**
	         * Building details
	         */
	        building?: {
	            /**
	             * Building identifier
	             */
	            id?: number;
	            /**
	             * Company code
	             */
	            companyCode?: string;
	            /**
	             * Street name of a building
	             */
	            street?: string;
	            /**
	             * City of a building
	             */
	            city?: string;
	            /**
	             * Postcode of a building
	             */
	            postCode?: string;
	            /**
	             * Country info
	             */
	            country?: {
	                /**
	                 * Country code of a building
	                 */
	                country?: string;
	                /**
	                 * Localized country name
	                 */
	                nameI18N?: string;
	            };
	        };
	    };
	    /**
	     * Department Info
	     */
	    department?: {
	        /**
	         * Country name of a building
	         */
	        id?: number;
	        /**
	         * Department code
	         */
	        departmentCode?: string;
	        /**
	         * Department name
	         */
	        nameI18N?: string;
	        /**
	         * Department head id
	         */
	        headId?: number;
	        /**
	         * Department parent id
	         */
	        parentId?: number;
	        /**
	         * Company info
	         */
	        company?: {
	            /**
	             * Company code
	             */
	            companyCode?: string;
	            /**
	             * Company name
	             */
	            nameI18N?: string;
	            /**
	             * Company name in English
	             */
	            nameI18N_EN?: string;
	            /**
	             * Department prefix
	             */
	            departmentPrefix?: number;
	            /**
	             * Company code
	             */
	            displayCode?: string;
	            /**
	             * Manually updated flag
	             */
	            manuallyUpdated?: boolean;
	            /**
	             * Department exists flag
	             */
	            departmentExists?: boolean;
	        };
	    };
	    /**
	     * Position info
	     */
	    position?: {
	        /**
	         * Position identifier
	         */
	        id?: number;
	        /**
	         * Position code
	         */
	        positionCode?: string;
	        /**
	         * Position description
	         */
	        descriptionI18N?: string;
	        /**
	         * Company code
	         */
	        companyCode?: string;
	    };
	    /**
	    * Convenience getter for getting relationship manager's photo resource
	    */
	    photo: RelationshipManagerPhotoResource;
	    /**
	     * Convenience method for getting detail of the relationship manager right from the list
	     * @returns {Promise<RelationshipManager>}
	     */
	    get: () => Promise<RelationshipManager>;
	}

}
declare module 'cs-corporate-sdk/companies/companies' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { CampaignsResource } from 'cs-corporate-sdk/companies/campaigns';
	import { RelationshipManagersResource } from 'cs-corporate-sdk/companies/relationship-managers';
	/**
	 * @class CampaignsResource
	 * @extends {CSCoreSDK.Resource}
	 * @implements {CSCoreSDK.HasInstanceResource<CompanyResource>}
	 * @implements {CSCoreSDK.ListEnabled<Company>}
	 */
	export class CompaniesResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CompanyResource>, CSCoreSDK.ListEnabled<Company> {
	    /**
	     * List of companies associated with client including the type of relationship from the current client to the subject.
	     * @returns {Promise<CompanyList>}
	     */
	    list: () => Promise<CompanyList>;
	    /**
	     * Get a Company resource for company with a given ico representing registration number
	     * @param {string|number} ico
	     * @returns {CompanyResource}
	     */
	    withId: (ico: string | number) => CompanyResource;
	}
	/**
	 * @class CompanyResource
	 * @extends {CSCoreSDK.InstanceResource}
	 * @implements {CSCoreSDK.GetEnabled<Company>}
	 */
	export class CompanyResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Company> {
	    /**
	     * Get company detail
	     * @returns {Promise<Company>}
	     */
	    get: () => Promise<Company>;
	    /**
	     * Returns CampaignsResource for listing company's campaigns
	     * @returns {CampaignsResource}
	     */
	    readonly campaigns: CampaignsResource;
	    /**
	     * Returns RelationshipManagersResource for listing company's relationship managers and info about them including photo
	     * @returns {RelationshipManagersResource}
	     */
	    readonly relationshipManagers: RelationshipManagersResource;
	}
	/**
	 * @interface CompanyList
	 * @extends {CSCoreSDK.ListResponse<Company>}
	 */
	export interface CompanyList extends CSCoreSDK.ListResponse<Company> {
	}
	/**
	 * @interface Company
	 */
	export interface Company {
	    /**
	     * registration number (ICO)
	     */
	    regNum: number;
	    /**
	     * taxation number (DIC)
	     */
	    taxNum?: number;
	    /**
	     * Legal form of the company (codebook)
	     */
	    legalForm?: string;
	    /**
	     * Localized name of the legal form of the company
	     */
	    legalFormI18N?: string;
	    /**
	     * Name of the company
	     */
	    name: string;
	    /**
	     * Profile data (like industry sector)
	     */
	    companyProfile?: {
	        /**
	         * Company type according to CNB (codebook)
	         */
	        cnbType?: string;
	        /**
	         * Localized name of the company type according to CNB
	         */
	        cnbTypeI18N?: string;
	        /**
	         * NACE industry code (codebook)
	         */
	        industryCategory?: string;
	        /**
	         * Localized name of the NACE industry code
	         */
	        industryCategoryI18N?: string;
	        /**
	         * Sector according to CSU (codebook)
	         */
	        sector?: string;
	        /**
	         * Localized name of sector according to CSU
	         */
	        sectorI18N?: string;
	    };
	    /**
	     * Type of relationship
	     */
	    relationshipType?: {
	        /**
	         * 	Code of type of the relationship (codebook)
	         */
	        relationshipType?: string;
	        /**
	         * Name of the relationship type (like '100% Vlastník')
	         */
	        relationshipTypeI18N?: string;
	    };
	    /**
	     * Convenience getter for getting companies's campaigns resource
	     */
	    campaigns: CampaignsResource;
	    /**
	     * Convenience getter for getting companies's relationship managers resource
	     */
	    relationshipManagers: RelationshipManagersResource;
	    /**
	     * Convenience method for getting detail of the company right from the list
	     * @returns {Promise<Company>}
	     */
	    get: () => Promise<Company>;
	}

}
declare module 'cs-corporate-sdk/corporate' {
	import * as CSCoreSDK from 'cs-core-sdk';
	import { AccountsResource } from 'cs-corporate-sdk/accounts/accounts';
	import { CompaniesResource } from 'cs-corporate-sdk/companies/companies';
	/**
	 * Returns the singleton CorporateClient
	 * @returns {CorporateClient}
	 */
	export function getClient(): CorporateClient;
	/**
	 * Corporate client
	 * @class CorporateClient
	 * @extends {CSCoreSDK.WebApiClient}
	 */
	export class CorporateClient extends CSCoreSDK.WebApiClient {
	    /**
	     * Creates new instance of CorporateClient
	     * @param {CSCoreSDK.WebApiConfiguration} config WebApiConfiguration object that configures this client
	     * @param {CSCoreSDK.WebApiContext} context WebApiContext object that allows for data sharing between clients
	     */
	    constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext);
	    /**
	     * Get information about company accounts including balance and transactions
	     * @returns {AccountsResource}
	     */
	    readonly accounts: AccountsResource;
	    /**
	     * Get information about companies including theit campaings and relationship managers
	     * @returns {CompaniesResource}
	     */
	    readonly companies: CompaniesResource;
	}

}
declare module 'cs-corporate-sdk'{ export * from 'cs-corporate-sdk/corporate'}