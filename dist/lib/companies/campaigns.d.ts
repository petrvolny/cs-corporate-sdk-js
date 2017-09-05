import * as CSCoreSDK from 'cs-core-sdk';
/**
 * @class CampaignsResource
 * @extends {CSCoreSDK.Resource}
 * @implements {CSCoreSDK.ListEnabled<Campaign>}
 */
export declare class CampaignsResource extends CSCoreSDK.Resource implements CSCoreSDK.ListEnabled<Campaign> {
    /**
     * List marketing campaigns
     * @returns {Promise<CampaignList>}
     */
    list: () => Promise<CampaignList>;
}
/**
 * @interface CampaignList
 * @extends {CSCoreSDK.ListResponse<Campaign>}
 */
export interface CampaignList extends CSCoreSDK.ListResponse<Campaign> {
}
/**
 * @interface Campaign
 */
export interface Campaign {
    /**
     * Id of a campaign
     */
    id: string;
    /**
     * name of campaign
     */
    name?: string;
    /**
     * End date of a campaign
     */
    endDate?: Date;
    /**
     * Channel of a campaign
     */
    channel?: string;
    /**
     * Comment
     */
    comment?: string;
    /**
     * Target number group
     */
    targetListId?: number;
}
