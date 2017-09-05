import * as CSCoreSDK from 'cs-core-sdk';
import { RelationshipManagerPhotoInfoResource } from './info';
/**
 * @class RelationshipManagerPhotoResource
 * @implements {CSCoreSDK.Resource}
 */
export declare class RelationshipManagerPhotoResource extends CSCoreSDK.Resource implements CSCoreSDK.ParametrizedDownloadEnabled<RelationshipManagerPhotoDownloadParameters, Uint8Array> {
    /**
     * Download relations managers photo.
     * @param {RelationshipManagerPhotoDownloadParameters} params
     * @returns {Promise<Uint8Array>}
     */
    download: (params: RelationshipManagerPhotoDownloadParameters) => Promise<Uint8Array>;
    /**
     * Returns RelationshipManagerPhotoInfoResource for getting infomation about the photo
     * @returns {RelationshipManagerPhotoInfoResource}
     */
    readonly info: RelationshipManagerPhotoInfoResource;
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
