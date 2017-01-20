import * as CSCoreSDK from 'cs-core-sdk';

export class CampaignsResource extends CSCoreSDK.Resource
implements CSCoreSDK.ListEnabled<Campaign> {

  list = (): Promise<CampaignList> => {

    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null);
  }
}

export interface CampaignList extends CSCoreSDK.ListResponse<Campaign> {}

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
   * Localized channel of a campaign 
   */
  channelI18N?: string;

  /**
   * Comment 
   */
  comment?: string;

  /**
   * Target number group
   */
  targetListId?: number;
}