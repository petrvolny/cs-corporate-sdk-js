require("source-map-support").install();
module.exports =
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

	var context = __webpack_require__(1); //make sure you have your directory and regex test set correctly!
	context.keys().forEach(context);
	context = __webpack_require__(31); //make sure you have your directory and regex test set correctly!
	context.keys().forEach(context);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accounts-spec.ts": 2,
		"./authorization-limits-spec.ts": 10,
		"./authorization-token-spec.ts": 11,
		"./budgets-spec.ts": 12,
		"./bundles-spec.ts": 13,
		"./cards-spec.ts": 14,
		"./contacts-spec.ts": 15,
		"./contracts/buildings-spec.ts": 16,
		"./contracts/insurances-spec.ts": 17,
		"./contracts/loyalty-spec.ts": 18,
		"./contracts/pensions-spec.ts": 19,
		"./goals-spec.ts": 20,
		"./messages-spec.ts": 21,
		"./payments-spec.ts": 22,
		"./phone-numbers-spec.ts": 23,
		"./plugins-spec.ts": 24,
		"./profile-spec.ts": 25,
		"./promotions-spec.ts": 26,
		"./securities-spec.ts": 27,
		"./services-spec.ts": 28,
		"./settings-spec.ts": 29,
		"./templates-spec.ts": 30
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	var util = __webpack_require__(9);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function processTransfer(response) {
	        expect(response.signing).toBeTruthy();
	        helpers_1.testStateOpen(response.signing);
	    }
	    function processSimpleAccounts(accounts) {
	        expect(accounts.items.length).toBe(1);
	        expectToBe(accounts.pagination, {
	            pageNumber: 0,
	            pageCount: 1,
	            pageSize: 1,
	        });
	        expectToBe(accounts.items[0], {
	            id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
	            description: 'Anna Vojtíšková',
	            product: '49',
	            productI18N: 'Osobní účet ČS II',
	        });
	    }
	    function processAccounts(accounts) {
	        var account = accounts.items[0];
	        expectToBe(accounts.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectToBe(account, {
	            id: '4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE',
	            description: 'Aleš Vrba',
	            alias: 'muj ucet'
	        });
	    }
	    function processServices(services) {
	        var service = services.items[0];
	        expect(services.items.length).toBe(2);
	        expectToBe(services.pagination, {
	            pageNumber: 0,
	            pageCount: 4,
	            pageSize: 2,
	            nextPage: 1
	        });
	        expectToBe(service, {
	            id: 'E878D16AD1A79FB60A520F48706C187AEFCA9D5D',
	            nameI18N: '2x výběr z bankomatů České spořitelny',
	            iconGroup: 'CARDS',
	        });
	        expectToBe(services.items[1], {
	            id: '3FB37388FC58076DEAD3DE282E075592A299B596',
	            nameI18N: 'Platební karta',
	            iconGroup: 'CARDS',
	        });
	    }
	    function processReservations(reservations) {
	        var reservation = reservations.items[0];
	        expectDate(reservation, {
	            creationDate: '2015-09-18T21:43:53Z',
	            expirationDate: '2015-09-25T21:43:53Z'
	        });
	        expectToBe(reservations.pagination, {
	            pageNumber: 0,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectToBe(reservation, {
	            status: 'RESERVED',
	            merchantName: 'Pizzeria Grosseto',
	            description: 'Platba kartou'
	        });
	        expectToBe(reservation.amount, {
	            value: 45270,
	            precision: 2,
	            currency: 'CZK'
	        });
	    }
	    function processStatements(statements) {
	        var statement = statements.items[0];
	        expectDate(statement, {
	            statementDate: '2016-02-29T00:00:00+01:00'
	        });
	        expectToBe(statements.pagination, {
	            pageNumber: 0,
	            pageCount: 1,
	            pageSize: 1
	        });
	        expectToBe(statement, {
	            id: '06029392819b0198',
	            number: 2,
	            periodicity: 'MONTHLY',
	            format: 'PDF_A4',
	            language: 'cs'
	        });
	    }
	    function processSubAccountsStatements(statements) {
	        var statement = statements.items[0];
	        expectDate(statement, {
	            statementDate: '2013-06-21T14:18:19Z'
	        });
	        expectToBe(statements.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            nextPage: 1
	        });
	        expectToBe(statement, {
	            id: '201302520130621161819',
	            number: 25,
	            periodicity: 'MONTHLY',
	            format: 'PDF_A4',
	            language: 'cs'
	        });
	    }
	    function processRepayments(repayments) {
	        var repayment = repayments.items[0];
	        expect(repayments.items.length).toBe(2);
	        expectDate(repayment, {
	            repaymentDate: '2016-01-18'
	        });
	        expectToBe(repayment.amount, {
	            value: 32500,
	            precision: 2,
	            currency: 'CZK'
	        });
	        expectToBe(repayment.paidAmount, {
	            value: 32500,
	            precision: 2,
	            currency: 'CZK'
	        });
	    }
	    function processStandingOrders(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageCount: 3,
	            pageSize: 2,
	            nextPage: 1
	        });
	        expectToBe(response.items[0], {
	            number: '1',
	            type: 'STANDING_ORDER',
	            status: 'OK',
	        });
	        expectDate(response.items[0], {
	            startDate: '2013-01-09T00:00:00+01:00',
	            nextExecutionDate: '2016-06-17',
	            realExecutionDate: '2016-06-17',
	        });
	        expect(response.items[0].get).toBeDefined();
	        expect(response.items[0].delete).toBeDefined();
	    }
	    function processDirectDebits(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 2,
	            nextPage: 1
	        });
	        expectToBe(response.items[0], {
	            number: '2',
	            type: 'DIRECT_DEBIT',
	            periodCycle: 'MONTHLY',
	            periodicity: 1,
	            receiverName: 'Vrba Aleš'
	        });
	        expectDate(response.items[0], {
	            startDate: '2012-11-26',
	            versionValidityDate: '2012-11-26'
	        });
	    }
	    describe('Netbanking SDK accounts', function () {
	        it('retrieves a list of accounts', function (done) {
	            judgeSession.setNextCase('accounts.list').then(function () {
	                return client.accounts.list({
	                    type: 'CURRENT',
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'iban',
	                        'balance'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (accounts) {
	                processSimpleAccounts(accounts);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('tests pagination for accounts list', function (done) {
	            var response;
	            judgeSession.setNextCase('accounts.list.page0').then(function () {
	                return client.accounts.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (accounts) {
	                processAccounts(accounts);
	                response = accounts;
	            }).then(function () {
	                return judgeSession.setNextCase('accounts.list.page1');
	            }).then(function () {
	                return response.nextPage();
	            }).then(function (accounts) {
	                var account = accounts.items[0];
	                expectToBe(accounts.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1
	                });
	                expectToBe(account, {
	                    id: 'EC1C13B722F726D783365D0A89D23E805098B167',
	                    description: 'Aleš Vrba'
	                });
	                expectDate(account.loan, {
	                    nextRateDate: '2016-03-31',
	                    maturityDate: '2037-12-31',
	                    drawdownToDate: '2012-12-31'
	                });
	                response = accounts;
	            }).then(function () {
	                return judgeSession.setNextCase('accounts.list.page0');
	            }).then(function () {
	                return response.prevPage();
	            }).then(function (accounts) {
	                processAccounts(accounts);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves an individual account with a given id', function (done) {
	            judgeSession.setNextCase('accounts.withId.get').then(function () {
	                return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').get();
	            }).then(function (account) {
	                expectToBe(account, {
	                    id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
	                    description: 'Anna Vojtíšková',
	                    product: '49',
	                    productI18N: 'Osobní účet ČS II',
	                });
	                expectToBe(account.accountno, {
	                    number: '2328489013',
	                    bankCode: '0800',
	                    countryCode: 'CZ'
	                });
	                expectToBe(account.balance, {
	                    value: 2650706,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves accounts detail by convenience method on accounts listing', function (done) {
	            var response;
	            judgeSession.setNextCase('accounts.list').then(function () {
	                return client.accounts.list({
	                    type: 'CURRENT',
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'iban',
	                        'balance'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (accounts) {
	                processSimpleAccounts(accounts);
	                response = accounts;
	            }).then(function () {
	                return judgeSession.setNextCase('accounts.withId.get');
	            }).then(function () {
	                return response.items[0].get();
	            }).then(function (account) {
	                expectToBe(account, {
	                    id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
	                    description: 'Anna Vojtíšková',
	                    product: '49',
	                    productI18N: 'Osobní účet ČS II',
	                });
	                expectToBe(account.accountno, {
	                    number: '2328489013',
	                    bankCode: '0800',
	                    countryCode: 'CZ'
	                });
	                expectToBe(account.balance, {
	                    value: 2650706,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates alias on a given account', function (done) {
	            judgeSession.setNextCase('accounts.withId.update').then(function () {
	                return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').update({
	                    alias: 'muj ucet'
	                });
	            }).then(function (account) {
	                expectToBe(account, {
	                    id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
	                    alias: 'muj ucet',
	                    description: 'Aleš Vrba'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates alias on an account by using convenience update method from accounts listing', function (done) {
	            var response;
	            judgeSession.setNextCase('accounts.list').then(function () {
	                return client.accounts.list({
	                    type: 'CURRENT',
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'iban',
	                        'balance'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (accounts) {
	                processSimpleAccounts(accounts);
	                response = accounts;
	            }).then(function () {
	                return judgeSession.setNextCase('accounts.withId.update');
	            }).then(function () {
	                return response.items[0].update({
	                    alias: 'muj ucet'
	                });
	            }).then(function (account) {
	                expectToBe(account, {
	                    id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
	                    alias: 'muj ucet',
	                    description: 'Aleš Vrba'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves accounts balances', function (done) {
	            judgeSession.setNextCase('accounts.withId.balances.get').then(function () {
	                return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').balance.get();
	            }).then(function (balance) {
	                expectToBe(balance.balance, {
	                    value: 2650706,
	                    currency: 'CZK',
	                    precision: 2
	                });
	                expectToBe(balance.disposable, {
	                    value: 2650706,
	                    currency: 'CZK',
	                    precision: 2
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves accounts services by convenience method on accounts listing', function (done) {
	            var response;
	            judgeSession.setNextCase('accounts.list').then(function () {
	                return client.accounts.list({
	                    type: 'CURRENT',
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'iban',
	                        'balance'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (accounts) {
	                processSimpleAccounts(accounts);
	                response = accounts;
	            }).then(function () {
	                return judgeSession.setNextCase('accounts.withId.services.list');
	            }).then(function () {
	                return response.items[0].services.list({
	                    pageNumber: 0,
	                    pageSize: 2
	                });
	            }).then(function (services) {
	                processServices(services);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves list of services of the account', function (done) {
	            judgeSession.setNextCase('accounts.withId.services.list').then(function () {
	                return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').services.list({
	                    pageNumber: 0,
	                    pageSize: 2
	                });
	            }).then(function (services) {
	                processServices(services);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	    it('retrieves list of services twice from a same resource', function (done) {
	        var resource = client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').services;
	        judgeSession.setNextCase('accounts.withId.services.list').then(function () {
	            return resource.list({
	                pageNumber: 0,
	                pageSize: 2
	            });
	        }).then(function (services) {
	            processServices(services);
	            return judgeSession.setNextCase('accounts.withId.services.list');
	        }).then(function () {
	            return resource.list({
	                pageNumber: 0,
	                pageSize: 2
	            });
	        }).then(function (services) {
	            processServices(services);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('tests pagination for accounts services', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.withId.services.list.page0').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').services.list({
	                pageNumber: 0,
	                pageSize: 1
	            });
	        }).then(function (services) {
	            processServices(services);
	            response = services;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.services.list.page1');
	        }).then(function () {
	            return response.nextPage();
	        }).then(function (services) {
	            var service = services.items[0];
	            expectToBe(services.pagination, {
	                pageNumber: 1,
	                pageCount: 4,
	                pageSize: 2,
	                nextPage: 2
	            });
	            expectToBe(service, {
	                id: '5F66602F35A7D5A86066BC03A6882180BEF01CA3',
	                nameI18N: 'Všechny platby v Kč',
	                iconGroup: 'PAYMENTS'
	            });
	            response = services;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.services.list.page0');
	        }).then(function () {
	            return response.prevPage();
	        }).then(function (services) {
	            processServices(services);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('updates transaction with a given id', function (done) {
	        judgeSession.setNextCase('accounts.withId.transactions.withId.update').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').transactions.withId('39876').update({
	                note: "note",
	                flags: [
	                    "hasStar"
	                ]
	            });
	        }).then(function (response) {
	            expectToBe(response.transaction, {
	                id: '39876',
	                note: 'note'
	            });
	            expect(response.transaction.flags.length).toBe(2);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('exports transaction history into pdf', function (done) {
	        judgeSession.setNextCase('accounts.withId.transactions.export').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').transactions.export(helpers_1.exportTransactionsPayload);
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(function (e) {
	            console.log(util.inspect(e, { depth: null }));
	        });
	    });
	    it('exports transaction history into pdf twice from same resource', function (done) {
	        var resource = client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').transactions;
	        judgeSession.setNextCase('accounts.withId.transactions.export').then(function () {
	            return resource.export(helpers_1.exportTransactionsPayload);
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            return judgeSession.setNextCase('accounts.withId.transactions.export');
	        }).then(function () {
	            return resource.export(helpers_1.exportTransactionsPayload);
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('exports transaction history into pdf from convenience method on accounts listing', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.list').then(function () {
	            return client.accounts.list({
	                type: 'CURRENT',
	                pageNumber: null,
	                pageSize: null,
	                sort: [
	                    'iban',
	                    'balance'
	                ],
	                order: [
	                    'asc',
	                    'desc'
	                ]
	            });
	        }).then(function (accounts) {
	            processSimpleAccounts(accounts);
	            response = accounts;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.transactions.export');
	        }).then(function () {
	            return response.items[0].transactions.export({
	                dateFrom: new Date(1999, 8, 27),
	                dateTo: new Date(2000, 8, 27),
	                fields: [
	                    'bookingDate',
	                    'partner',
	                    'amount',
	                    'currency'
	                ],
	                showAccountName: true,
	                showAccountNumber: true,
	                showTimespan: true,
	                showBalance: true
	            });
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves list of reservations of the account', function (done) {
	        judgeSession.setNextCase('accounts.withId.reservations.list').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').reservations.list();
	        }).then(function (reservations) {
	            processReservations(reservations);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('tests pagination for accounts reservations', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.withId.reservations.list.page0').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').reservations.list({
	                pageNumber: 0,
	                pageSize: 1
	            });
	        }).then(function (reservations) {
	            processReservations(reservations);
	            response = reservations;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.reservations.list.page1');
	        }).then(function () {
	            return response.nextPage();
	        }).then(function (reservations) {
	            var reservation = reservations.items[0];
	            expectToBe(reservations.pagination, {
	                pageNumber: 1,
	                pageCount: 2,
	                pageSize: 1
	            });
	            expectToBe(reservation, {
	                status: 'RESERVED',
	                merchantName: 'AAA Taxi',
	                description: 'Platba kartou'
	            });
	            expectDate(reservation, {
	                creationDate: '2015-09-18T21:54:58Z',
	                expirationDate: '2015-09-25T21:54:58Z'
	            });
	            response = reservations;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.reservations.list.page0');
	        }).then(function () {
	            return response.prevPage();
	        }).then(function (reservations) {
	            processReservations(reservations);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves accounts reservations by convenience method on accounts listing', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.list').then(function () {
	            return client.accounts.list({
	                type: 'CURRENT',
	                pageNumber: null,
	                pageSize: null,
	                sort: [
	                    'iban',
	                    'balance'
	                ],
	                order: [
	                    'asc',
	                    'desc'
	                ]
	            });
	        }).then(function (accounts) {
	            processSimpleAccounts(accounts);
	            response = accounts;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.reservations.list');
	        }).then(function () {
	            return response.items[0].reservations.list();
	        }).then(function (reservations) {
	            processReservations(reservations);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('revolves loan disbursement', function (done) {
	        judgeSession.setNextCase('accounts.withId.transfers.update').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').transfer.update({
	                type: "REVOLVING_LOAN_DISBURSEMENT",
	                amount: {
	                    value: 1000,
	                    precision: 2,
	                    currency: "CZK"
	                },
	                transferDate: new Date(2015, 1, 28),
	                recipientNote: "moje prve cerpanie z penize na klik"
	            });
	        }).then(function (response) {
	            processTransfer(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('revolves loan disbursement twice from same resource', function (done) {
	        var resource = client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').transfer;
	        judgeSession.setNextCase('accounts.withId.transfers.update').then(function () {
	            return resource.update({
	                type: "REVOLVING_LOAN_DISBURSEMENT",
	                amount: {
	                    value: 1000,
	                    precision: 2,
	                    currency: "CZK"
	                },
	                transferDate: new Date(2015, 1, 28),
	                recipientNote: "moje prve cerpanie z penize na klik"
	            });
	        }).then(function (response) {
	            processTransfer(response);
	            return judgeSession.setNextCase('accounts.withId.transfers.update');
	        }).then(function () {
	            return resource.update({
	                type: "REVOLVING_LOAN_DISBURSEMENT",
	                amount: {
	                    value: 1000,
	                    precision: 2,
	                    currency: "CZK"
	                },
	                transferDate: new Date(2015, 1, 28),
	                recipientNote: "moje prve cerpanie z penize na klik"
	            });
	        }).then(function (response) {
	            processTransfer(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('revolves loan by convenience method on accounts listing', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.list').then(function () {
	            return client.accounts.list({
	                type: 'CURRENT',
	                pageNumber: null,
	                pageSize: null,
	                sort: [
	                    'iban',
	                    'balance'
	                ],
	                order: [
	                    'asc',
	                    'desc'
	                ]
	            });
	        }).then(function (accounts) {
	            processSimpleAccounts(accounts);
	            response = accounts;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.transfers.update');
	        }).then(function () {
	            return response.items[0].transfer.update({
	                type: "REVOLVING_LOAN_DISBURSEMENT",
	                amount: {
	                    value: 1000,
	                    precision: 2,
	                    currency: "CZK"
	                },
	                transferDate: new Date("2015-02-28"),
	                recipientNote: "moje prve cerpanie z penize na klik"
	            });
	        }).then(function (response) {
	            helpers_1.testStateOpen(response.signing);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('revolves loan disbursement and signs it', function (done) {
	        judgeSession.setNextCase('signing.tac.accounts.transfer.update').then(function () {
	            return client.accounts.withId('3FB37388FC58076DEAD3DE282E075592A299B596').transfer.update({
	                type: "REVOLVING_LOAN_DISBURSEMENT",
	                amount: {
	                    value: 1000000,
	                    precision: 2,
	                    currency: "CZK"
	                },
	                transferDate: new Date("2015-02-28"),
	                recipientNote: "moje prve cerpanie z penize na klik"
	            });
	        }).then(function (response) {
	            helpers_1.testStateOpen(response.signing);
	            return response.signing.getInfo();
	        }).then(function (response) {
	            helpers_1.testAuthorizationTac(response);
	            return response.startSigningWithTac();
	        }).then(function (response) {
	            return response.finishSigning('00000000');
	        }).then(function (response) {
	            helpers_1.testStateDone(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves list of repayments of the account', function (done) {
	        judgeSession.setNextCase('accounts.withId.repayments.list').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').repayments.list();
	        }).then(function (repayments) {
	            processRepayments(repayments);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves lsit of repayments twice from same resource', function (done) {
	        var resource = client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').repayments;
	        judgeSession.setNextCase('accounts.withId.repayments.list').then(function () {
	            return resource.list();
	        }).then(function (repayments) {
	            processRepayments(repayments);
	            return judgeSession.setNextCase('accounts.withId.repayments.list');
	        }).then(function () {
	            return resource.list();
	        }).then(function (repayments) {
	            processRepayments(repayments);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves accounts repayments by convenience method on accounts listing', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.list').then(function () {
	            return client.accounts.list({
	                type: 'CURRENT',
	                pageNumber: null,
	                pageSize: null,
	                sort: [
	                    'iban',
	                    'balance'
	                ],
	                order: [
	                    'asc',
	                    'desc'
	                ]
	            });
	        }).then(function (accounts) {
	            processSimpleAccounts(accounts);
	            response = accounts;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.repayments.list');
	        }).then(function () {
	            return response.items[0].repayments.list();
	        }).then(function (repayments) {
	            var repayment = repayments.items[0];
	            expect(repayments.items.length).toBe(2);
	            expectDate(repayment, {
	                repaymentDate: '2016-01-18'
	            });
	            expectToBe(repayment.amount, {
	                value: 32500,
	                precision: 2,
	                currency: 'CZK'
	            });
	            expectToBe(repayment.paidAmount, {
	                value: 32500,
	                precision: 2,
	                currency: 'CZK'
	            });
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves list of statements of the account', function (done) {
	        judgeSession.setNextCase('accounts.withId.statements.list').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
	                sort: ['statementDate'],
	                order: ['asc'],
	                pageNumber: null,
	                pageSize: null
	            });
	        }).then(function (statements) {
	            processStatements(statements);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('tests pagination for accounts statements', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.withId.statements.list.page0').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
	                pageNumber: 0,
	                pageSize: 1
	            });
	        }).then(function (statements) {
	            processStatements(statements);
	            response = statements;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.statements.list.page1');
	        }).then(function () {
	            return response.nextPage();
	        }).then(function (statements) {
	            var statement = statements.items[0];
	            expectToBe(statements.pagination, {
	                pageNumber: 1,
	                pageCount: 2,
	                pageSize: 1
	            });
	            expectToBe(statement, {
	                id: '06029392819b0197',
	                number: 3,
	                periodicity: 'MONTHLY',
	                language: 'cs'
	            });
	            expectDate(statement, {
	                statementDate: '2016-02-29T00:00:00+01:00'
	            });
	            response = statements;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.statements.list.page0');
	        }).then(function () {
	            return response.prevPage();
	        }).then(function (statements) {
	            processStatements(statements);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves accounts statements by convenience method on accounts listing', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.list').then(function () {
	            return client.accounts.list({
	                type: 'CURRENT',
	                pageNumber: null,
	                pageSize: null,
	                sort: [
	                    'iban',
	                    'balance'
	                ],
	                order: [
	                    'asc',
	                    'desc'
	                ]
	            });
	        }).then(function (accounts) {
	            processSimpleAccounts(accounts);
	            response = accounts;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.statements.list');
	        }).then(function () {
	            return response.items[0].statements.list({
	                sort: ['statementDate'],
	                order: ['asc'],
	                pageNumber: null,
	                pageSize: null
	            });
	        }).then(function (statements) {
	            processStatements(statements);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('downloads statements file', function (done) {
	        judgeSession.setNextCase('accounts.withId.statements.download').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.download({
	                format: 'PDF_A4',
	                statementId: '06029392819b0198'
	            });
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves list of statements on the sub account', function (done) {
	        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements.list({
	                sort: ['statementDate'],
	                order: ['asc'],
	                pageNumber: null,
	                pageSize: null
	            });
	        }).then(function (statements) {
	            processSubAccountsStatements(statements);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('tests pagination for sub accounts statements', function (done) {
	        var response;
	        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list.page0').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements.list({
	                pageNumber: 0,
	                pageSize: 1
	            });
	        }).then(function (statements) {
	            processSubAccountsStatements(statements);
	            response = statements;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list.page1');
	        }).then(function () {
	            return response.nextPage();
	        }).then(function (statements) {
	            var statement = statements.items[0];
	            expectToBe(statements.pagination, {
	                pageNumber: 1,
	                pageCount: 2,
	                pageSize: 1
	            });
	            expectToBe(statement, {
	                id: '201302524845621161819',
	                number: 19,
	                periodicity: 'DAILY'
	            });
	            expectDate(statement, {
	                statementDate: '2014-05-11T14:12:19Z'
	            });
	            response = statements;
	        }).then(function () {
	            return judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list.page0');
	        }).then(function () {
	            return response.prevPage();
	        }).then(function (statements) {
	            processSubAccountsStatements(statements);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves list of subaccounts statements twice from same resource', function (done) {
	        var resource = client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements;
	        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list').then(function () {
	            return resource.list({
	                sort: ['statementDate'],
	                order: ['asc'],
	                pageNumber: null,
	                pageSize: null
	            });
	        }).then(function (statements) {
	            processSubAccountsStatements(statements);
	            return judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.list');
	        }).then(function () {
	            return resource.list({
	                sort: ['statementDate'],
	                order: ['asc'],
	                pageNumber: null,
	                pageSize: null
	            });
	        }).then(function (statements) {
	            processSubAccountsStatements(statements);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('downloads subAccounts statements file', function (done) {
	        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.download').then(function () {
	            return client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements.download({
	                format: 'PDF_A4',
	                statementId: '201302520130621180000'
	            });
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('downloads subAccounts statements file twice from the resource', function (done) {
	        var resource = client.accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').subAccounts.withId('0D5F82464A77DF093858A8A5B938BEE410B4409C').statements;
	        judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.download').then(function () {
	            return resource.download({
	                format: 'PDF_A4',
	                statementId: '201302520130621180000'
	            });
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            return judgeSession.setNextCase('accounts.withId.subAccounts.withId.statements.download');
	        }).then(function () {
	            return resource.download({
	                format: 'PDF_A4',
	                statementId: '201302520130621180000'
	            });
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('tests pagination for standing orders', function (done) {
	        var list;
	        judgeSession.setNextCase('accounts.withId.standingOrders.list.page0').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.list({
	                pageNumber: 0,
	                pageSize: 2,
	                sort: ['nextExecutionDate'],
	                order: ['desc']
	            });
	        }).then(function (response) {
	            processStandingOrders(response);
	            list = response;
	            return judgeSession.setNextCase('accounts.withId.standingOrders.list.page1');
	        }).then(function () {
	            return list.nextPage();
	        }).then(function (response) {
	            expectToBe(response.pagination, {
	                pageNumber: 1,
	                pageCount: 3,
	                pageSize: 2,
	                nextPage: 2
	            });
	            expectToBe(response.items[0], {
	                number: '3',
	                type: 'STANDING_ORDER',
	                status: 'OK',
	            });
	            expect(response.items[0].get).toBeDefined();
	            expect(response.items[0].delete).toBeDefined();
	            list = response;
	            return judgeSession.setNextCase('accounts.withId.standingOrders.list.page0');
	        }).then(function () {
	            return list.prevPage();
	        }).then(function (response) {
	            processStandingOrders(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves standing order with a given id', function (done) {
	        judgeSession.setNextCase('accounts.withId.standingOrders.withId.get').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.withId('1').get();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '1',
	                type: 'STANDING_ORDER',
	                alias: 'nájemné'
	            });
	            expectDate(response, {
	                startDate: '2013-01-09T00:00:00+01:00',
	                nextExecutionDate: '2016-06-17',
	                realExecutionDate: '2016-06-17',
	            });
	            expect(response.get).toBeDefined();
	            expect(response.delete).toBeDefined();
	            expect(response.scheduledExecutionDates[0].toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-06-17')).toString());
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('creates standing order', function (done) {
	        judgeSession.setNextCase('accounts.withId.standingOrders.create').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.create({
	                type: 'STANDING_ORDER',
	                alias: 'Monthly standing order executed on the last day of month',
	                receiverName: 'Name of the receiver',
	                receiver: {
	                    number: '188505042',
	                    bankCode: '0300'
	                },
	                amount: {
	                    value: 30000,
	                    precision: 2,
	                    currency: 'CZK'
	                },
	                nextExecutionDate: new Date('2016-12-31'),
	                executionMode: 'UNTIL_CANCELLATION',
	                executionDueMode: 'DUE_LAST_DAY_OF_MONTH',
	                executionInterval: 'MONTHLY',
	                symbols: {
	                    variableSymbol: '854259',
	                    constantSymbol: '0305',
	                    specificSymbol: '785421'
	                }
	            });
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '160526104005956',
	            });
	            expectDate(response, {
	                nextExecutionDate: '2016-12-31',
	                startDate: '2016-12-31T00:00:00+01:00',
	            });
	            expect(response.get).toBeDefined();
	            expect(response.delete).toBeDefined();
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('deletes standing order with a given id', function (done) {
	        judgeSession.setNextCase('accounts.withId.standingOrders.withId.delete').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.withId('1').delete();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '1',
	                type: 'STANDING_ORDER',
	                alias: 'nájemné'
	            });
	            expectDate(response, {
	                startDate: '2013-01-09T00:00:00+01:00',
	                nextExecutionDate: '2016-06-17',
	                realExecutionDate: '2016-06-17',
	            });
	            expect(response.get).toBeDefined();
	            expect(response.delete).toBeDefined();
	            expect(response.scheduledExecutionDates[0].toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-06-17')).toString());
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('deletes standing order and signs the order', function (done) {
	        var info;
	        judgeSession.setNextCase('signing.tac.accounts.withId.standingOrders.withId.delete').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.withId('1').delete();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '1',
	                type: 'STANDING_ORDER',
	                alias: 'nájemné'
	            });
	            expectDate(response, {
	                startDate: '2013-01-09T00:00:00+01:00',
	                nextExecutionDate: '2016-06-17',
	                realExecutionDate: '2016-06-17',
	            });
	            expect(response.get).toBeDefined();
	            expect(response.delete).toBeDefined();
	            expect(response.scheduledExecutionDates[0].toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-06-17')).toString());
	            info = response;
	            helpers_1.testStateOpen(response.signing);
	            return response.signing.getInfo();
	        }).then(function (response) {
	            helpers_1.testStateOpen(response);
	            helpers_1.testStateOpen(info.signing);
	            helpers_1.testAuthorizationTac(response);
	            return response.startSigningWithTac();
	        }).then(function (response) {
	            helpers_1.testStateOpen(info.signing);
	            return response.finishSigning('00000000');
	        }).then(function (response) {
	            helpers_1.testStateDone(response);
	            helpers_1.testStateDone(info.signing);
	            done();
	        }).catch(logJudgeError);
	    });
	    it('retrieves standing order detail through get convenience method', function (done) {
	        var list;
	        judgeSession.setNextCase('accounts.withId.standingOrders.list.page0').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.list({
	                pageNumber: 0,
	                pageSize: 2,
	                sort: ['nextExecutionDate'],
	                order: ['desc']
	            });
	        }).then(function (response) {
	            processStandingOrders(response);
	            list = response;
	            return judgeSession.setNextCase('accounts.withId.standingOrders.withId.get');
	        }).then(function () {
	            return list.items[0].get();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '1',
	                type: 'STANDING_ORDER',
	                alias: 'nájemné'
	            });
	            expectDate(response, {
	                startDate: '2013-01-09T00:00:00+01:00',
	                nextExecutionDate: '2016-06-17',
	                realExecutionDate: '2016-06-17',
	            });
	            expect(response.get).toBeDefined();
	            expect(response.delete).toBeDefined();
	            expect(response.scheduledExecutionDates[0].toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-06-17')).toString());
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('deletes standing order through delete convenience method', function (done) {
	        var list;
	        judgeSession.setNextCase('accounts.withId.standingOrders.list.page0').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').standingOrders.list({
	                pageNumber: 0,
	                pageSize: 2,
	                sort: ['nextExecutionDate'],
	                order: ['desc']
	            });
	        }).then(function (response) {
	            processStandingOrders(response);
	            list = response;
	            return judgeSession.setNextCase('accounts.withId.standingOrders.withId.delete');
	        }).then(function () {
	            return list.items[0].delete();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '1',
	                type: 'STANDING_ORDER',
	                alias: 'nájemné'
	            });
	            expectDate(response, {
	                startDate: '2013-01-09T00:00:00+01:00',
	                nextExecutionDate: '2016-06-17',
	                realExecutionDate: '2016-06-17',
	            });
	            expect(response.get).toBeDefined();
	            expect(response.delete).toBeDefined();
	            expect(response.scheduledExecutionDates[0].toString()).toBe(new Date(CoreSDK.EntityUtils.parseISODate('2016-06-17')).toString());
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('tests pagination for direct debits', function (done) {
	        var list;
	        judgeSession.setNextCase('accounts.withId.directDebts.list.page0').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').directDebits.list({
	                pageNumber: 0,
	                pageSize: 2,
	                sort: ['periodCycle'],
	                order: ['desc'],
	            });
	        }).then(function (response) {
	            processDirectDebits(response);
	            list = response;
	            return judgeSession.setNextCase('accounts.withId.directDebts.list.page1');
	        }).then(function () {
	            return list.nextPage();
	        }).then(function (response) {
	            expectToBe(response.pagination, {
	                pageNumber: 1,
	                pageCount: 2,
	                pageSize: 1,
	            });
	            expectToBe(response.items[0], {
	                number: '4',
	                type: 'SIPO',
	                periodCycle: 'MONTHLY',
	                periodicity: 1,
	            });
	            expectDate(response.items[0], {
	                startDate: '2013-01-08',
	                versionValidityDate: '2013-01-08'
	            });
	            list = response;
	            return judgeSession.setNextCase('accounts.withId.directDebts.list.page0');
	        }).then(function () {
	            return list.prevPage();
	        }).then(function (response) {
	            processDirectDebits(response);
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('retrieves direct debit with a given id', function (done) {
	        judgeSession.setNextCase('accounts.withId.directDebts.withId.get').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').directDebits.withId('4').get();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '4',
	                type: 'SIPO',
	                periodicity: 1,
	                periodCycle: 'MONTHLY',
	            });
	            expectDate(response, {
	                startDate: '2013-01-08',
	                versionValidityDate: '2013-01-08',
	            });
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('deletes direct debit with a given id', function (done) {
	        judgeSession.setNextCase('accounts.withId.directDebts.withId.delete').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').directDebits.withId('4').delete();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '4',
	                type: 'SIPO',
	                periodicity: 1,
	                periodCycle: 'MONTHLY',
	            });
	            expectDate(response, {
	                startDate: '2013-01-08',
	                versionValidityDate: '2013-01-08',
	            });
	            expect(response.signing).toBeDefined();
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('deletes direct debit and signs the order', function (done) {
	        var info;
	        judgeSession.setNextCase('signing.tac.accounts.withId.directDebits.withId.delete').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').directDebits.withId('4').delete();
	        }).then(function (response) {
	            expectToBe(response, {
	                number: '4',
	                type: 'SIPO',
	                periodicity: 1,
	                periodCycle: 'MONTHLY',
	            });
	            expectDate(response, {
	                startDate: '2013-01-08',
	                versionValidityDate: '2013-01-08',
	            });
	            info = response;
	            helpers_1.testStateOpen(response.signing);
	            return response.signing.getInfo();
	        }).then(function (response) {
	            helpers_1.testStateOpen(response);
	            helpers_1.testStateOpen(info.signing);
	            helpers_1.testAuthorizationTac(response);
	            return response.startSigningWithTac();
	        }).then(function (response) {
	            helpers_1.testStateOpen(info.signing);
	            return response.finishSigning('00000000');
	        }).then(function (response) {
	            helpers_1.testStateDone(response);
	            helpers_1.testStateDone(info.signing);
	            done();
	        }).catch(logJudgeError);
	    });
	    it('creates direct debit with a given id', function (done) {
	        judgeSession.setNextCase('accounts.withId.directDebts.create').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').directDebits.create({
	                type: 'DIRECT_DEBIT',
	                receiver: {
	                    number: '428602109',
	                    bankCode: '0800',
	                },
	                alias: 'moje inkaso',
	                periodicity: 1,
	                periodCycle: 'MONTHLY',
	                limit: {
	                    value: 100000,
	                    precision: 2,
	                    currency: 'CZK'
	                },
	                limitSum: {
	                    value: 300000,
	                    precision: 2,
	                    currency: 'CZK'
	                },
	                numberLimit: 5,
	                startDate: new Date('2017-07-14'),
	                endDate: new Date('2018-07-14'),
	                symbols: {
	                    variableSymbol: '4567',
	                    specificSymbol: '800'
	                }
	            });
	        }).then(function (response) {
	            expectToBe(response, {
	                type: 'DIRECT_DEBIT',
	                alias: 'moje inkaso',
	                periodCycle: 'MONTHLY',
	            });
	            expectDate(response, {
	                startDate: '2017-07-14',
	                endDate: '2018-07-14',
	            });
	            expect(response.signing).toBeDefined();
	            done();
	        }).catch(function (e) {
	            logJudgeError(e);
	        });
	    });
	    it('creates direct debit and signs it', function (done) {
	        var info;
	        judgeSession.setNextCase('signing.tac.accounts.withId.directDebits.create').then(function () {
	            return client.accounts.withId('4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE').directDebits.create({
	                type: 'DIRECT_DEBIT',
	                receiver: {
	                    number: '428602109',
	                    bankCode: '0800',
	                },
	                alias: 'moje inkaso',
	                periodicity: 1,
	                periodCycle: 'MONTHLY',
	                limit: {
	                    value: 100000,
	                    precision: 2,
	                    currency: 'CZK'
	                },
	                limitSum: {
	                    value: 300000,
	                    precision: 2,
	                    currency: 'CZK'
	                },
	                numberLimit: 5,
	                startDate: '2017-07-14',
	                endDate: '2018-07-14',
	                symbols: {
	                    variableSymbol: '4567',
	                    specificSymbol: '800'
	                }
	            });
	        }).then(function (response) {
	            expectToBe(response, {
	                type: 'DIRECT_DEBIT',
	                alias: 'moje inkaso',
	                periodCycle: 'MONTHLY',
	            });
	            expectDate(response, {
	                startDate: '2017-07-14',
	                endDate: '2018-07-14',
	            });
	            info = response;
	            helpers_1.testStateOpen(response.signing);
	            return response.signing.getInfo();
	        }).then(function (response) {
	            helpers_1.testStateOpen(response);
	            helpers_1.testStateOpen(info.signing);
	            helpers_1.testAuthorizationTac(response);
	            return response.startSigningWithTac();
	        }).then(function (response) {
	            helpers_1.testStateOpen(info.signing);
	            return response.finishSigning('00000000');
	        }).then(function (response) {
	            helpers_1.testStateDone(response);
	            helpers_1.testStateDone(info.signing);
	            done();
	        }).catch(logJudgeError);
	    });
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("cs-core-sdk");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("../../build/cs-netbanking-sdk.node.js");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var path = __webpack_require__(6);
	var fs = __webpack_require__(7);
	var _ = (__webpack_require__(8));
	function testAuthorizationTac(signingObject) {
	    expect(signingObject.getPossibleAuthorizationTypes()[0]).toBe('TAC');
	    expect(signingObject.getPossibleAuthorizationTypes().length).toBe(1);
	    expect(signingObject.canBeSignedWith('TAC')).toBe(true);
	}
	exports.testAuthorizationTac = testAuthorizationTac;
	function testStateOpen(signingObject) {
	    expect(signingObject.isDone()).toBe(false);
	    expect(signingObject.isCanceled()).toBe(false);
	    expect(signingObject.isOpen()).toBe(true);
	}
	exports.testStateOpen = testStateOpen;
	function testStateDone(signingObject) {
	    expect(signingObject.isDone()).toBe(true);
	    expect(signingObject.isCanceled()).toBe(false);
	    expect(signingObject.isOpen()).toBe(false);
	}
	exports.testStateDone = testStateDone;
	function testFile(response, fileName) {
	    if (fileName === void 0) { fileName = 'test-pdf.pdf'; }
	    if (fs) {
	        var file = fs.readFileSync(path.join(__dirname, fileName));
	        expect(_.isEqual(file.toString(), response.toString())).toBe(true);
	    }
	    expect(response).toBeTruthy();
	    var str = ab2str(response);
	    expect(str.length).toBe(7945);
	}
	exports.testFile = testFile;
	exports.exportTransactionsPayload = {
	    dateFrom: new Date(1999, 8, 27),
	    dateTo: new Date(2000, 8, 27),
	    fields: [
	        'bookingDate',
	        'partner',
	        'amount',
	        'currency'
	    ],
	    showAccountName: true,
	    showAccountNumber: true,
	    showTimespan: true,
	    showBalance: true
	};
	function ab2str(buf) {
	    return String.fromCharCode.apply(null, new Uint8Array(buf));
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "spec"))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("underscore");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('authorization limits', function () {
	        it('retrieves list', function (done) {
	            judgeSession.setNextCase('authorizationLimits.list').then(function () {
	                return client.authorizationLimits.list({
	                    channel: 'George'
	                });
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    id: '934872973982',
	                    authorizationType: 'TAC',
	                    channelId: 'NET_BANKING',
	                    applicationId: 'GEORGE'
	                });
	                expect(response.items[0].get).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves limit detail', function (done) {
	            judgeSession.setNextCase('authorizationLimits.withId.get').then(function () {
	                return client.authorizationLimits.withId('934872973982').get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '934872973982',
	                    authorizationType: 'TAC',
	                    channelId: 'NET_BANKING',
	                    applicationId: 'GEORGE'
	                });
	                expect(response.get).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('authorization token', function () {
	        it('invalidates token', function (done) {
	            judgeSession.setNextCase('authorizationToken.delete').then(function () {
	                return client.authorizationToken.delete();
	            }).then(function (response) {
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('budgets', function () {
	        it('retrieves list', function (done) {
	            judgeSession.setNextCase('budgets.list').then(function () {
	                return client.budgets.list();
	            }).then(function (response) {
	                expectToBe(response.items[0].category, {
	                    id: 'CAR',
	                    level: 'mainCategory'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates budgets', function (done) {
	            judgeSession.setNextCase('budgets.update').then(function () {
	                return client.budgets.update({
	                    budgets: [
	                        {
	                            budget: {
	                                value: 5000,
	                                precision: 2,
	                                currency: 'CZK'
	                            },
	                            category: {
	                                id: 'OTHER_EXPENSES',
	                                level: 'mainCategory'
	                            }
	                        }
	                    ]
	                }).then(function (response) {
	                    expectToBe(response.budgets[0].category, {
	                        id: 'OTHER_EXPENSES',
	                        level: 'mainCategory'
	                    });
	                    expectToBe(response.budgets[0].budget, {
	                        value: 5000,
	                        precision: 2,
	                        currency: 'CZK'
	                    });
	                    done();
	                }).catch(logJudgeError);
	            });
	        });
	    });
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('bundles', function () {
	        it('creates bundle', function (done) {
	            judgeSession.setNextCase('bundles.create').then(function () {
	                return client.bundles.create({
	                    name: 'Bundles 6.10.',
	                    items: [
	                        {
	                            "id": "161125181818261",
	                            "signInfo": {
	                                "state": "OPEN",
	                                "signId": "62567b1991b086e5b6822bb814d505792e1bccdb9057e0a450ec628dc02fbbed"
	                            }
	                        },
	                        {
	                            "id": "161125181840386",
	                            "signInfo": {
	                                "state": "OPEN",
	                                "signId": "47a59e4bcf661d213ddbb11ad84b5f2f4aae99da47bc7d289d5dcccf0dfd7be9"
	                            }
	                        }
	                    ]
	                });
	            })
	                .then(function (response) {
	                expectToBe(response, {
	                    id: '161125181840315',
	                    name: 'Bundles 6.10.',
	                });
	                expect(response.items.length).toBe(2);
	                expect(response.items[0].id).toBe('161125181818261');
	                expectToBe(response.items[0].signInfo, {
	                    state: 'OPEN',
	                    signId: '62567b1991b086e5b6822bb814d505792e1bccdb9057e0a450ec628dc02fbbed',
	                });
	                expect(response.items[1].id).toBe('161125181840386');
	                expectToBe(response.items[1].signInfo, {
	                    state: 'OPEN',
	                    signId: '47a59e4bcf661d213ddbb11ad84b5f2f4aae99da47bc7d289d5dcccf0dfd7be9',
	                });
	                helpers_1.testStateOpen(response.signing);
	                done();
	            })
	                .catch(function (error) {
	                logJudgeError(error);
	            });
	        });
	    });
	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    var exportTransactionsPayload = {
	        dateFrom: new Date(1999, 8, 27),
	        dateTo: new Date(2000, 8, 27),
	        fields: [
	            'bookingDate',
	            'partner',
	            'amount',
	            'currency'
	        ],
	        showAccountName: true,
	        showAccountNumber: true,
	        showTimespan: true,
	        showBalance: true
	    };
	    function processCard(card) {
	        expectDate(card, {
	            expiryDate: '2018-03-31',
	            validFromDate: '2015-04-01'
	        });
	        expectToBe(card, {
	            id: '33A813886442D946122C78305EC4E482DE9F574D',
	            owner: 'VOJTÍŠKOVÁ ANNA',
	            number: '451161XXXXXX1987',
	        });
	        expectToBe(card.mainAccount, {
	            id: '076E1DBCCCD38729A99D93AC8D3E8273237C7E36',
	            holderName: 'Anna Vojtíšková',
	        });
	        expectToBe(card.mainAccount.accountno, {
	            number: '2328489013',
	            bankCode: '0800',
	            countryCode: 'CZ'
	        });
	    }
	    function processSimpleCards(cards) {
	        expect(cards.items.length).toBe(2);
	        expectToBe(cards.pagination, {
	            pageNumber: 0,
	            pageCount: 1,
	            pageSize: 2
	        });
	        processCard(cards.items[0]);
	        expectToBe(cards.items[1], {
	            id: '3FB37388FC58076DEAD3DE282E075592A299B596',
	            owner: 'VOJTÍŠKOVÁ ANNA',
	            number: '451161XXXXXX1552'
	        });
	    }
	    function processCards(cards) {
	        var card = cards.items[0];
	        expectToBe(cards.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectToBe(card, {
	            id: 'A705433CFCD205249F4B816F2C63D309AEEFF4C9',
	            number: '451161XXXXXX7982',
	            alias: 'moje karta'
	        });
	        expectDate(card, {
	            expiryDate: '2017-11-30',
	            validFromDate: '2014-12-01',
	        });
	    }
	    function processStatements(statements) {
	        var statement = statements.items[0];
	        expectToBe(statements.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectDate(statement, {
	            statementDate: '2016-02-29T00:00:00+01:00'
	        });
	        expectToBe(statement, {
	            id: '06029392819b0198',
	            number: 2,
	            periodicity: 'MONTHLY',
	            language: 'cs'
	        });
	    }
	    describe('cards', function () {
	        it('retrieves a list of cards', function (done) {
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('tests pagination for cards list', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list.page0').then(function () {
	                return client.cards.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (cards) {
	                processCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.list.page1');
	            }).then(function () {
	                return response.nextPage();
	            }).then(function (cards) {
	                var card = cards.items[0];
	                expectToBe(cards.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1
	                });
	                expectToBe(card, {
	                    id: 'FAFBFBDCAE6465F6DB8058746A828E195922CB15',
	                    owner: 'VRBA ALEŠ',
	                    number: '451161XXXXXX6026',
	                    state: 'ACTIVE'
	                });
	                expectDate(card, {
	                    expiryDate: '2018-03-31',
	                    validFromDate: '2015-04-01'
	                });
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.list.page0');
	            }).then(function () {
	                return response.prevPage();
	            }).then(function (cards) {
	                processCards(cards);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves cards detail with a given id', function (done) {
	            judgeSession.setNextCase('cards.withId.get').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').get();
	            }).then(function (card) {
	                processCard(card);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves cards detail by using convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.get');
	            }).then(function () {
	                return response.items[0].get();
	            }).then(function (card) {
	                processCard(card);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates alias of a given card', function (done) {
	            judgeSession.setNextCase('cards.withId.update').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').update({
	                    alias: 'moje karta'
	                });
	            }).then(function (card) {
	                expectToBe(card, {
	                    id: '33A813886442D946122C78305EC4E482DE9F574D',
	                    number: '451161XXXXXX7982',
	                    alias: 'moje karta'
	                });
	                expectDate(card, {
	                    expiryDate: '2017-11-30',
	                    validFromDate: '2014-12-01'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates alias of a card by using convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.update');
	            }).then(function () {
	                return response.items[0].update({
	                    alias: 'moje karta'
	                });
	            }).then(function (card) {
	                expectToBe(card, {
	                    id: '33A813886442D946122C78305EC4E482DE9F574D',
	                    number: '451161XXXXXX7982',
	                    alias: 'moje karta'
	                });
	                expectDate(card, {
	                    expiryDate: '2017-11-30',
	                    validFromDate: '2014-12-01'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves current delivery settings for a given card', function (done) {
	            judgeSession.setNextCase('cards.withId.delivery.get').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').delivery.get();
	            }).then(function (delivery) {
	                expectToBe(delivery, {
	                    cardDeliveryMode: 'BRANCH',
	                    branchId: '1075',
	                });
	                expectToBe(delivery.address, {
	                    street: 'Antala Staška',
	                    buildingApartment: '1292',
	                    streetNumber: '32'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves current delivery settings of a card by using convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.delivery.get');
	            }).then(function () {
	                return response.items[0].delivery.get();
	            }).then(function (delivery) {
	                expectToBe(delivery, {
	                    cardDeliveryMode: 'BRANCH',
	                    branchId: '1075',
	                });
	                expectToBe(delivery.address, {
	                    street: 'Antala Staška',
	                    buildingApartment: '1292',
	                    streetNumber: '32'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates current delivery mode to branch', function (done) {
	            judgeSession.setNextCase('cards.withId.delivery.update').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').delivery.update({
	                    cardDeliveryMode: "BRANCH",
	                    confirmations: [
	                        {
	                            email: "john.doe@test.com",
	                            language: "cs"
	                        }
	                    ]
	                });
	            }).then(function (delivery) {
	                expectToBe(delivery, {
	                    cardDeliveryMode: 'BRANCH',
	                    branchId: '1075',
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates current delivery mode to branch by convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.delivery.update');
	            }).then(function () {
	                return response.items[0].delivery.update({
	                    cardDeliveryMode: "BRANCH",
	                    confirmations: [
	                        {
	                            email: "john.doe@test.com",
	                            language: "cs"
	                        }
	                    ]
	                });
	            }).then(function (delivery) {
	                expectToBe(delivery, {
	                    cardDeliveryMode: 'BRANCH',
	                    branchId: '1075',
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('changes personal note on a given transactions', function (done) {
	            judgeSession.setNextCase('cards.withId.transactions.withId.update').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transactions.withId('23498').update({
	                    note: "note",
	                    flags: [
	                        "hasStar"
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response.cardTransaction, {
	                    id: '23498',
	                    note: 'note'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('exports transactions into pdf', function (done) {
	            judgeSession.setNextCase('cards.withId.transactions.export').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transactions.export(exportTransactionsPayload);
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('exports transactions into pdf twice from same resource', function (done) {
	            var resource = client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transactions;
	            judgeSession.setNextCase('cards.withId.transactions.export').then(function () {
	                return resource.export(exportTransactionsPayload);
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                return judgeSession.setNextCase('cards.withId.transactions.export');
	            }).then(function () {
	                return resource.export(exportTransactionsPayload);
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('exports transactions into pdf by using convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.transactions.export');
	            }).then(function () {
	                return response.items[0].transactions.export({
	                    dateFrom: new Date(1999, 8, 27),
	                    dateTo: new Date(2000, 8, 27),
	                    fields: [
	                        'bookingDate',
	                        'partner',
	                        'amount',
	                        'currency'
	                    ],
	                    showAccountName: true,
	                    showAccountNumber: true,
	                    showTimespan: true,
	                    showBalance: true
	                });
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves limits of a card with a given id', function (done) {
	            judgeSession.setNextCase('cards.withId.limits.list').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').limits.list();
	            }).then(function (limits) {
	                expect(limits.items.length).toBe(3);
	                expectToBe(limits.items[0], {
	                    limitType: 'ATM',
	                    limitPeriod: '1D'
	                });
	                expectToBe(limits.items[0].limit, {
	                    value: 200000,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves limits of a card  by using convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.limits.list');
	            }).then(function () {
	                return response.items[0].limits.list();
	            }).then(function (limits) {
	                expectToBe(limits.items[0], {
	                    limitType: 'ATM',
	                    limitPeriod: '1D'
	                });
	                expectToBe(limits.items[0].limit, {
	                    value: 200000,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('actives card with a given id', function (done) {
	            judgeSession.setNextCase('cards.withId.actions.update').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').actions.update({
	                    action: 'ACTIVATE_CARD'
	                });
	            }).then(function (response) {
	                helpers_1.testStateOpen(response.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('actives card with a given id and signs the order', function (done) {
	            judgeSession.setNextCase('signing.tac.cards.actions.update').then(function () {
	                return client.cards.withId('3FB37388FC58076DEAD3DE282E075592A299B596').actions.update({
	                    action: 'ACTIVATE_CARD'
	                });
	            }).then(function (response) {
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(response);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('actives card by using convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.actions.update');
	            }).then(function () {
	                return response.items[0].actions.update({
	                    action: 'ACTIVATE_CARD'
	                });
	            }).then(function (response) {
	                helpers_1.testStateOpen(response.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('changes atm limit', function (done) {
	            judgeSession.setNextCase('cards.withId.limits.update').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').limits.update({
	                    limits: [
	                        {
	                            limitType: 'ATM',
	                            limitPeriod: '5D',
	                            limit: {
	                                value: 1100000,
	                                precision: 2,
	                                currency: 'CZK'
	                            }
	                        }
	                    ]
	                });
	            }).then(function (response) {
	                helpers_1.testStateOpen(response.signing);
	                expectToBe(response.limits[0], {
	                    limitType: 'ATM',
	                    limitPeriod: '1D'
	                });
	                expectToBe(response.limits[0].limit, {
	                    value: 1100000,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('changes cards limits and signs the order', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.cards.limits.update').then(function () {
	                return client.cards.withId('3FB37388FC58076DEAD3DE282E075592A299B596').limits.update({
	                    limits: [
	                        {
	                            limitType: "ATM",
	                            limitPeriod: "5D",
	                            limit: {
	                                value: 1100000,
	                                precision: 2,
	                                currency: "CZK"
	                            }
	                        }
	                    ]
	                });
	            }).then(function (response) {
	                info = response;
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(info.signing);
	                helpers_1.testAuthorizationTac(response);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(info.signing);
	                helpers_1.testStateDone(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        // it('changes cards limits and fails to sign the order with wrong authorizationType', done => {
	        //     var info;
	        //     judgeSession.setNextCase('signing.tac.cards.limits.update.authorizationType.invalid').then(() => {
	        //         return client.cards.withId('3FB37388FC58076DEAD3DE282E075592A299B596').limits.update({
	        //             limits: [
	        //                 {
	        //                     limitType: "ATM",
	        //                     limitPeriod: "5D",
	        //                     limit: {
	        //                         value: 1100000,
	        //                         precision: 2,
	        //                         currency: "CZK"
	        //                     }
	        //                 }
	        //             ]
	        //         });
	        //     }).then(response => {
	        //         info = response;
	        //         testStateOpen(response.signing);
	        //         return response.signing.getInfo();
	        //     }).then(response => {
	        //         testAuthorizationTac(response);
	        //         testAuthorizationTac(info.signing);
	        //         return response.startSigningWithCaseMobile();
	        //     }).catch(e => {
	        //         console.log('error', e)
	        //         expect(e.response.data.errors[0].error).toBe('FIELD_INVALID');
	        //         expect(e.response.data.errors[0].scope).toBe('authorizationType');
	        //         testStateOpen(info.signing);
	        //         done();
	        //     });
	        // });
	        it('changes cards limits and fails to sign the order with wrong password', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.cards.limits.update.OTP.invalid').then(function () {
	                return client.cards.withId('3FB37388FC58076DEAD3DE282E075592A299B596').limits.update({
	                    limits: [
	                        {
	                            limitType: "ATM",
	                            limitPeriod: "5D",
	                            limit: {
	                                value: 1100000,
	                                precision: 2,
	                                currency: "CZK"
	                            }
	                        }
	                    ]
	                });
	            }).then(function (response) {
	                info = response;
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(response);
	                helpers_1.testAuthorizationTac(info.signing);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('12345678');
	            }).catch(function (e) {
	                expect(e.response.data.errors[0].error).toBe('OTP_INVALID');
	                helpers_1.testStateOpen(info.signing);
	                done();
	            });
	        });
	        it('retrieves 3D secure info', function (done) {
	            judgeSession.setNextCase('cards.withId.secure3D.get').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').secure3d.get();
	            }).then(function (settings) {
	                expectToBe(settings, {
	                    status: 'OK',
	                    phoneNumber: '+420739473460',
	                    language: 'cs'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves 3D secure info by convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.secure3D.get');
	            }).then(function () {
	                return response.items[0].secure3d.get();
	            }).then(function (settings) {
	                expectToBe(settings, {
	                    status: 'OK',
	                    phoneNumber: '+420739473460',
	                    language: 'cs'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('pays up a credit card debt', function (done) {
	            judgeSession.setNextCase('cards.withId.transfers.update').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').transfer.update({
	                    type: "DEBT_REPAYMENT",
	                    sender: {
	                        accountno: {
	                            number: "2326573123",
	                            bankCode: "0800"
	                        }
	                    },
	                    amount: {
	                        value: 500000,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (response) {
	                helpers_1.testStateOpen(response.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('pays up a credit card debt by convenience method', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.transfers.update');
	            }).then(function () {
	                return response.items[0].transfer.update({
	                    type: "DEBT_REPAYMENT",
	                    sender: {
	                        accountno: {
	                            number: "2326573123",
	                            bankCode: "0800"
	                        }
	                    },
	                    amount: {
	                        value: 500000,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (card) {
	                helpers_1.testStateOpen(card.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('pays up a credit card debt and signs the order', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.cards.transfer.update').then(function () {
	                return client.cards.withId('3FB37388FC58076DEAD3DE282E075592A299B596').transfer.update({
	                    type: "DEBT_REPAYMENT",
	                    sender: {
	                        accountno: {
	                            number: "2326573123",
	                            bankCode: "0800"
	                        }
	                    },
	                    amount: {
	                        value: 500000,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (response) {
	                info = response;
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(response);
	                helpers_1.testAuthorizationTac(info.signing);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(info.signing);
	                helpers_1.testStateDone(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves list of statements of cards account', function (done) {
	            judgeSession.setNextCase('cards.withId.accounts.withId.statements.list').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
	                    sort: ['statementDate'],
	                    order: ['asc'],
	                    pageNumber: null,
	                    pageSize: null
	                });
	            }).then(function (statements) {
	                var statement = statements.items[0];
	                expect(statements.items.length).toBe(1);
	                expectDate(statement, {
	                    statementDate: '2016-02-29T00:00:00+01:00'
	                });
	                expectToBe(statements.pagination, {
	                    pageNumber: 0,
	                    pageCount: 1,
	                    pageSize: 1,
	                });
	                expectToBe(statement, {
	                    id: '06029392819b0198',
	                    number: 2,
	                    periodicity: 'MONTHLY',
	                    format: 'PDF_A4',
	                    language: 'cs'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves list of statements of cards account by convenience method on cards listing', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.list').then(function () {
	                return client.cards.list({
	                    pageNumber: null,
	                    pageSize: null,
	                    sort: [
	                        'id',
	                        'product'
	                    ],
	                    order: [
	                        'asc',
	                        'desc'
	                    ]
	                });
	            }).then(function (cards) {
	                processSimpleCards(cards);
	                response = cards;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.accounts.withId.statements.list');
	            }).then(function () {
	                return response.items[0].accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
	                    sort: ['statementDate'],
	                    order: ['asc'],
	                    pageNumber: null,
	                    pageSize: null
	                });
	            }).then(function (statements) {
	                var statement = statements.items[0];
	                expect(statements.items.length).toBe(1);
	                expectDate(statement, {
	                    statementDate: '2016-02-29T00:00:00+01:00'
	                });
	                expectToBe(statements.pagination, {
	                    pageNumber: 0,
	                    pageCount: 1,
	                    pageSize: 1,
	                });
	                expectToBe(statement, {
	                    id: '06029392819b0198',
	                    number: 2,
	                    periodicity: 'MONTHLY',
	                    format: 'PDF_A4',
	                    language: 'cs'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('tests pagination for statements', function (done) {
	            var response;
	            judgeSession.setNextCase('cards.withId.accounts.withId.statements.list.page0').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (statements) {
	                processStatements(statements);
	                response = statements;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.accounts.withId.statements.list.page1');
	            }).then(function () {
	                return response.nextPage();
	            }).then(function (statements) {
	                var statement = statements.items[0];
	                expectToBe(statements.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1
	                });
	                expectDate(statement, {
	                    statementDate: '2016-01-29T00:00:00+01:00'
	                });
	                expectToBe(statement, {
	                    id: '96029392819b0198',
	                    number: 8,
	                    periodicity: 'MONTHLY',
	                    language: 'cs'
	                });
	                response = statements;
	            }).then(function () {
	                return judgeSession.setNextCase('cards.withId.accounts.withId.statements.list.page0');
	            }).then(function () {
	                return response.prevPage();
	            }).then(function (statements) {
	                processStatements(statements);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('downloads list of statements of cards account', function (done) {
	            judgeSession.setNextCase('cards.withId.accounts.withId.statements.download').then(function () {
	                return client.cards.withId('33A813886442D946122C78305EC4E482DE9F574D').accounts.withId('076E1DBCCCD38729A99D93AC8D3E8273237C7E36').statements.download({
	                    format: 'PDF_A4',
	                    statementId: '06029392819b0198'
	                });
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function testContacts(response) {
	        expectToBe(response, {
	            id: 'postaladdresspermanent',
	            type: 'ADDRESS',
	        });
	        expectToBe(response.address, {
	            type: 'PERMANENT_RESIDENCE',
	            typeI18N: 'Trvalá adresa',
	            street: 'Pod Václavem'
	        });
	        expect(response.flags[0]).toBe('mainContact');
	    }
	    describe('contacts', function () {
	        it('retrieves list of contacts', function (done) {
	            judgeSession.setNextCase('contacts.list').then(function () {
	                return client.contacts.list();
	            }).then(function (response) {
	                testContacts(response.items[0]);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves contact with a given id', function (done) {
	            judgeSession.setNextCase('contacts.withId.get').then(function () {
	                return client.contacts.withId('postaladdresspermanent').get();
	            }).then(function (response) {
	                testContacts(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function processBuildings(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageSize: 1,
	            pageCount: 2,
	            nextPage: 1,
	        });
	        expectToBe(response.items[0], {
	            id: 'BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79',
	            type: 'BUILD_SAVING',
	            product: '280',
	        });
	        expect(response.items[0].contractHolders[0]).toBe('Hana Bielčíková');
	    }
	    function testBuildingsConvenienceMethods(response) {
	        expect(response.get).toBeDefined();
	        expect(response.update).toBeDefined();
	        expect(response.services).toBeDefined();
	        expect(response.transactions).toBeDefined();
	    }
	    describe('buildings contracts', function () {
	        it('tests pagination for listing buildings contracts', function (done) {
	            judgeSession.setNextCase('contracts.buildings.list.pagination').then(function () {
	                return client.contracts.buildings.list({
	                    pageNumber: 0,
	                    pageSize: 1,
	                });
	            }).then(function (response) {
	                processBuildings(response);
	                testBuildingsConvenienceMethods(response.items[0]);
	                return response.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageSize: 1,
	                    pageCount: 2,
	                });
	                return response.prevPage();
	            }).then(function (response) {
	                processBuildings(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves detail of a buildings contract with a given id', function (done) {
	            judgeSession.setNextCase('contracts.buildings.withId.get').then(function () {
	                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: 'BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79',
	                    type: 'BUILD_SAVING',
	                    product: '280',
	                });
	                expect(response.contractHolders[0]).toBe('Hana Bielčíková');
	                testBuildingsConvenienceMethods(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates building contract with a given id', function (done) {
	            judgeSession.setNextCase('contracts.buildings.withId.update').then(function () {
	                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').update({
	                    alias: 'test alias'
	                });
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: 'BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79',
	                    alias: 'test alias',
	                    product: '280',
	                });
	                testBuildingsConvenienceMethods(response);
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves list of services', function (done) {
	            judgeSession.setNextCase('contracts.buildings.withId.services.list').then(function () {
	                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').services.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 0,
	                    pageCount: 1,
	                    pageSize: 1
	                });
	                expectToBe(response.items[0], {
	                    id: 's54sdf756dfhm52879sdf23xd8744Fsdf5',
	                    nameI18N: 'Uver k stavebnimu sporeni',
	                    iconGroup: 'DEFAULT',
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates transaction with a given id', function (done) {
	            judgeSession.setNextCase('contracts.buildings.withId.transactions.withId.update').then(function () {
	                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').transactions.withId('JHJKLASDHKALD12321').update({
	                    note: "New client's personal note for transaction",
	                    flags: [
	                        'hasStar'
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response.transaction, {
	                    id: 'JHJKLASDHKALD12321',
	                    note: "New client's personal note for transaction",
	                });
	                expect(response.transaction.flags[0]).toBe('hasNote');
	                expect(response.transaction.flags[1]).toBe('hasStar');
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('exports transactions', function (done) {
	            judgeSession.setNextCase('contracts.buildings.withId.transactions.export').then(function () {
	                return client.contracts.buildings.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').transactions.export(helpers_1.exportTransactionsPayload);
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function processContracts(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1,
	        });
	        expectToBe(response.items[0], {
	            id: '3961D3F9E922EEE93E2581E896B34566645FE7E3',
	            type: 'LIFE',
	            insurancePolicyHolder: 'Hana Bielčíková',
	            policyNumber: '7009689942'
	        });
	        expectDate(response.items[0].life, {
	            contractEndDate: '2046-12-31',
	            contractStartDate: '2015-01-01',
	            lastPremiumDate: '2015-01-15',
	            contractTerminationDate: '0999-12-31',
	        });
	    }
	    function testInsuranceConvenienceMethods(response) {
	        expect(response.get).toBeDefined();
	        expect(response.update).toBeDefined();
	        expect(response.funds).toBeDefined();
	        expect(response.beneficiaries).toBeDefined();
	        expect(response.insurees).toBeDefined();
	        expect(response.payments).toBeDefined();
	        expect(response.services).toBeDefined();
	        expect(response.events).toBeDefined();
	        expect(response.taxBenefits).toBeDefined();
	        expect(response.strategies).toBeDefined();
	        expect(response.transfer).toBeDefined();
	    }
	    describe('insurance contracts', function () {
	        it('tests pagination', function (done) {
	            judgeSession.setNextCase('contracts.insurances.list.pagination').then(function () {
	                return client.contracts.insurances.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                processContracts(response);
	                testInsuranceConvenienceMethods(response.items[0]);
	                return response.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1,
	                });
	                expectToBe(response.items[0], {
	                    id: '9B070F9C66A91D55A5D4E31F47B147444E651D36',
	                    type: 'LIFE',
	                    insurancePolicyHolder: 'Hana Bielčíková',
	                    policyNumber: '5530446061'
	                });
	                expectDate(response.items[0].life, {
	                    contractEndDate: '2033-01-31',
	                    contractStartDate: '2011-02-01',
	                    lastPremiumDate: '2011-02-15',
	                    contractTerminationDate: '0999-12-31',
	                });
	                testInsuranceConvenienceMethods(response.items[0]);
	                return response.prevPage();
	            }).then(function (response) {
	                processContracts(response);
	                testInsuranceConvenienceMethods(response.items[0]);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves detail', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.get').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '3961D3F9E922EEE93E2581E896B34566645FE7E3',
	                    type: 'LIFE',
	                    insurancePolicyHolder: 'Hana Bielčíková',
	                    policyNumber: '7009689942',
	                    status: 'ACTIVE'
	                });
	                expectDate(response.life, {
	                    contractEndDate: '2046-12-31',
	                    contractStartDate: '2015-01-01',
	                    premiumLastPaid: '2015-12-15',
	                });
	                testInsuranceConvenienceMethods(response);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates insurance', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.update').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').update({
	                    alias: 'test alias'
	                });
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '3961D3F9E922EEE93E2581E896B34566645FE7E3',
	                    type: 'LIFE',
	                    product: '264',
	                    productI18N: 'Pojištění FLEXI',
	                    alias: 'test alias',
	                    insurancePolicyHolder: 'Hana Bielčíková',
	                    policyNumber: '7009689942',
	                });
	                expectDate(response.life, {
	                    contractEndDate: '2046-12-31',
	                    contractStartDate: '2015-01-01',
	                    lastPremiumDate: '2015-01-15',
	                    contractTerminationDate: '0999-12-31',
	                });
	                testInsuranceConvenienceMethods(response);
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves funds', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.funds.get').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').funds.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    code: '24',
	                    name: 'Garantovaný fond pro běžné pojistné',
	                    investedShare: 0,
	                    allocation: 100
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates funds', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.funds.update').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').funds.update({
	                    funds: [
	                        {
	                            code: '31',
	                            allocation: 35
	                        },
	                        {
	                            code: '32',
	                            allocation: 65
	                        }
	                    ],
	                    investmentProgram: 'INVESTMENT_MANAGEMENT'
	                });
	            }).then(function (response) {
	                expectToBe(response.funds[0], {
	                    code: '31',
	                    allocation: 35
	                });
	                expectToBe(response.funds[1], {
	                    code: '32',
	                    allocation: 65
	                });
	                expect(response.investmentProgram).toBe('INVESTMENT_MANAGEMENT');
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('signs funds update', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.contracts.insurances.withId.funds.update').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').funds.update({
	                    funds: [
	                        {
	                            code: '31',
	                            allocation: 35
	                        },
	                        {
	                            code: '32',
	                            allocation: 65
	                        }
	                    ],
	                    investmentProgram: 'INVESTMENT_MANAGEMENT'
	                });
	            }).then(function (response) {
	                expectToBe(response.funds[0], {
	                    code: '31',
	                    allocation: 35
	                });
	                expectToBe(response.funds[1], {
	                    code: '32',
	                    allocation: 65
	                });
	                expect(response.investmentProgram).toBe('INVESTMENT_MANAGEMENT');
	                helpers_1.testStateOpen(response.signing);
	                info = response;
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                helpers_1.testStateOpen(response);
	                helpers_1.testAuthorizationTac(response);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(info.signing);
	                helpers_1.testStateDone(response);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves beneficiaries', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.beneficiaries.get').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').beneficiaries.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    type: 'PERSON',
	                    name: 'Bielčik Tomáš',
	                    percentage: 50,
	                });
	                expectDate(response.items[0], {
	                    birthdate: '2003-09-10'
	                });
	                expectDate(response.items[1], {
	                    birthdate: '2008-06-09'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates beneficiaries', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.beneficiaries.update').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').beneficiaries.update({
	                    beneficiaries: [
	                        {
	                            type: 'PERSON',
	                            name: 'Mgr. Rudolf Mrazek',
	                            birthdate: new Date('1978-01-18'),
	                            percentage: 20
	                        },
	                        {
	                            type: 'PERSON',
	                            name: 'Bielčik Tomáš',
	                            birthdate: new Date('2003-09-10'),
	                            percentage: 40
	                        },
	                        {
	                            type: 'PERSON',
	                            name: 'Bielčiková Eliška',
	                            birthdate: new Date('2008-06-09'),
	                            percentage: 40
	                        }
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response.beneficiaries[0], {
	                    type: 'PERSON',
	                    name: 'Mgr. Rudolf Mrazek',
	                    percentage: 20
	                });
	                expectDate(response.beneficiaries[0], {
	                    birthdate: '1978-01-18'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves insurees', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.insurees.list').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').insurees.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    id: '78afefe2d55e124cbd4a1bbfa1a1bbb0b1ec5bc8b434a2a17703ea6c6d597092',
	                    type: 'POLICYHOLDER',
	                    name: 'Hana Bielčíková'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves payments', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.payments.list').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').payments.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    id: '33',
	                    type: 'FUTURE'
	                });
	                expectDate(response.items[0], {
	                    instructionFrom: '2016-09-01',
	                    instructionTo: '2016-09-30'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves services', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.services.list').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').services.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    id: '1',
	                    group: 'RISK_SPORTS',
	                    iconGroup: 'RISK_SPORTS',
	                    availableDays: 30
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('activates risk sports', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.services.activateRiskSports').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').services.activateRiskSports({
	                    dateFrom: new Date('2016-08-16'),
	                    dateTo: new Date('2016-08-20'),
	                    phoneNumber: '602123456'
	                });
	            }).then(function (response) {
	                expectToBe(response, {
	                    policyNumber: '7009689942',
	                    phoneNumber: '602123456'
	                });
	                expectDate(response, {
	                    dateFrom: '2016-08-16',
	                    dateTo: '2016-08-20',
	                });
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('deactivates risk sports', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.services.deactivateRiskSports').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').services.deactivateRiskSports({
	                    dateFrom: new Date('2016-08-16'),
	                    dateTo: new Date('2016-08-20'),
	                    phoneNumber: '602123456'
	                });
	            }).then(function (response) {
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves events', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.events.list').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').events.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    number: '13344534534',
	                    state: 'CLOSED',
	                    substate: 'Odesláno pojistné plnění'
	                });
	                expectDate(response.items[0], {
	                    substateDate: '2015-10-14',
	                    processingDate: '2015-03-02',
	                });
	                response.items[0].indemnities.forEach(function (x) {
	                    expectDate(x, {
	                        paymentDate: '2015-10-14',
	                    });
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves tax benefits', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.taxBenefits.get').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').taxBenefits.get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    recommendedDepositText: 'za předpokladu doplacení 4 splátek po 600 Kč v roce 2016',
	                });
	                expectToBe(response.taxDeductiblePremium, {
	                    value: 29000,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves strategies', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.strategies.list').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').strategies.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    type: 'ACTUAL_SETTING',
	                    group: 'STRATEGY'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates transfer', function (done) {
	            judgeSession.setNextCase('contracts.insurances.withId.transfer.update').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').transfer.update({
	                    type: 'PAY_PREMIUM',
	                    amount: {
	                        value: 1500,
	                        precision: 2,
	                        currency: 'CZK'
	                    },
	                    sender: {
	                        number: '2723000003',
	                        bankCode: '0800'
	                    }
	                });
	            }).then(function (response) {
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates transfer and signs it', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.contracts.insurances.withId.transfer.update').then(function () {
	                return client.contracts.insurances.withId('3961D3F9E922EEE93E2581E896B34566645FE7E3').transfer.update({
	                    type: 'PAY_PREMIUM',
	                    amount: {
	                        value: 1500,
	                        precision: 2,
	                        currency: 'CZK'
	                    },
	                    sender: {
	                        number: '2723000003',
	                        bankCode: '0800'
	                    }
	                });
	            }).then(function (response) {
	                helpers_1.testStateOpen(response.signing);
	                info = response;
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                helpers_1.testStateOpen(response);
	                helpers_1.testAuthorizationTac(response);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(info.signing);
	                helpers_1.testStateDone(response);
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('loyalty contracts', function () {
	        it('retrieves loyalty', function (done) {
	            judgeSession.setNextCase('contracts.loyalty.get').then(function () {
	                return client.contracts.loyalty.get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    state: 'UNREGISTERED',
	                    pointsCount: 0,
	                    activationCode: '15B8FE1760'
	                });
	                expectDate(response, {
	                    exportDate: '2016-05-31T00:00:00+02:00'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function testPensionConvenienceMethods(response) {
	        expect(response.get).toBeDefined();
	        expect(response.update).toBeDefined();
	        expect(response.transactions).toBeDefined();
	    }
	    function processPensions(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageSize: 1,
	            pageCount: 2,
	            nextPage: 1
	        });
	        expectToBe(response.items[0], {
	            owner: 'Hana Bielčíková',
	            id: 'E7DD68AA3FF4487AF75626F901761B071E72FFFC',
	            birthNumber: '8152152602'
	        });
	        expectDate(response.items[0], {
	            validFrom: '2015-12-01',
	        });
	        expectDate(response.items[0].beneficiaries[0], {
	            birthDate: '2008-06-09'
	        });
	        expectDate(response.items[0].beneficiaries[1], {
	            birthDate: '2003-09-10'
	        });
	    }
	    function processPensionDetail(response) {
	        expectToBe(response, {
	            owner: 'Hana Bielčíková',
	            id: 'E7DD68AA3FF4487AF75626F901761B071E72FFFC',
	            birthNumber: '8152152602'
	        });
	        expectDate(response, {
	            validFrom: '2015-12-01',
	        });
	        expectDate(response.beneficiaries[0], {
	            birthDate: '2008-06-09',
	        });
	        expectDate(response.beneficiaries[1], {
	            birthDate: '2003-09-10',
	        });
	    }
	    describe('pensions contracts', function () {
	        it('tests pagination', function (done) {
	            judgeSession.setNextCase('contracts.pensions.list.pagination').then(function () {
	                return client.contracts.pensions.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                processPensions(response);
	                testPensionConvenienceMethods(response.items[0]);
	                return response.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageSize: 1,
	                    pageCount: 2,
	                });
	                expectToBe(response.items[0], {
	                    owner: 'Hana Bielčíková',
	                    id: 'E7DD68AA3FF4287AF75626F901761B071E72FFFC',
	                    birthNumber: '8152152602'
	                });
	                expectDate(response.items[0], {
	                    validFrom: '2015-12-01',
	                });
	                expectDate(response.items[0].beneficiaries[0], {
	                    birthDate: '2008-06-09'
	                });
	                expectDate(response.items[0].beneficiaries[1], {
	                    birthDate: '2003-09-10'
	                });
	                testPensionConvenienceMethods(response.items[0]);
	                return response.prevPage();
	            }).then(function (response) {
	                processPensions(response);
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	    it('retrives detail through convenience method', function (done) {
	        var list;
	        judgeSession.setNextCase('contracts.pensions.list').then(function () {
	            return client.contracts.pensions.list({
	                pageNumber: 0,
	                pageSize: 1
	            });
	        }).then(function (response) {
	            processPensions(response);
	            list = response;
	            return judgeSession.setNextCase('contracts.pensions.withId.get');
	        }).then(function () {
	            return list.items[0].get();
	        }).then(function (response) {
	            processPensionDetail(response);
	            done();
	        }).catch(logJudgeError);
	    });
	    it('retrives detail', function (done) {
	        judgeSession.setNextCase('contracts.pensions.withId.get').then(function () {
	            return client.contracts.pensions.withId('E7DD68AA3FF4487AF75626F901761B071E72FFFC').get();
	        }).then(function (response) {
	            processPensionDetail(response);
	            testPensionConvenienceMethods(response);
	            done();
	        }).catch(logJudgeError);
	    });
	    it('updates pension', function (done) {
	        judgeSession.setNextCase('contracts.pensions.withId.update').then(function () {
	            return client.contracts.pensions.withId('E7DD68AA3FF4487AF75626F901761B071E72FFFC').update({
	                alias: 'test alias'
	            });
	        }).then(function (response) {
	            expectToBe(response, {
	                owner: 'Hana Bielčíková',
	                id: 'E7DD68AA3FF4487AF75626F901761B071E72FFFC',
	                birthNumber: '8152152602',
	                alias: 'test alias'
	            });
	            expectDate(response, {
	                validFrom: '2015-12-01',
	            });
	            expectDate(response.beneficiaries[0], {
	                birthDate: '2008-06-09',
	            });
	            expectDate(response.beneficiaries[1], {
	                birthDate: '2003-09-10',
	            });
	            testPensionConvenienceMethods(response);
	            expect(response.signing).toBeDefined();
	            done();
	        }).catch(logJudgeError);
	    });
	    it('updates pension through convenience method', function (done) {
	        var list;
	        judgeSession.setNextCase('contracts.pensions.list').then(function () {
	            return client.contracts.pensions.list({
	                pageNumber: 0,
	                pageSize: 1
	            });
	        }).then(function (response) {
	            processPensions(response);
	            list = response;
	            return judgeSession.setNextCase('contracts.pensions.withId.update');
	        }).then(function () {
	            return list.items[0].update({
	                alias: 'test alias'
	            });
	        }).then(function (response) {
	            processPensionDetail(response);
	            done();
	        }).catch(logJudgeError);
	    });
	    it('updates transaction', function (done) {
	        judgeSession.setNextCase('contracts.pensions.withId.transactions.withId.update').then(function () {
	            return client.contracts.pensions.withId('E7DD68AA3FF4487AF75626F901761B071E72FFFC').transactions.withId('ADAD9879ADKJH9713').update({
	                note: "New client's personal note for transaction",
	                flags: [
	                    'hasStar'
	                ]
	            });
	        }).then(function (response) {
	            expectToBe(response.transaction, {
	                id: 'ADAD9879ADKJH9713',
	                note: "New client's personal note for transaction"
	            });
	            expect(response.signing).toBeDefined();
	            done();
	        }).catch(logJudgeError);
	    });
	    it('exports transactions', function (done) {
	        judgeSession.setNextCase('contracts.pensions.withId.transactions.export').then(function () {
	            return client.contracts.pensions.withId('BCEF6B001FAE755D163A6CC9475E9FDFD9CD4A79').transactions.export(helpers_1.exportTransactionsPayload);
	        }).then(function (response) {
	            helpers_1.testFile(response);
	            done();
	        }).catch(logJudgeError);
	    });
	});


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('goals', function () {
	        it('retrieves list of goals', function (done) {
	            judgeSession.setNextCase('goals.list').then(function () {
	                return client.goals.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    name: 'Dovolená',
	                    completed: false,
	                    deadline: null
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates goals', function (done) {
	            judgeSession.setNextCase('goals.update').then(function () {
	                return client.goals.update({
	                    goals: [
	                        {
	                            name: 'Auto',
	                            price: {
	                                value: 4000,
	                                precision: 2,
	                                currency: 'CZK'
	                            },
	                            deadline: new Date(1445554800000),
	                            completed: false
	                        }
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response.goals[0], {
	                    name: 'Auto',
	                    completed: false
	                });
	                expect(response.goals[0].deadline.getTime()).toBe(1445554800000);
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function testMessages(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageCount: 5,
	            nextPage: 1,
	            pageSize: 1
	        });
	        expectToBe(response.items[0], {
	            id: '134625',
	            from: 'WCM',
	            subject: 'test attach'
	        });
	        expectDate(response.items[0], {
	            date: '2016-04-08T09:20:32+02:00'
	        });
	        expect(response.items[0].get).toBeDefined();
	        expect(response.items[0].update).toBeDefined();
	        expect(response.items[0].delete).toBeDefined();
	        expect(response.items[0].attachments).toBeDefined();
	    }
	    describe('messages', function () {
	        it('tests pagination', function (done) {
	            judgeSession.setNextCase('messages.pagination').then(function () {
	                return client.messages.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                testMessages(response);
	                return response.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageCount: 5,
	                    nextPage: 2,
	                    pageSize: 1
	                });
	                expectToBe(response.items[0], {
	                    id: '278583',
	                    from: 'WCM',
	                    subject: 'Pozor - evidence dluhu na Vašem úvěrovém případně osobním účtu! Hrozí naúčtování poplatků'
	                });
	                expectDate(response.items[0], {
	                    date: '2016-04-27T08:20:32+02:00'
	                });
	                expect(response.items[0].get).toBeDefined();
	                expect(response.items[0].update).toBeDefined();
	                expect(response.items[0].delete).toBeDefined();
	                return response.prevPage();
	            }).then(function (response) {
	                testMessages(response);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves message detail', function (done) {
	            judgeSession.setNextCase('messages.withId.get').then(function () {
	                return client.messages.withId('134625').get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '134625',
	                    from: 'WCM',
	                    subject: 'test attach'
	                });
	                expectDate(response, {
	                    date: '2016-04-08T09:20:32+02:00'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates message detail', function (done) {
	            judgeSession.setNextCase('messages.withId.update').then(function () {
	                return client.messages.withId('134625').update({
	                    read: true
	                });
	            }).then(function (response) {
	                done();
	            }).catch(logJudgeError);
	        });
	        it('deletes message', function (done) {
	            judgeSession.setNextCase('messages.withId.delete').then(function () {
	                return client.messages.withId('134625').delete();
	            }).then(function (response) {
	                done();
	            }).catch(logJudgeError);
	        });
	        it('downloads attachment file', function (done) {
	            judgeSession.setNextCase('messages.withId.attachments.withId.download').then(function () {
	                return client.messages.withId('1421721').attachments.withId('palec.png').download();
	            }).then(function (response) {
	                expect(response).toBeTruthy();
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves list of mandatory messages', function (done) {
	            judgeSession.setNextCase('messages.mandatory.list').then(function () {
	                return client.messages.mandatory.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    id: '278583',
	                    from: 'WCM',
	                    subject: 'Pozor - evidence dluhu na Vašem úvěrovém případně osobním účtu! Hrozí naúčtování poplatků'
	                });
	                expectDate(response.items[0], {
	                    date: '2016-04-27T08:20:32+02:00'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    var bookingDatePayload = {
	        accountId: '4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE',
	        receiver: {
	            number: '123-123',
	            bankCode: '0100',
	            countryCode: 'CZ'
	        },
	        priority: 'STANDARD'
	    };
	    var mobilePaymentPayload = {
	        paymentType: 'VODAFONE_PAYMENT',
	        phoneNumber: '777952341',
	        sender: {
	            iban: 'CZ1208000000002059930033',
	            bic: 'GIBACZPX',
	            number: '2059930033',
	            bankCode: '0800',
	            countryCode: 'CZ'
	        },
	        amount: {
	            value: 3000,
	            precision: 0,
	            currency: 'CZK'
	        },
	        confirmationPhoneNumber: '777952341'
	    };
	    function processMobilePayment(response) {
	        expectToBe(response, {
	            paymentType: 'VODAFONE_PAYMENT',
	            phoneNumber: '777952341'
	        });
	        helpers_1.testStateOpen(response.signing);
	    }
	    function processPayment(payment) {
	        expectDate(payment, {
	            executionDate: '2016-03-20T00:00:00+01:00',
	            modificationDate: '2016-03-20T18:16:04+01:00',
	            transferDate: '2016-03-21'
	        });
	        expectToBe(payment, {
	            id: '1023464260',
	            orderCategory: 'OWN_TRANSFER',
	            senderName: 'Aleš Vrba',
	            receiverName: 'Vrba Aleš'
	        });
	        helpers_1.testStateOpen(payment.signing);
	    }
	    describe('payments', function () {
	        it('retrieves list of payments', function (done) {
	            judgeSession.setNextCase('payments.list').then(function () {
	                return client.orders.payments.list({
	                    sort: ['transferDate'],
	                    order: ['asc'],
	                    pageNumber: null,
	                    pageSize: null
	                });
	            }).then(function (payments) {
	                expectToBe(payments.pagination, {
	                    pageNumber: 0,
	                    pageCount: 1,
	                    pageSize: 2
	                });
	                processPayment(payments.items[0]);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('tests pagination', function (done) {
	            var response;
	            judgeSession.setNextCase('payments.list.page0').then(function () {
	                return client.orders.payments.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (payments) {
	                var payment = payments.items[0];
	                expectToBe(payments.pagination, {
	                    pageNumber: 0,
	                    pageCount: 7,
	                    pageSize: 1,
	                    nextPage: 1
	                });
	                expectToBe(payment, {
	                    id: '1154226597',
	                    senderName: 'Vrba'
	                });
	                expectDate(payment, {
	                    executionDate: '2016-03-21T00:00:00+01:00',
	                    modificationDate: '2016-03-21T10:33:41+01:00',
	                    transferDate: '2016-03-23'
	                });
	                helpers_1.testStateOpen(payment.signing);
	                response = payments;
	            }).then(function () {
	                return judgeSession.setNextCase('payments.list.page1');
	            }).then(function () {
	                return response.nextPage();
	            }).then(function (payments) {
	                var payment = payments.items[0];
	                expectToBe(payments.pagination, {
	                    pageNumber: 1,
	                    pageCount: 7,
	                    pageSize: 1,
	                    nextPage: 2
	                });
	                expectToBe(payment, {
	                    id: 'T4B2F9EBE742BCAE1E98A78E12F6FBC62464A74EE_1XZ1XZO5o0VZB',
	                    state: 'CLOSED',
	                    stateDetail: 'FIN',
	                    stateOk: true
	                });
	                expectDate(payment, {
	                    executionDate: '2016-03-22T00:00:00+01:00',
	                    transferDate: '2016-03-22',
	                });
	                expect(payment.signing.state).toBe('NONE');
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves payment with a given id', function (done) {
	            judgeSession.setNextCase('payments.withId.get').then(function () {
	                return client.orders.payments.withId('1023464260').get();
	            }).then(function (payment) {
	                processPayment(payment);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('removes payment with a given id', function (done) {
	            judgeSession.setNextCase('payments.withId.delete').then(function () {
	                return client.orders.payments.withId('1023464260').delete();
	            }).then(function (response) {
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves currently available booking date', function (done) {
	            judgeSession.setNextCase('payments.bookingDate.update').then(function () {
	                return client.orders.payments.bookingDate.update(bookingDatePayload);
	            }).then(function (response) {
	                expectDate(response, {
	                    bookingDate: '2016-03-21T00:00:00+01:00'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves currently available booking date twice from same resource', function (done) {
	            var resource = client.orders.payments.bookingDate;
	            judgeSession.setNextCase('payments.bookingDate.update').then(function () {
	                return resource.update(bookingDatePayload);
	            }).then(function (response) {
	                expectDate(response, {
	                    bookingDate: '2016-03-21T00:00:00+01:00'
	                });
	                return judgeSession.setNextCase('payments.bookingDate.update');
	            }).then(function () {
	                return resource.update(bookingDatePayload);
	            }).then(function (response) {
	                expectDate(response, {
	                    bookingDate: '2016-03-21T00:00:00+01:00'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('creates a domestic payment', function (done) {
	            judgeSession.setNextCase('payments.domestic.create').then(function () {
	                return client.orders.payments.domestic.create({
	                    senderName: "Vrba",
	                    sender: {
	                        number: "2059930033",
	                        bankCode: "0800"
	                    },
	                    receiverName: "Vojtíšková",
	                    receiver: {
	                        number: "2328489013",
	                        bankCode: "0800"
	                    },
	                    amount: {
	                        value: 110,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (response) {
	                expectDate(response, {
	                    executionDate: '2016-03-21T00:00:00+01:00',
	                    modificationDate: '2016-03-21T10:30:54+01:00',
	                    transferDate: '2016-03-21'
	                });
	                expectToBe(response, {
	                    id: '1154226597',
	                    receiverName: 'Vojtíšková',
	                    senderName: 'Vrba',
	                    stateOk: true
	                });
	                expectToBe(response.amount, {
	                    value: 110,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                expectToBe(response.sender, {
	                    number: '2059930033',
	                    bankCode: '0800',
	                    countryCode: 'CZ'
	                });
	                expectToBe(response.receiver, {
	                    number: '2328489013',
	                    bankCode: '0800',
	                    countryCode: 'CZ'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('creates domestic payment and signs the order', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.payments.domestic.create').then(function () {
	                return client.orders.payments.domestic.create({
	                    senderName: "Vrba",
	                    sender: {
	                        number: "2328489013",
	                        bankCode: "0800"
	                    },
	                    receiverName: "Vojtíšková",
	                    receiver: {
	                        number: "2059930033",
	                        bankCode: "0800"
	                    },
	                    amount: {
	                        value: 110,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (response) {
	                info = response;
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(response);
	                helpers_1.testAuthorizationTac(info.signing);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(response);
	                helpers_1.testStateDone(info.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates domestic payment', function (done) {
	            judgeSession.setNextCase('payments.domestic.update').then(function () {
	                return client.orders.payments.domestic.withId('1154226597').update({
	                    senderName: "Vrba",
	                    sender: {
	                        number: "2059930033",
	                        bankCode: "0800"
	                    },
	                    receiverName: "Vojtíšková Alena",
	                    receiver: {
	                        number: "2328489013",
	                        bankCode: "0800"
	                    },
	                    amount: {
	                        value: 110,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (response) {
	                expectDate(response, {
	                    transferDate: '2016-03-21',
	                    modificationDate: '2016-03-21T10:33:41+01:00',
	                    executionDate: '2016-03-21T00:00:00+01:00'
	                });
	                expectToBe(response, {
	                    id: '1154226597',
	                    senderName: 'Vrba',
	                    receiverName: 'Vojtíšková Alena'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates domestic payment and signs the order', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.payments.domestic.withId.update').then(function () {
	                return client.orders.payments.domestic.withId('160429968927553').update({
	                    senderName: "Vrba",
	                    sender: {
	                        number: "2059930033",
	                        bankCode: "0800"
	                    },
	                    receiverName: "Vojtíšková Alena",
	                    receiver: {
	                        number: "2328489013",
	                        bankCode: "0800"
	                    },
	                    amount: {
	                        value: 110,
	                        precision: 2,
	                        currency: "CZK"
	                    }
	                });
	            }).then(function (response) {
	                info = response;
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(response);
	                helpers_1.testAuthorizationTac(info.signing);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(response);
	                helpers_1.testStateDone(info.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves remaining amounts for payments', function (done) {
	            judgeSession.setNextCase('payments.limits.list').then(function () {
	                return client.orders.payments.limits.list();
	            }).then(function (limits) {
	                expect(limits.items.length).toBe(2);
	                expectToBe(limits.items[0], {
	                    authorizationType: 'TAC',
	                    channelId: 'NET_BANKING',
	                    applicationId: 'GEORGE'
	                });
	                expectToBe(limits.items[0].remainingAmount, {
	                    value: 99999999999999,
	                    precision: 2,
	                    currency: 'CZK'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('recharges the credit on prepaid card', function (done) {
	            judgeSession.setNextCase('payments.mobile.create').then(function () {
	                return client.orders.payments.mobile.create(mobilePaymentPayload);
	            }).then(function (response) {
	                processMobilePayment(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('recharges the credit on prepaid card and signs the order', function (done) {
	            var info;
	            judgeSession.setNextCase('signing.tac.orders.payments.mobile.create').then(function () {
	                return client.orders.payments.mobile.create({
	                    paymentType: "VODAFONE_PAYMENT",
	                    phoneNumber: "777952341",
	                    sender: {
	                        iban: "CZ1208000000002059930033",
	                        bic: "GIBACZPX",
	                        number: "2059930033",
	                        bankCode: "0800",
	                        countryCode: "CZ"
	                    },
	                    amount: {
	                        value: 3000,
	                        precision: 0,
	                        currency: "CZK"
	                    },
	                    "confirmationPhoneNumber": "777952341"
	                });
	            }).then(function (response) {
	                info = response;
	                helpers_1.testStateOpen(response.signing);
	                return response.signing.getInfo();
	            }).then(function (response) {
	                helpers_1.testAuthorizationTac(response);
	                helpers_1.testAuthorizationTac(info.signing);
	                return response.startSigningWithTac();
	            }).then(function (response) {
	                helpers_1.testStateOpen(info.signing);
	                return response.finishSigning('00000000');
	            }).then(function (response) {
	                helpers_1.testStateDone(response);
	                helpers_1.testStateDone(info.signing);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('recharges the credit on prepaid card twice from same resource', function (done) {
	            var resource = client.orders.payments.mobile;
	            judgeSession.setNextCase('payments.mobile.create').then(function () {
	                return resource.create(mobilePaymentPayload);
	            }).then(function (response) {
	                processMobilePayment(response);
	                return judgeSession.setNextCase('payments.mobile.create');
	            }).then(function (response) {
	                return resource.create(mobilePaymentPayload);
	            }).then(function (response) {
	                processMobilePayment(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function testConvenienceMethods(response) {
	        expect(response.update).toBeDefined();
	        expect(response.delete).toBeDefined();
	    }
	    describe('phone numbers', function () {
	        it('retrieves list of phone numnbers', function (done) {
	            judgeSession.setNextCase('phoneBook.list').then(function () {
	                return client.phoneNumbers.list();
	            }).then(function (response) {
	                expectToBe(response.items[0], {
	                    id: '2195',
	                    alias: 'Graham Bell',
	                    phoneNumber: '777952341'
	                });
	                testConvenienceMethods(response.items[0]);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('creates phone number', function (done) {
	            judgeSession.setNextCase('phoneBook.create').then(function () {
	                return client.phoneNumbers.create({
	                    alias: 'Graham Bell',
	                    phoneNumber: '777952341',
	                    flags: [
	                        'isFavourite'
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '2195',
	                    alias: 'Graham Bell',
	                    phoneNumber: '777952341'
	                });
	                testConvenienceMethods(response);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('updates phone number', function (done) {
	            judgeSession.setNextCase('phoneBook.withId.update').then(function () {
	                return client.phoneNumbers.withId('2195').update({
	                    alias: 'Graham B.',
	                    phoneNumber: '777952341',
	                    flags: [
	                        'isFavourite'
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '2195',
	                    alias: 'Graham B.',
	                    phoneNumber: '777952341'
	                });
	                testConvenienceMethods(response);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('deletes phone number', function (done) {
	            judgeSession.setNextCase('phoneBook.withId.delete').then(function () {
	                return client.phoneNumbers.withId('2195').delete();
	            }).then(function (response) {
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function testPluginsPage0(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectToBe(response.items[0], {
	            productCode: 'PI-MOBILEPAYMENTS',
	            name: 'Plugin pro mobilní platby',
	        });
	        expectDate(response.items[0], {
	            validUntil: '2100-01-01'
	        });
	    }
	    describe('plugins', function () {
	        it('tests pagination for plugins list', function (done) {
	            var list;
	            judgeSession.setNextCase('plugins.list.page0').then(function () {
	                return client.plugins.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                testPluginsPage0(response);
	                list = response;
	                return judgeSession.setNextCase('plugins.list.page1');
	            }).then(function () {
	                return list.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1,
	                });
	                expectToBe(response.items[0], {
	                    productCode: 'PFM_1',
	                    name: 'PluginBudgets pro CZ',
	                });
	                expectDate(response.items[0], {
	                    validUntil: '2100-01-01'
	                });
	                expectToBe(response.items[0].standardFees[0], {
	                    timeOfCharging: 'IMMEDIATELY',
	                    periodOfCharging: 'NON_RECURRING'
	                });
	                list = response;
	                return judgeSession.setNextCase('plugins.list.page0');
	            }).then(function () {
	                return list.prevPage();
	            }).then(function (response) {
	                testPluginsPage0(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates plugin with a given id', function (done) {
	            judgeSession.setNextCase('plugins.withId.update').then(function () {
	                return client.plugins.withId('PI-MOBILEPAYMENTS').update({
	                    productCode: 'PI-MOBILEPAYMENTS',
	                    flags: [
	                        'active'
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response, {
	                    productCode: 'PI-MOBILEPAYMENTS',
	                    name: 'Plugin pro mobilní platby',
	                });
	                expectDate(response, {
	                    validUntil: '2100-01-01'
	                });
	                expectToBe(response.standardFees[0], {
	                    timeOfCharging: 'IMMEDIATELY',
	                    periodOfCharging: 'NON_RECURRING'
	                });
	                expect(response.flags[0]).toBe('active');
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('profile', function () {
	        it('retrives information about current users profile', function (done) {
	            judgeSession.setNextCase('profile.get').then(function () {
	                return client.profile.get();
	            }).then(function (profile) {
	                expectDate(profile, {
	                    lastlogin: '2016-03-17T15:01:49+01:00'
	                });
	                expectToBe(profile, {
	                    firstname: 'Anna',
	                    lastname: 'Vojtíšková',
	                    customerId: '2002-12-02-00.17.40.959689',
	                    instituteId: 1,
	                    salutation: 'Anno Vojtíšková'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves list of last logins', function (done) {
	            judgeSession.setNextCase('profile.lastLogin.list').then(function () {
	                return client.profile.lastLogins.list();
	            }).then(function (lastLogins) {
	                var item = lastLogins.items[0];
	                expect(lastLogins.items.length).toBe(1);
	                expect(item.channel).toBe('GEORGE');
	                expectDate(item, {
	                    lastlogin: '2016-03-17T15:01:49+01:00'
	                });
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('promotions', function () {
	        it('retrieves list', function (done) {
	            judgeSession.setNextCase('promotions.list').then(function () {
	                return client.promotions.list();
	            }).then(function (response) {
	                expectToBe(response.items[0].displayType, {
	                    titleText: 'Plugin Mobilní Platby',
	                    sublineText: 'Aktivace pluginu zdarma',
	                    displayType: 'OVERVIEW_CARD'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	        it('hides promotion', function (done) {
	            judgeSession.setNextCase('promotions.create').then(function () {
	                return client.promotions.create({
	                    promotionId: '218',
	                    executedAction: {
	                        actionId: 'HIDE',
	                        actionType: 'HIDE'
	                    }
	                });
	            }).then(function (response) {
	                expectToBe(response.infoItems[0], {
	                    infoName: 'RETURN_MESSAGE',
	                    infoValue: 'successfully executed'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	var helpers_1 = __webpack_require__(5);
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function processSecurities(list) {
	        expectToBe(list.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectToBe(list.items[0], {
	            id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
	            description: 'Aleš Vrba',
	            accountno: '1034176627'
	        });
	        expect(list.items[0].transactions).toBeDefined();
	        expect(list.items[0].get).toBeDefined();
	        expect(list.items[0].update).toBeDefined();
	    }
	    function processSecurity(security) {
	        expectToBe(security, {
	            id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
	            description: 'Aleš Vrba',
	            accountno: '1034176627'
	        });
	        expect(security.transactions).toBeDefined();
	        expect(security.get).toBeDefined();
	        expect(security.update).toBeDefined();
	    }
	    describe('securities', function () {
	        it('tests pagination on securities', function (done) {
	            var list;
	            judgeSession.setNextCase('securities.list.page0').then(function () {
	                return client.securities.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                processSecurities(response);
	                list = response;
	                return judgeSession.setNextCase('securities.list.page1');
	            }).then(function () {
	                return list.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1
	                });
	                expectToBe(response.items[0], {
	                    id: '420A217C20E4814C7C516A53ABA8E78F8CDBE324',
	                    description: 'Aleš Vrba',
	                    accountno: '1034176627'
	                });
	                expect(response.items[0].transactions).toBeDefined();
	                expect(response.items[0].get).toBeDefined();
	                expect(response.items[0].update).toBeDefined();
	                list = response;
	                return judgeSession.setNextCase('securities.list.page0');
	            }).then(function () {
	                return list.prevPage();
	            }).then(function (response) {
	                processSecurities(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('retrieves detail of security', function (done) {
	            judgeSession.setNextCase('securities.withId.get').then(function () {
	                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
	                    description: 'Aleš Vrba',
	                    accountno: '1034176627'
	                });
	                expect(response.transactions).toBeDefined();
	                expect(response.get).toBeDefined();
	                expect(response.update).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates alias of security', function (done) {
	            judgeSession.setNextCase('securities.withId.update').then(function () {
	                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').update({
	                    alias: 'lorem'
	                });
	            }).then(function (response) {
	                processSecurity(response);
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('it retrieves security details through get convenience method', function (done) {
	            var list;
	            judgeSession.setNextCase('securities.list.page0').then(function () {
	                return client.securities.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                processSecurities(response);
	                list = response;
	                return judgeSession.setNextCase('securities.withId.get');
	            }).then(function () {
	                return list.items[0].get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: '420A817C20E4814C7C516A53ABA8E78F0CDBE324',
	                    description: 'Aleš Vrba',
	                    accountno: '1034176627'
	                });
	                expect(response.transactions).toBeDefined();
	                expect(response.get).toBeDefined();
	                expect(response.update).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('it updates security through update convenience method', function (done) {
	            var list;
	            judgeSession.setNextCase('securities.list.page0').then(function () {
	                return client.securities.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                processSecurities(response);
	                list = response;
	                return judgeSession.setNextCase('securities.withId.update');
	            }).then(function () {
	                return list.items[0].update({
	                    alias: 'lorem'
	                });
	            }).then(function (response) {
	                processSecurity(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('it updates security transaction through transactions convenience method', function (done) {
	            var list;
	            judgeSession.setNextCase('securities.list.page0').then(function () {
	                return client.securities.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                processSecurities(response);
	                list = response;
	                return judgeSession.setNextCase('securities.withId.transactions.withId.update');
	            }).then(function () {
	                return list.items[0].transactions.withId('100000189114334').update({
	                    id: "100000189114334",
	                    note: "New client's personal note for transaction",
	                    flags: [
	                        "hasStar"
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response.transaction, {
	                    id: '100000189114334',
	                    note: 'New client\'s personal note for transaction',
	                });
	                expect(response.transaction.flags.length).toBe(2);
	                expect(response.transaction.flags[0]).toBe('hasNote');
	                expect(response.transaction.flags[1]).toBe('hasStar');
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates transaction', function (done) {
	            judgeSession.setNextCase('securities.withId.transactions.withId.update').then(function () {
	                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').transactions.withId('100000189114334').update({
	                    note: "New client's personal note for transaction",
	                    flags: [
	                        "hasStar"
	                    ]
	                });
	            }).then(function (response) {
	                expectToBe(response.transaction, {
	                    id: '100000189114334',
	                    note: 'New client\'s personal note for transaction',
	                });
	                expect(response.transaction.flags.length).toBe(2);
	                expect(response.transaction.flags[0]).toBe('hasNote');
	                expect(response.transaction.flags[1]).toBe('hasStar');
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('exports transactions', function (done) {
	            judgeSession.setNextCase('securities.withId.transactions.export').then(function () {
	                return client.securities.withId('420A817C20E4814C7C516A53ABA8E78F0CDBE324').transactions.export({
	                    dateFrom: new Date(1999, 8, 27),
	                    dateTo: new Date(2000, 8, 27),
	                    fields: [
	                        'bookingDate',
	                        'partner',
	                        'amount',
	                        'currency'
	                    ],
	                    showAccountName: true,
	                    showAccountNumber: true,
	                    showTimespan: true,
	                    showBalance: true
	                });
	            }).then(function (response) {
	                helpers_1.testFile(response);
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('services', function () {
	        it('retrieves services', function (done) {
	            judgeSession.setNextCase('services.list').then(function () {
	                return client.services.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 0,
	                    pageCount: 1,
	                    pageSize: 1,
	                });
	                expectToBe(response.items[0], {
	                    id: 'EB8816A9C0E29A47F564E0BC2F30F8BB5A2FDB84',
	                    nameI18N: 'SERVIS 24',
	                    iconGroup: 'S24'
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    describe('settings', function () {
	        it('get users settings', function (done) {
	            judgeSession.setNextCase('settings.get').then(function () {
	                return client.settings.get();
	            }).then(function (response) {
	                expect(response.language).toBe('cs');
	                expect(response.flags.length).toBe(4);
	                expect(response.flags[0]).toBe('displayInsurances');
	                expect(response.flags[1]).toBe('displayBuildings');
	                expect(response.flags[2]).toBe('displayCreditCards');
	                expect(response.flags[3]).toBe('displayInvestments');
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	        it('updates users settings', function (done) {
	            judgeSession.setNextCase('settings.update').then(function () {
	                return client.settings.update({
	                    language: 'cs',
	                    flags: [
	                        'displayInsurances',
	                        'displayBuildings'
	                    ]
	                });
	            }).then(function (response) {
	                expect(response.settings.language).toBe('cs');
	                expect(response.settings.flags.length).toBe(4);
	                expect(response.settings.flags[0]).toBe('displayInsurances');
	                expect(response.settings.flags[1]).toBe('displayBuildings');
	                expect(response.settings.flags[2]).toBe('displayCreditCards');
	                expect(response.settings.flags[3]).toBe('displayInvestments');
	                expect(response.signing).toBeDefined();
	                done();
	            }).catch(function (e) {
	                logJudgeError(e);
	            });
	        });
	    });
	});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
	/// <reference path="../build/cs-netbanking-sdk.sfx.d.ts"/>
	/// <reference path="../typings/tsd.d.ts"/>
	var CoreSDK = __webpack_require__(3);
	var netbanking = __webpack_require__(4);
	var judge = null;
	var judgeSession = null;
	var client = null;
	var expectToBe = CoreSDK.TestUtils.expectToBe;
	var expectDate = CoreSDK.TestUtils.expectDate;
	var logJudgeError = CoreSDK.TestUtils.logJudgeError;
	describe("Netbanking SDK", function () {
	    var originalTimeoutInterval = null;
	    beforeAll(function () {
	        judge = new CoreSDK.Judge();
	        //Because Judge starts slowly on the first request
	        originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
	    });
	    afterAll(function () {
	        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
	    });
	    beforeEach(function () {
	        CoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
	        client = netbanking.getClient();
	        client.sharedContext = null;
	        judgeSession = judge.startNewSession();
	    });
	    function testTemplates(response) {
	        expectToBe(response.pagination, {
	            pageNumber: 0,
	            pageCount: 2,
	            pageSize: 1,
	            nextPage: 1
	        });
	        expectToBe(response.items[0], {
	            id: 'template_0-123-100',
	            name: 'Jan Novák',
	            orderCategory: 'DOMESTIC'
	        });
	        expect(response.items[0].get).toBeDefined();
	    }
	    describe('templates', function () {
	        it('tests pagination', function (done) {
	            judgeSession.setNextCase('templates.list.pagination').then(function () {
	                return client.templates.list({
	                    pageNumber: 0,
	                    pageSize: 1
	                });
	            }).then(function (response) {
	                testTemplates(response);
	                return response.nextPage();
	            }).then(function (response) {
	                expectToBe(response.pagination, {
	                    pageNumber: 1,
	                    pageCount: 2,
	                    pageSize: 1
	                });
	                expectToBe(response.items[0], {
	                    id: 'template_0-124-100',
	                    name: 'Marek Nový'
	                });
	                return response.prevPage();
	            }).then(function (response) {
	                testTemplates(response);
	                done();
	            }).catch(logJudgeError);
	        });
	        it('retrieves detail', function (done) {
	            judgeSession.setNextCase('templates.withId.get').then(function () {
	                return client.templates.withId('template_0-123-100').get();
	            }).then(function (response) {
	                expectToBe(response, {
	                    id: 'template_0-123-100',
	                    name: 'Jan Novák',
	                    orderCategory: 'DOMESTIC',
	                });
	                done();
	            }).catch(logJudgeError);
	        });
	    });
	});


/***/ },
/* 31 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 31;


/***/ }
/******/ ]);
//# sourceMappingURL=tests.node.js.map