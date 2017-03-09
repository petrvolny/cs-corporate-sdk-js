/// <reference types="es6-promise" />
declare module CSCorporateSDK {
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
declare module CSCorporateSDK {
	
	
	export class BalanceResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<AccountBalance> {
	    /**
	     * Get balance of the account
	     */
	    get: () => Promise<AccountBalance>;
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

}
declare module CSCorporateSDK {
	
	
	export class TransactionsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Transaction> {
	    /**
	     * List accounts transactions
	     */
	    list: (params: TransactionsParameters) => Promise<TransactionList>;
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
	export interface TransactionList extends CSCoreSDK.PaginatedListResponse<Transaction> {
	}
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
declare module CSCorporateSDK {
	
	
	
	
	export class AccountsResource extends CSCoreSDK.Resource implements CSCoreSDK.PaginatedListEnabled<Account> {
	    /**
	     * List bank accounts incl. basic account information the current user can see accordign to disposition model.
	     */
	    list: (params?: AccountsParameters) => Promise<AccountList>;
	    /**
	     * Returns Account resource with a given ID
	     */
	    withId: (accountId: string | number) => AccountResource;
	}
	export class AccountResource extends CSCoreSDK.InstanceResource {
	    /**
	     * Returns resource for getting accounts balance
	     */
	    readonly balance: BalanceResource;
	    /**
	     * Returns resource for getting accounts transactions
	     */
	    readonly transactions: TransactionsResource;
	}
	export interface AccountsParameters extends CSCoreSDK.Sortable, CSCoreSDK.Paginated {
	}
	export interface AccountList extends CSCoreSDK.PaginatedListResponse<Account> {
	}
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
	    };
	}

}
declare module CSCorporateSDK {
	
	export class CampaignsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Campaign> {
	    /**
	     * List marketing campaigns
	     */
	    list: () => Promise<CampaignList>;
	}
	export interface CampaignList extends CSCoreSDK.ListResponse<Campaign> {
	}
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
declare module CSCorporateSDK {
	
	export class RelationshipManagerPhotoInfoResource extends CSCoreSDK.Resource implements CSCoreSDK.GetEnabled<RelationshipManagerPhotoInfo> {
	    /**
	     * Get information about the relationship manager photo
	     */
	    get: () => Promise<RelationshipManagerPhotoInfo>;
	}
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
declare module CSCorporateSDK {
	
	
	export class RelationshipManagerPhotoResource extends CSCoreSDK.Resource {
	    /**
	     * Download relations managers photo.
	     */
	    download: (params: RelationshipManagerPhotoDownloadParameters) => Promise<any>;
	    /**
	     * Returns RelationshipManagerPhotoInfoResource for getting infomation about the photo
	     */
	    readonly info: RelationshipManagerPhotoInfoResource;
	}
	export interface RelationshipManagerPhotoDownloadParameters {
	    /**
	     * type of photo (BW, THUMBNAIL, MINI, STANDARD, LARGE)
	     */
	    type: string;
	}

}
declare module CSCorporateSDK {
	
	
	export class RelationshipManagersResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<RelationshipManager>, CSCoreSDK.HasInstanceResource<RelationshipManagerResource> {
	    /**
	     * List all relationship managers grouped by their positions. You will get an array of positions whilst each position may include one or more relationship managers. Typically there should be just one position flagged as primary as well as one contact in each position.
	     * You can filter for all positions (ALL) or for primary only (PRIMARY).
	     */
	    list: (params?: RelationshipManagerListParameters) => Promise<RelationshipManagerList>;
	    /**
	     * Returns RelationshipManagerResource for a given employee id
	     */
	    withId: (emplId: string | number) => RelationshipManagerResource;
	}
	export class RelationshipManagerResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<EmployeeDetail> {
	    /**
	     * Get a reletionshipt manager detail
	     */
	    get: () => Promise<EmployeeDetail>;
	    /**
	     * Returns RelationshipManagerPhotoResource for getting relationship managers photo
	     */
	    readonly photo: RelationshipManagerPhotoResource;
	}
	export interface RelationshipManagerListParameters {
	    /**
	     * Filter for all positions (ALL) or for primary only (PRIMARY).
	     */
	    filter?: string;
	}
	export interface RelationshipManagerList extends CSCoreSDK.ListResponse<RelationshipManager> {
	}
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
	     */
	    get: () => Promise<Employee | RelationshipManager>;
	}
	export interface ListingEmployee extends Employee {
	    /**
	     * Marks a specialist as primary for a client.
	     */
	    primaryFlag?: boolean;
	}
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
	     */
	    get: () => Promise<RelationshipManager>;
	}

}
declare module CSCorporateSDK {
	
	
	
	export class CompaniesResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CompanyResource>, CSCoreSDK.ListEnabled<Company> {
	    /**
	     * List of companies associated with client including the type of relationship from the current client to the subject.
	     */
	    list: () => Promise<CompanyList>;
	    /**
	     * Get a Company resource for company with a given ico representing registration number
	     */
	    withId: (ico: string | number) => CompanyResource;
	}
	export class CompanyResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Company> {
	    /**
	     * Get company detail
	     */
	    get: () => Promise<Company>;
	    /**
	     * Returns CampaignsResource for listing company's campaigns
	     */
	    readonly campaigns: CampaignsResource;
	    /**
	     * Returns RelationshipManagersResource for listing company's relationship managers and info about them including photo
	     */
	    readonly relationshipManagers: RelationshipManagersResource;
	}
	export interface CompanyList extends CSCoreSDK.ListResponse<Company> {
	}
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
	     */
	    get: () => Promise<Company>;
	}

}
declare module CSCorporateSDK {
	
	
	
	export function getClient(): CorporateClient;
	/**
	 * Corporate client
	 */
	export class CorporateClient extends CSCoreSDK.WebApiClient {
	    /**
	     * Creates new instance of CorporateClient
	     *
	     * @param config WebApiConfiguration object that configures this client
	     * @param context WebApiContext object that allows for data sharing between clients
	     */
	    constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext);
	    /**
	     * Get information about company accounts including balance and transactions
	     */
	    readonly accounts: AccountsResource;
	    /**
	     * Get information about companies including theit campaings and relationship managers
	     */
	    readonly companies: CompaniesResource;
	}

}