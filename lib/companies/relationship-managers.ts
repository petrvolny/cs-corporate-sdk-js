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

export interface RelationshipManagerList extends CSCoreSDK.ListEnabled<RelationshipManager> {}

export interface RelationshipManager {

  /**
   * Position identifier.
   */
  id: string;

  /**
   * 	Position name.
   */
  name: string;

  /**
   * Marks a positions as primary for a client.
   */
  primaryFlag?: boolean;

  /**
   * List of branch specialists in this position
   */
  employees: [ListingEmployee];
}

export interface Employee {

  /**
   * API user identifier.
   */
  id: string;

  /**
   * Employee id, used in API-s like PhoneBook
   */
  empId?: number;

  /**
   * Specialist's first name.
   */
  firstName: string;

  /**
   * Specialist's last name.
   */
  lastName: string;
}

export interface ListingEmployee extends Employee {

  /**
   * Marks a specialist as primary for a client.
   */
  primaryFlag?: boolean;
}

export interface EmployeeDetail extends Employee {

  /**
   * Employee personal number
   */
  personalNumber?: number;

  /**
   * Employee login name
   */
  loginName?: string;

  /**
   * Title
   */
  titleA?: string;

  /**
   * Title
   */
  titleB?: string;

  /**
   * Full name composite
   */
  fullName?: string;

  /**
   * Enumeration: MALE/FEMALE
   */
  gender?: string;

  /**
   * Contact details
   */
  contact?: {

    /**
     * Contact details id
     */
    id?: number;

    /**
     * Email of the employee
     */
    email?: string;

    /**
     * Phone 1 number
     */
    phone1?: string;

    /**
     * Phone 2 number
     */
    phone2?: string;

    /**
     * Fax number
     */
    fax?: string;

    /**
     * Mobile number
     */
    mobil?: string;

    /**
     * Office number
     */
    officeNumber?: string;

    /**
     * Code of a segment of the employee
     */
    segment?: string;

    /**
     * Building details
     */
    building?: {

      /**
       * Building identifier
       */
      id?: number;

      /**
       * Street name of a building
       */
      street?: string;

      /**
       * City of a building
       */
      city?: string;

      /**
       * Postcode of a building
       */
      postCode?: string;

      /**
       * Country info
       */
      country?: {

        /**
         * Country code of a building
         */
        code?: string;

        /**
         * Country name of a building
         */
        name?: string;
      }
    };

    /**
     * Department Info
     */
    department?: {

      /**
       * Country name of a building
       */
      id?: number;

      /**
       * Department code
       */
      departmentCode?: string;

      /**
       * Department name
       */
      name?: string;

      /**
       * Company info
       */
      company?: {

        /**
         * Company code
         */
        code?: string;

        /**
         * Company name
         */
        name?: string;

        /**
         * Company code
         */
        displayCode?: string;
      };

      /**
       * Position info
       */
      position?: {

        /**
         * Position identifier
         */
        id?: number;

        /**
         * Position code
         */
        positionCode?: string;

        /**
         * Position description
         */
        description?: string;
      };
    };
  };
};