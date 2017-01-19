import * as CSCoreSDK from 'cs-core-sdk';
import { CampaignsResource } from './campaigns';
import { RelationshipManagersResource } from './relationship-managers';

export class CompaniesResource extends CSCoreSDK.Resource
implements CSCoreSDK.HasInstanceResource<CompanyResource>, CSCoreSDK.ListEnabled<any> {

  list = (): Promise<any> => {

    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null);
  }
  
  withId = (id: string|number): CompanyResource => {
    
    return new CompanyResource(id, this.getPath(), this.getClient());
  }
}

export class CompanyResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<any> {

  get = (): Promise<any> => {

    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }

  get campaigns(): CampaignsResource {

    return new CampaignsResource(`${this.getPath()}/campaigns`, this.getClient());
  }

  get relationshipManagers(): RelationshipManagersResource {

    return new RelationshipManagersResource(`${this.getPath()}/relationshipmanagers`, this.getClient());
  }
}