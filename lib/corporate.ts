/// <reference types="es6-promise" />

import * as CSCoreSDK from 'cs-core-sdk';
import { AccountsResource } from './accounts/accounts';
import { CompaniesResource } from './companies/companies';

var sharedClient: CorporateClient = null;

/**
 * Returns the singleton CorporateClient
 * @returns {CorporateClient}
 */
export function getClient(): CorporateClient {
  if (sharedClient === null) {
    return new CorporateClient(CSCoreSDK.config.copy(), CSCoreSDK.sharedContext);
  }

  return sharedClient;
}

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
  constructor(config: CSCoreSDK.WebApiConfiguration, context: CSCoreSDK.WebApiContext) {
    super(config, '/api/v1/corporate/our');
    this.sharedContext = context;
  }

  /**
   * Get information about company accounts including balance and transactions
   * @returns {AccountsResource}
   */
  get accounts(): AccountsResource {
    return new AccountsResource(`${this.getPath()}/accounts`, this);
  }

  /**
   * Get information about companies including theit campaings and relationship managers
   * @returns {CompaniesResource}
   */
  get companies(): CompaniesResource {
    return new CompaniesResource(`${this.getPath()}/companies`, this);
  }
}