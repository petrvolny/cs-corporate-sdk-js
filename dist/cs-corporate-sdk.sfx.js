var CSCorporateSDK =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference types="es6-promise" />
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var accounts_1 = __webpack_require__(2);
	var companies_1 = __webpack_require__(5);
	var sharedClient = null;
	/*+
	 * Returns the singleton CorporateClient
	 */
	function getClient() {
	    if (sharedClient === null) {
	        return new CorporateClient(CSCoreSDK.config.copy(), CSCoreSDK.sharedContext);
	    }
	    return sharedClient;
	}
	exports.getClient = getClient;
	/**
	 * Corporate client
	 */
	var CorporateClient = (function (_super) {
	    __extends(CorporateClient, _super);
	    /**
	     * Creates new instance of CorporateClient
	     *
	     * @param config WebApiConfiguration object that configures this client
	     * @param context WebApiContext object that allows for data sharing between clients
	     */
	    function CorporateClient(config, context) {
	        var _this = _super.call(this, config, '/api/v1/corporate/our') || this;
	        _this.sharedContext = context;
	        return _this;
	    }
	    Object.defineProperty(CorporateClient.prototype, "accounts", {
	        /**
	         * Get information about company accounts including balance and transactions
	         */
	        get: function () {
	            return new accounts_1.AccountsResource(this.getPath() + "/accounts", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CorporateClient.prototype, "companies", {
	        /**
	         * Get information about companies including theit campaings and relationship managers
	         */
	        get: function () {
	            return new companies_1.CompaniesResource(this.getPath() + "/companies", this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CorporateClient;
	}(CSCoreSDK.WebApiClient));
	exports.CorporateClient = CorporateClient;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = CSCoreSDK;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var balance_1 = __webpack_require__(3);
	var transactions_1 = __webpack_require__(4);
	var AccountsResource = (function (_super) {
	    __extends(AccountsResource, _super);
	    function AccountsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List bank accounts incl. basic account information the current user can see accordign to disposition model.
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'accounts', params, function (response) {
	                // Add convenience methods to listing items
	                response.items.forEach(function (item) {
	                    resourcifyListing(item, _this.withId(item.id));
	                });
	                return response;
	            });
	        };
	        /**
	         * Returns Account resource with a given ID
	         */
	        _this.withId = function (accountId) {
	            return new AccountResource(accountId, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return AccountsResource;
	}(CSCoreSDK.Resource));
	exports.AccountsResource = AccountsResource;
	var AccountResource = (function (_super) {
	    __extends(AccountResource, _super);
	    function AccountResource() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Object.defineProperty(AccountResource.prototype, "balance", {
	        /**
	         * Returns resource for getting accounts balance
	         */
	        get: function () {
	            return new balance_1.BalanceResource(this.getPath() + "/balance", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(AccountResource.prototype, "transactions", {
	        /**
	         * Returns resource for getting accounts transactions
	         */
	        get: function () {
	            return new transactions_1.TransactionsResource(this.getPath() + "/transactions", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return AccountResource;
	}(CSCoreSDK.InstanceResource));
	exports.AccountResource = AccountResource;
	var resourcifyListing = function (account, accountReference) {
	    account.transactions = accountReference.transactions;
	    account.balance = accountReference.balance;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var BalanceResource = (function (_super) {
	    __extends(BalanceResource, _super);
	    function BalanceResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get balance of the account
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                // transform ISO strings to date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO('overdraftDueDate', response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return BalanceResource;
	}(CSCoreSDK.Resource));
	exports.BalanceResource = BalanceResource;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var TransactionsResource = (function (_super) {
	    __extends(TransactionsResource, _super);
	    function TransactionsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List accounts transactions
	         */
	        _this.list = function (params) {
	            // transform date objects to ISO strings
	            CSCoreSDK.EntityUtils.transformDatesToISO(['dateStart', 'dateEnd'], params);
	            // transform "sort" and "order" parameters to comma separated list from array
	            CSCoreSDK.EntityUtils.transformArrayParamsToString(params, ['sort', 'order']);
	            return CSCoreSDK.ResourceUtils.CallPaginatedListWithSuffix(_this, null, 'transactions', params, function (response) {
	                // transform ISO strings to date objects
	                CSCoreSDK.EntityUtils.addDatesToItems(['valuationDate', 'bookingDate', 'currRateEURDate'], response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return TransactionsResource;
	}(CSCoreSDK.Resource));
	exports.TransactionsResource = TransactionsResource;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var campaigns_1 = __webpack_require__(6);
	var relationship_managers_1 = __webpack_require__(7);
	var CompaniesResource = (function (_super) {
	    __extends(CompaniesResource, _super);
	    function CompaniesResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List of companies associated with client including the type of relationship from the current client to the subject.
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null).then(function (response) {
	                // Add convenience methods to listing items
	                response.items.forEach(function (item) {
	                    resourcifyListing(item, _this.withId(item.regNum), true);
	                });
	                return response;
	            });
	        };
	        /**
	         * Get a Company resource for company with a given ico representing registration number
	         */
	        _this.withId = function (ico) {
	            return new CompanyResource(ico, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return CompaniesResource;
	}(CSCoreSDK.Resource));
	exports.CompaniesResource = CompaniesResource;
	var CompanyResource = (function (_super) {
	    __extends(CompanyResource, _super);
	    function CompanyResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get company detail
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                // Add convenience methods to response
	                resourcifyListing(response, _this, false);
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(CompanyResource.prototype, "campaigns", {
	        /**
	         * Returns CampaignsResource for listing company's campaigns
	         */
	        get: function () {
	            return new campaigns_1.CampaignsResource(this.getPath() + "/campaigns", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompanyResource.prototype, "relationshipManagers", {
	        /**
	         * Returns RelationshipManagersResource for listing company's relationship managers and info about them including photo
	         */
	        get: function () {
	            return new relationship_managers_1.RelationshipManagersResource(this.getPath() + "/relationshipmanagers", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CompanyResource;
	}(CSCoreSDK.InstanceResource));
	exports.CompanyResource = CompanyResource;
	var resourcifyListing = function (company, companyReference, isListing) {
	    if (isListing) {
	        company.get = companyReference.get;
	    }
	    company.campaigns = companyReference.campaigns;
	    company.relationshipManagers = companyReference.relationshipManagers;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var CampaignsResource = (function (_super) {
	    __extends(CampaignsResource, _super);
	    function CampaignsResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List marketing campaigns
	         */
	        _this.list = function () {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null).then(function (response) {
	                // transform ISO strings to date objects
	                CSCoreSDK.EntityUtils.addDatesToItems('endDate', response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return CampaignsResource;
	}(CSCoreSDK.Resource));
	exports.CampaignsResource = CampaignsResource;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var photo_1 = __webpack_require__(8);
	var RelationshipManagersResource = (function (_super) {
	    __extends(RelationshipManagersResource, _super);
	    function RelationshipManagersResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * List all relationship managers grouped by their positions. You will get an array of positions whilst each position may include one or more relationship managers. Typically there should be just one position flagged as primary as well as one contact in each position.
	         * You can filter for all positions (ALL) or for primary only (PRIMARY).
	         */
	        _this.list = function (params) {
	            return CSCoreSDK.ResourceUtils.CallListWithSuffix(_this, null, null, params).then(function (response) {
	                // Add convenience methods to listing items
	                response.items.forEach(function (item) {
	                    if (Array.isArray(item.employees)) {
	                        item.employees.forEach(function (employee) {
	                            resourcifyListing(employee, _this.withId(employee.empId), true);
	                        });
	                    }
	                });
	                return response;
	            });
	        };
	        /**
	         * Returns RelationshipManagerResource for a given employee id
	         */
	        _this.withId = function (emplId) {
	            return new RelationshipManagerResource(emplId, _this.getPath(), _this.getClient());
	        };
	        return _this;
	    }
	    return RelationshipManagersResource;
	}(CSCoreSDK.Resource));
	exports.RelationshipManagersResource = RelationshipManagersResource;
	var RelationshipManagerResource = (function (_super) {
	    __extends(RelationshipManagerResource, _super);
	    function RelationshipManagerResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get a reletionshipt manager detail
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                // Add convenience methods to response
	                resourcifyListing(response, _this, false);
	                return response;
	            });
	        };
	        return _this;
	    }
	    Object.defineProperty(RelationshipManagerResource.prototype, "photo", {
	        /**
	         * Returns RelationshipManagerPhotoResource for getting relationship managers photo
	         */
	        get: function () {
	            return new photo_1.RelationshipManagerPhotoResource(this.getPath() + "/photo", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RelationshipManagerResource;
	}(CSCoreSDK.InstanceResource));
	exports.RelationshipManagerResource = RelationshipManagerResource;
	var resourcifyListing = function (employee, employeeReference, isFromListing) {
	    if (isFromListing) {
	        employee.get = employeeReference.get;
	    }
	    employee.photo = employeeReference.photo;
	};
	;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var info_1 = __webpack_require__(9);
	var RelationshipManagerPhotoResource = (function (_super) {
	    __extends(RelationshipManagerPhotoResource, _super);
	    function RelationshipManagerPhotoResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Download relations managers photo.
	         */
	        _this.download = function (params) {
	            return CSCoreSDK.ResourceUtils.CallDownload(_this, null, 'GET', params);
	        };
	        return _this;
	    }
	    Object.defineProperty(RelationshipManagerPhotoResource.prototype, "info", {
	        /**
	         * Returns RelationshipManagerPhotoInfoResource for getting infomation about the photo
	         */
	        get: function () {
	            return new info_1.RelationshipManagerPhotoInfoResource(this.getPath() + "/info", this.getClient());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RelationshipManagerPhotoResource;
	}(CSCoreSDK.Resource));
	exports.RelationshipManagerPhotoResource = RelationshipManagerPhotoResource;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var CSCoreSDK = __webpack_require__(1);
	var RelationshipManagerPhotoInfoResource = (function (_super) {
	    __extends(RelationshipManagerPhotoInfoResource, _super);
	    function RelationshipManagerPhotoInfoResource() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        /**
	         * Get information about the relationship manager photo
	         */
	        _this.get = function () {
	            return CSCoreSDK.ResourceUtils.CallGet(_this, null).then(function (response) {
	                // transform ISO strings to date objects
	                CSCoreSDK.EntityUtils.addDatesFromISO('agreementDate', response);
	                return response;
	            });
	        };
	        return _this;
	    }
	    return RelationshipManagerPhotoInfoResource;
	}(CSCoreSDK.Resource));
	exports.RelationshipManagerPhotoInfoResource = RelationshipManagerPhotoInfoResource;


/***/ }
/******/ ]);
//# sourceMappingURL=cs-corporate-sdk.sfx.js.map