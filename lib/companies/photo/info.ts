import * as CSCoreSDK from 'cs-core-sdk';

export class RelationshipManagerPhotoInfoResource extends CSCoreSDK.Resource
implements CSCoreSDK.GetEnabled<RelationshipManagerPhotoInfo> {

  get = (): Promise<RelationshipManagerPhotoInfo> => {
    
    return CSCoreSDK.ResourceUtils.CallGet(this, null);
  }
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