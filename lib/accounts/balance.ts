import * as CSCoreSDK from 'cs-core-sdk';

export class BalanceResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<any> {

  get = (): Promise<any> => {

    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }
}