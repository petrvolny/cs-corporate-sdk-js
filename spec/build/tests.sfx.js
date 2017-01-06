var CSNetbankingSDKTests =
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
	context = __webpack_require__(34); //make sure you have your directory and regex test set correctly!
	context.keys().forEach(context);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accounts-spec.ts": 2,
		"./authorization-limits-spec.ts": 13,
		"./authorization-token-spec.ts": 14,
		"./budgets-spec.ts": 15,
		"./bundles-spec.ts": 16,
		"./cards-spec.ts": 17,
		"./contacts-spec.ts": 18,
		"./contracts/buildings-spec.ts": 19,
		"./contracts/insurances-spec.ts": 20,
		"./contracts/loyalty-spec.ts": 21,
		"./contracts/pensions-spec.ts": 22,
		"./goals-spec.ts": 23,
		"./messages-spec.ts": 24,
		"./payments-spec.ts": 25,
		"./phone-numbers-spec.ts": 26,
		"./plugins-spec.ts": 27,
		"./profile-spec.ts": 28,
		"./promotions-spec.ts": 29,
		"./securities-spec.ts": 30,
		"./services-spec.ts": 31,
		"./settings-spec.ts": 32,
		"./templates-spec.ts": 33
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
	var util = __webpack_require__(10);
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

	module.exports = CSCoreSDK;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = CSNetbankingSDK;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {"use strict";
	var path = __webpack_require__(6);
	var fs = __webpack_require__(8);
	var _ = (__webpack_require__(9));
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
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }
	
	  return parts;
	}
	
	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};
	
	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;
	
	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();
	
	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }
	
	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }
	
	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)
	
	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');
	
	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};
	
	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';
	
	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');
	
	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }
	
	  return (isAbsolute ? '/' : '') + path;
	};
	
	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};
	
	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};
	
	
	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);
	
	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }
	
	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }
	
	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }
	
	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));
	
	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }
	
	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }
	
	  outputParts = outputParts.concat(toParts.slice(samePartsLength));
	
	  return outputParts.join('/');
	};
	
	exports.sep = '/';
	exports.delimiter = ':';
	
	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];
	
	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }
	
	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }
	
	  return root + dir;
	};
	
	
	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};
	
	
	exports.extname = function(path) {
	  return splitPath(path)[3];
	};
	
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}
	
	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = undefined;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(11);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(12);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(7)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 13 */
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
/* 14 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 24 */
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
/* 25 */
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
/* 27 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ function(module, exports) {

	function webpackContext(req) {
		throw new Error("Cannot find module '" + req + "'.");
	}
	webpackContext.keys = function() { return []; };
	webpackContext.resolve = webpackContext;
	module.exports = webpackContext;
	webpackContext.id = 34;


/***/ }
/******/ ]);
//# sourceMappingURL=tests.sfx.js.map