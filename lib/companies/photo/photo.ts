import * as CSCoreSDK from 'cs-core-sdk';
import { RelationshipManagerPhotoInfoResource } from './info';

export class RelationshipManagerPhotoResource extends CSCoreSDK.Resource {

  /**
   * Download relations managers photo. 
   */
  download = (params: RelationshipManagerPhotoDownloadParameters): Promise<any> => {

    return CSCoreSDK.ResourceUtils.CallDownload(this, null, 'GET', params);
  }

  /**
   * Returns RelationshipManagerPhotoInfoResource for getting infomation about the photo
   */
  get info(): RelationshipManagerPhotoInfoResource {
    
    return new RelationshipManagerPhotoInfoResource(`${this.getPath()}/info`, this.getClient());
  }
}

export interface RelationshipManagerPhotoDownloadParameters {

  /**
   * type of photo (BW, THUMBNAIL, MINI, STANDARD, LARGE)
   */
  type: string;
}