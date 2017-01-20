import * as CSCoreSDK from 'cs-core-sdk';
import { CampaignsResource } from './campaigns';
import { RelationshipManagersResource } from './relationship-managers';

export class CompaniesResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CompanyResource>, CSCoreSDK.ListEnabled<Company> {

  list = (): Promise<CompanyList> => {

    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null);
  }
  
  withId = (id: string|number): CompanyResource => {
    
    return new CompanyResource(id, this.getPath(), this.getClient());
  }
}

export class CompanyResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<Company> {

  get = (): Promise<Company> => {

    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }

  get campaigns(): CampaignsResource {

    return new CampaignsResource(`${this.getPath()}/campaigns`, this.getClient());
  }

  get relationshipManagers(): RelationshipManagersResource {

    return new RelationshipManagersResource(`${this.getPath()}/relationshipmanagers`, this.getClient());
  }
}

export interface CompanyList extends CSCoreSDK.ListResponse<Company> {}

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
  }

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
  }
}