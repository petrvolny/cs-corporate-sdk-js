#Using CorporateSDK
Corporate SDK allows you to get information about companies accounts, campaings and relationship managers from Česká spořitelna a.s.

This SDK uses [ES6-promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) as its return values from asynchronous calls.

##Before You Begin

Before using CoreSDK in your application, you need to initialize it by providing it your WebApiKey.

```javascript

    //Set your WebApi key
    CSCoreSDK.useWebApiKey('YourApiKey');
    
    //Get CorporateClient
    var corporateClient = CSCorporateSDK.getClient();
    
```

##Resources
These resources are available on the [`CorporateClient`](../lib/corporate.ts). 

- AccountsResource - Get information about company accounts including balance and transactions
- CompaniesResource - Get information about companies including theit campaings and relationship managers

To get resource instances see the following code snippet.

```javascript

    // Get CorporateClient
    var corporateClient = CSCorporateSDK.getClient();
    
    // Get AccountsResource Instance
    corporateClient.accounts
    
    // Get CompaniesResource Instance
    corporateClient.companies

```

## General concepts

### Pagination

Resources that supports pagination implements `PaginatedListEnabled` interface (for example [`AccountsResource`](../lib/accounts/accounts.ts)). If thats the case you can (and should) pass an object with properties `pageNumber` and `pageSize` to the `list` method. There is no SDK default pagination so if you do not pass pagination parameters then you get whatever the server decides so we strongly recommend you use pagination parameters.

 ```javascript
 
    CSCorporateSDK
        .getClient()
        .accounts
        .list({
            // number of the page 
            pageNumber: 0,
            
            // size of the listing
            pageSize: 10 
        })
        .then(function(accounts) {
            // ...
        });
 
 ```

The response from this call contains `pagination` property. `Pagination` object has properties such as `pageCount`, `hasNextPage` or `hasPrevPage`. For `Pagination` definition please see [`ResponsePagination`](https://github.com/Ceskasporitelna/cs-core-sdk-js/blob/master/lib/web-api/lists.ts).
See full sample response below.

```javascript

    PaginatedListResponseStructure {
        items: Array[10],
        pagination: {
            hasNextPage: true,
            hasPrevPage: false,
            pageCount: 13,
            pageNumber: 0,
            pageSize: 10,
            nextPage: 1,
            prevPage: null
        },
        nextPage: function,
        prevPage: function
    }

```

On this response you can call `nextPage` function which returns `Promise` with a next page results.

```javascript

    var accounts;
    
    CSCorporateSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10
        }).then(function(response) => {
            accounts = response;            
        });
        
    // Do something ...
    
    accounts
        .nextPage()
        .then(function(response) => {
            console.log(response.pagination.pageNumber); // 1
        });

```

If you are on the second or latter page you can also call `prevPage` on the listing to get previous page results.

```javascript

    accounts
        .prevPage()
        .then(function(response) {
            console.log(response.pagination.pageNumber); // 0
        });

```

### Sorting

Methods that support server side sorting take object with properties `sort` and `order` as a parameter. These methods' parameters interfaces extend [`Sortable`](https://github.com/Ceskasporitelna/cs-core-sdk-js/blob/master/lib/web-api/lists.ts) interface which takes enum as a generic. Both `sort` and `order` parameters are optional but you obviously cannot use `order` parameter without using `sort` parameter. Available `Sort` values are dependent on individual API and we provide you with these values in enums where possible. You can use these enums or just pass strings. `Order` can be `asc` for ascending which is also default or `desc` for descending. We provide [`Order`](https://github.com/Ceskasporitelna/cs-core-sdk-js/blob/master/lib/web-api/lists.ts#L156) enum for these values too.

```javascript

    CSCorporateSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: AccountsSortableFields.ID,
            order: CSCoreSDK.Order.ASCENDING,
        })
        .then(function(response) {
            // ...
        });

```

You can use multiple values for sorting.

```javascript

    CSCorporateSDK
        .getClient()
        .accounts
        .list({
            pageNumber: 0,
            pageSize: 10,
            sort: [
                'type',
                'id',
            ],
            types: [
                'desc',
                'asc'
            ]
        })
        .then(function(response) {
            // ...
        });

```

## Functionality

Netbanking SDK provides the following functionality:

- [**Accounts**](./accounts.md) - Get information about company accounts including balance and transactions.
- [**Companies**](./companies.md) - Get information about companies including theit campaings and relationship managers

## Demo
Check out the [AngularJS demo application](https://github.com/Ceskasporitelna/csas-sdk-demo-js) for usage demonstration.

##Further documentation
Please see the documented [TypeScript definition file](../dist/cs-corporate-sdk.sfx.d.ts) for detailed description of the functionalities provided by this SDK.

This SDK communicates with Corporate API. You can have a look at its [documentation](http://docs.ext1csascorporates.apiary.io/).