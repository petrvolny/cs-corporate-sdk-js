import * as CSCoreSDK from 'cs-core-sdk';

export class CampaignsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<any> {

  list = (): Promise<any> => {

    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null);
  }
}