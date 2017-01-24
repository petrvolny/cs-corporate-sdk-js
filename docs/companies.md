# Companies

This guide walks you through accessing information about companies such as campaigns and relationship managers.

[CompaniesResource](../lib/companies/companies.ts#L5)

```javascript

  // Get CompaniesResource
    CSCorporateSDK
      .getClient()
      .companies

```

## 1. List all companies

You can list all companies by calling the `list` method on [CompaniesResource](../lib/companies/companies.ts#L5). For full response see [CompanyList](../lib/companies/companies.ts#L75) interface.

```javascript

  CSCorporateSDK
    .getClient()
    .companies
    .list(parameters: CompaniesResource)
    .then(...)
    .catch(...)

```

## 2. Get company detail 

Get company detail by getting the [CompanyResource](../lib/companies/companies.ts#L33) and then calling the `get` method on it. For full response see [Company](../lib/companies/companies.ts#L577) interface.

```javascript

  // Get company detail
  CSCorporateSDK
    .getClient()
    .companies
    .withId(ico: string|number)
    .get()
    .then(...)
    .catch(...)

```

## 3. List campaigns for company

You can list campaigns for company by getting the [CampaignsResource](../lib/companies/campaigns,ts#L3) and then calling the `list` method on it. For full response see [CampaignList](../lib/companies/campaigns.ts#L21) interface.

```javascript

  CSCorporateSDK
    .getClient()
    .companies
    .withId(ico: string|number)
    .campaigns
    .list()
    .then(...)
    .catch(...)

```

## 4. List relationship managers for company

List relationship managers for company by getting the [RelationshipManagersResource](../lib/companies/relationship-managers.ts#L4) and then calling the `list` method on it. The `list` method takes object with options as a parameter. See [RelationshipManagerListParameters](../lib/companies/relationship-managers.ts#L71) for all supported options. For full response see [RelationshipManagerList](../lib/companies/relationship-managers.ts#L79) interface.

```javascript

  // List relationship managers
  CSCorporateSDK
    .getClient()
    .companies
    .withId(ico: string|number)
    .relationshipManagers
    .list(parameters: RelationshipManagerListParameters)
    .then(...)
    .catch(...)

```

## 5. Get relationship manager detail

Get relationship manager detail by getting the [RelationshipManagerResource](../lib/companies/relationship-managers.ts#L38) and calling the `get` method on it. For full response see [EmployeeDetail](../lib/companies/relationship-managers.ts#L145) interface.

```javascript

  // Get relationship manager detail
  CSCorporateSDK
    .getClient()
    .companies
    .withId(ico: string|number)
    .relationshipManagers
    .withId(empId: string|number)
    .get()
    .then(...)
    .catch(...)

```

## 6. Get relationship manager photo information

Get relationship manager photo information by getting the [RelationshipManagerPhotoInfoResource](../lib/companies/photo/info,ts#L3) and calling the `get` method on it. For full response see [RelationshipManagerPhotoInfo](../lib/companies/photo/info.ts#L21) interaface.

```javascript

  // Get relationship manager photo info
  CSCorporateSDK
    .getClient()
    .companies
    .withId(ico: string|number)
    .relationshipManagers
    .withId(empId: string|number)
    .photo
    .info
    .get()
    .then(...)
    .catch(...)

```

## 7. Download relationship manager photo

You can download relationship manager photo by getting the [RelationshipManagerPhotoResource](../lib/companies/photo/photo.ts#L4) and then calling the `download` method on it. The `download` method takes object with options as a parameter. For all options see [RelationshipManagerPhotoDownloadParameters][../lib/companies/photo/photo.ts#L23] interface.

```javascript

  // Download relationship manager photo
  CSCorporateSDK
    .getClient()
    .companies
    .withId(ico: string|number)
    .relationshipManagers
    .withId(empId: string|number)
    .photo
    .download()
    .then(...)
    .catch(...)

```