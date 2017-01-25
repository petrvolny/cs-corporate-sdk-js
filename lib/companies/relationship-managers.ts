import * as CSCoreSDK from 'cs-core-sdk';
import { RelationshipManagerPhotoResource } from './photo/photo';

export class RelationshipManagersResource extends CSCoreSDK.Resource
  implements CSCoreSDK.ListEnabled<RelationshipManager>, CSCoreSDK.HasInstanceResource<RelationshipManagerResource> {

  /**
   * List all relationship managers grouped by their positions. You will get an array of positions whilst each position may include one or more relationship managers. Typically there should be just one position flagged as primary as well as one contact in each position. 
   * You can filter for all positions (ALL) or for primary only (PRIMARY).
   */
  list = (params?: RelationshipManagerListParameters): Promise<RelationshipManagerList> => {

    return CSCoreSDK.ResourceUtils.CallListWithSuffix(this, null, null, params).then(response => {

      // Add convenience methods to listing items
      response.items.forEach(item => {
        if (Array.isArray((<RelationshipManager>item).employees)) {

          (<RelationshipManager>item).employees.forEach(employee => {
            resourcifyListing(<ListingEmployee>employee, this.withId((<ListingEmployee>employee).empId), true);
          });
        }
      });

      return response;
    });
  }

  /**
   * Returns RelationshipManagerResource for a given employee id
   */
  withId = (emplId: string | number): RelationshipManagerResource => {

    return new RelationshipManagerResource(emplId, this.getPath(), this.getClient());
  }
}

export class RelationshipManagerResource extends CSCoreSDK.InstanceResource
  implements CSCoreSDK.GetEnabled<EmployeeDetail> {

  /**
   * Get a reletionshipt manager detail
   */
  get = (): Promise<EmployeeDetail> => {

    return CSCoreSDK.ResourceUtils.CallGet(this, null).then(response => {

      // Add convenience methods to response
      resourcifyListing(<EmployeeDetail>response, this, false);

      return response;
    });
  }

  /**
   * Returns RelationshipManagerPhotoResource for getting relationship managers photo
   */
  get photo(): RelationshipManagerPhotoResource {

    return new RelationshipManagerPhotoResource(`${this.getPath()}/photo`, this.getClient());
  }
}

const resourcifyListing = (employee: ListingEmployee | EmployeeDetail, employeeReference: RelationshipManagerResource, isFromListing) => {
  if (isFromListing) {
    (<any>employee).get = employeeReference.get;
  }
  employee.photo = employeeReference.photo;
}

export interface RelationshipManagerListParameters {

  /**
   * Filter for all positions (ALL) or for primary only (PRIMARY).
   */
  filter?: string;
}

export interface RelationshipManagerList extends CSCoreSDK.ListResponse<RelationshipManager> { }

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

  /**
  * Convenience getter for getting relationship managers's photo resource
  */
  photo: RelationshipManagerPhotoResource;

  /**
   * Convenience method for getting detail of the relationship manager from the list 
   */
  get: () => Promise<Employee | RelationshipManager>;
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
   * Title
   */
  titleA?: string;

  /**
   * Title
   */
  titleB?: string;

  /**
   * First name
   */
  name?: string;

  /**
   * Surname
   */
  surname?: string;

  /**
   * Full name composite
   */
  fullName?: string;

  /**
   * Enumeration: MALE/FEMALE
   */
  gender?: string;

  /**
   * Identifier of employee manager
   */
  employeeManagerId?: number;

  /**
   * Identifier of employee team
   */
  teamId?: string;

  /**
   * Contact details
   */
  contact?: {

    /**
     * Contact details id
     */
    id?: number;

    /**
     * Employee login name
     */
    loginName?: string;

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
     * Contact cost unit
     */
    costUnit?: number;

    /**
     * Contact location unit
     */
    locationUnit?: string;

    /**
     * Building details
     */
    building?: {

      /**
       * Building identifier
       */
      id?: number;

      /**
       * Company code
       */
      companyCode?: string;

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
        country?: string;

        /**
         * Localized country name
         */
        nameI18N?: string;
      };
    };
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
    nameI18N?: string;

    /**
     * Department head id
     */
    headId?: number;

    /**
     * Department parent id
     */
    parentId?: number;

    /**
     * Company info
     */
    company?: {

      /**
       * Company code
       */
      companyCode?: string;

      /**
       * Company name
       */
      nameI18N?: string;

      /**
       * Company name in English
       */
      nameI18N_EN?: string;

      /**
       * Department prefix
       */
      departmentPrefix?: number;

      /**
       * Company code
       */
      displayCode?: string;

      /**
       * Manually updated flag
       */
      manuallyUpdated?: boolean;

      /**
       * Department exists flag
       */
      departmentExists?: boolean;
    };

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
    descriptionI18N?: string;

    /**
     * Company code
     */
    companyCode?: string;
  };

  /**
  * Convenience getter for getting relationship manager's photo resource
  */
  photo: RelationshipManagerPhotoResource;

  /**
   * Convenience method for getting detail of the relationship manager right from the list 
   */
  get: () => Promise<RelationshipManager>;
};