import * as CSCoreSDK from 'cs-core-sdk';
import { RelationshipManagerPhotoResource } from './photo/photo';

export class RelationshipManagersResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<any>, CSCoreSDK.HasInstanceResource<RelationshipManagerResource> {

  list = (params?: any): Promise<any> => {

    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, null, params);
  }

  withId = (id: string|number): RelationshipManagerResource => {

    return new RelationshipManagerResource(id, this.getPath(), this.getClient());
  }
}

export class RelationshipManagerResource extends CSCoreSDK.InstanceResource
implements CSCoreSDK.GetEnabled<any> {

  get = (): Promise<any> => {
    
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }

  get photo(): RelationshipManagerPhotoResource {

    return new RelationshipManagerPhotoResource(`${this.getPath()}/photo`, this.getClient());
  }
}