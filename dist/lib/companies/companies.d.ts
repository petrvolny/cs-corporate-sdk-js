import * as CSCoreSDK from 'cs-core-sdk';
import { CampaignsResource } from './campaigns';
import { RelationshipManagersResource } from './relationship-managers';
/**
 * @class CampaignsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.HasInstanceResource<CompanyResource>}
 * @implements {CSCoreSDK.ListEnabled<Company>}
 */
export declare class CompaniesResource extends CSCoreSDK.Resource implements CSCoreSDK.HasInstanceResource<CompanyResource>, CSCoreSDK.ListEnabled<Company> {
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
export declare class CompanyResource extends CSCoreSDK.InstanceResource implements CSCoreSDK.GetEnabled<Company> {
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
