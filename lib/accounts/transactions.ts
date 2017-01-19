import * as CSCoreSDK from 'cs-core-sdk';

export class TransactionsResource extends CSCoreSDK.Resource
implements CSCoreSDK.PaginatedListEnabled<any> {

  list = (params?: any): Promise<any> => {
    
    return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(this, null, 'transactions', params, response => {
      return response;
    });
  }
}