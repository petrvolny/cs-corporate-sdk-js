import * as CSCoreSDK from 'cs-core-sdk';
import { RelationshipManagerPhotoInfoResource } from './info';

/**
 * @class RelationshipManagerPhotoResource
 * @implements {CSCoreSDK.Resource}
 */
export class RelationshipManagerPhotoResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ParametrizedDownloadEnabled<RelationshipManagerPhotoDownloadParameters, Uint8Array> {

  /**
   * Download relations managers photo. 
   * @param {RelationshipManagerPhotoDownloadParameters} params
   * @returns {Promise<Uint8Array>}
   */
  download = (params: RelationshipManagerPhotoDownloadParameters): Promise<Uint8Array> => {

    return CSCoreSDK.ResourceUtils.CallDownload(this, null, 'GET', params);
  }

  /**
   * Returns RelationshipManagerPhotoInfoResource for getting infomation about the photo
   * @returns {RelationshipManagerPhotoInfoResource}
   */
  get info(): RelationshipManagerPhotoInfoResource {

    return new RelationshipManagerPhotoInfoResource(`${this.getPath()}/info`, this.getClient());
  }
}

/**
 * @interface RelationshipManagerPhotoDownloadParameters
 */
export interface RelationshipManagerPhotoDownloadParameters {

  /**
   * type of photo (BW, THUMBNAIL, MINI, STANDARD, LARGE)
   */
  type: string;
}