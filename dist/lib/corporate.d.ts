import * as CSCoreSDK from 'cs-core-sdk';
import { AccountsResource } from './accounts/accounts';
import { CompaniesResource } from './companies/companies';
/**
 * Returns the singleton CorporateClient
 * @returns {CorporateClient}
 */
export declare function getClient(): CorporateClient;
/**
 * Corporate client
 * @class CorporateClient
 * @extends {CSCoreSDK.WebApiClient}
 */
export declare class CorporateClient extends CSCoreSDK.WebApiClient {
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
