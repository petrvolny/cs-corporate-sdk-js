/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>
/// <reference types="jasmine" />
/// <reference types="node" />

import * as CSCoreSDK from 'cs-core-sdk';
var corporate = require('../build/cs-corporate-sdk.node.js');
var judge: CSCoreSDK.Judge = null;
var judgeSession: CSCoreSDK.JudgeSession = null;
var client: CSCorporateSDK.CorporateClient = null;
var expectToBe = CSCoreSDK.TestUtils.expectToBe;
var expectDate = CSCoreSDK.TestUtils.expectDate;
var logJudgeError = CSCoreSDK.TestUtils.logJudgeError;

const testBalance = response => {
  expect(response.minBalance).toBe(1000);

  expect(response.balance.value).toBe(21828327);
  expect(response.balance.precision).toBe(2);
  expect(response.balance.currency).toBe('CZK');

  expect(response.disposable.value).toBe(21728327);
  expect(response.disposable.precision).toBe(2);
  expect(response.disposable.currency).toBe('CZK');

  expect(response.overdraft.value).toBe(0);
  expect(response.overdraft.precision).toBe(2);
  expect(response.overdraft.currency).toBe('CZK');
}

const testTransactions = response => {
  expect(response.pagination.pageNumber).toBe(0);
  expect(response.pagination.pageCount).toBe(85);
  expect(response.pagination.pageSize).toBe(1);
  expect(response.pagination.nextPage).toBe(1);
  expect(response.pagination.prevPage).toBe(null);
  expect(response.pagination.hasNextPage).toBe(true);
  expect(response.pagination.hasPrevPage).toBe(false);

  expect(response.items.length).toBe(1);

  const item = response.items[0];
  expect(item.transactionId).toBe('201606200000795231001001');
  expect(item.constantSymbol).toBe('0008');
  expect(item.description).toBe('D.platba - S24/TB/GSM/B24');
  expect(item.payerNote).toBe('Vorlík zelenina - ovoce ');
  expect(item.transactionType).toBe('93504');
  expect(item.transactionTypeI18N).toBe('D.platba - S24/TB/GSM/B24');
  expect(item.variableSymbol).toBe('16273');
  expectDate(item, {
    bookingDate: '2016-06-20T00:00:00+02:00',
    valuationDate: '2016-06-20T00:00:00+02:00',
  });

  expect(item.accountParty.accountNumber).toBe('223149101');
  expect(item.accountParty.bankCode).toBe('0100');

  expect(item.amount.value).toBe(-153780);
  expect(item.amount.precision).toBe(2);
  expect(item.amount.currency).toBe('CZK');

  expect(item.amountSender.value).toBe(-153780);
  expect(item.amountSender.precision).toBe(2);
  expect(item.amountSender.currency).toBe('CZK');
}

describe("Corporate SDK", function () {
  var originalTimeoutInterval = null;

  beforeAll(function () {
    judge = new CSCoreSDK.Judge();
    //Because Judge starts slowly on the first request
    originalTimeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeoutInterval;
  });

  beforeEach(function () {
    CSCoreSDK.useWebApiKey("TEST_API_KEY").useEnvironment(judge.testEnvironment);
    client = corporate.getClient() as CSCorporateSDK.CorporateClient;
    client.sharedContext = null;
    judgeSession = judge.startNewSession();
  });

  it('returns list of accounts', done => {
    judgeSession.setNextCase('corporate.accounts.list.pagination').then(_ => {
      return client.accounts.list({
        pageNumber: 0,
        pageSize: 1,
      });
    }).then(response => {

      expect(response.pagination.pageNumber).toBe(0);
      expect(response.pagination.pageCount).toBe(2);
      expect(response.pagination.pageSize).toBe(1);
      expect(response.pagination.nextPage).toBe(1);
      expect(response.pagination.prevPage).toBe(null);
      expect(response.pagination.hasNextPage).toBe(true);
      expect(response.pagination.hasPrevPage).toBe(false);

      expect(response.items.length).toBe(1);

      const item = response.items[0];
      expect(item.id).toBe('3520EE975815E478AFED5180CC32647934720EF5');
      expect(item.accountType).toBe('C');
      expect(item.currency).toBe('CZK');

      expect(item.accountNo.accountNumber).toBe('4630309');
      expect(item.accountNo.accountPrefix).toBe('0');
      expect(item.accountNo.bankCode).toBe('800');
      expect(item.accountNo.bic).toBe('GIBACZPX');
      expect(item.accountNo.iban).toBe('CZ7108000000000004630309');
      expect(item.balance).toBeDefined();
      expect(item.transactions).toBeDefined();

      expect(item.accountOwner.company.name).toBe('Základní škola s rozšířenou výukou jazyků, Fakultní škola Pedagogické fakulty UK, Praha 2, Kladská 1');
      expect(item.accountOwner.company.regNum).toBe('49624911');

      return response.nextPage();

    }).then(response => {

      return response.prevPage();
    }).then(response => {

      done();
    }).catch(logJudgeError);
  });

  it('returns balance of an account', done => {
    judgeSession.setNextCase('corporate.accounts.balance').then(_ => {
      return client.accounts.withId('3520EE975815E478AFED5180CC32647934720EF5').balance.get();
    }).then(response => {

      testBalance(response);
      done();
    }).catch(logJudgeError);
  });

  it('returns balance of an account by convenience method', done => {
    judgeSession.setNextCase('corporate.accounts.list').then(_ => {
      return client.accounts.list({
        pageNumber: 0,
        pageSize: 1,
      });
    }).then(response => {

      return judgeSession.setNextCase('corporate.accounts.balance').then(_ => {
        return response.items[0].balance.get();
      });
    }).then(response => {

      testBalance(response);
      done();
    }).catch(logJudgeError);
  });

  it('returns transactions of an account', done => {
    judgeSession.setNextCase('corporate.accounts.transactions.list.pagination').then(_ => {
      return client.accounts.withId('3520EE975815E478AFED5180CC32647934720EF5').transactions.list({
        pageNumber: 0,
        pageSize: 1,
        dateStart: new Date(2016, 5, 1),
        dateEnd: new Date(2016, 5, 1),
      });
    }).then(response => {

      testTransactions(response);

      return response.nextPage();
    }).then(response => {

      return response.prevPage();
    }).then(response => {

      done();
    }).catch(logJudgeError);
  });

  it('returns transactions of an account by convenience method', done => {
    judgeSession.setNextCase('corporate.accounts.list').then(_ => {
      return client.accounts.list({
        pageNumber: 0,
        pageSize: 1,
      });
    }).then(response => {

      return judgeSession.setNextCase('corporate.accounts.transactions.list').then(_ => {
        return response.items[0].transactions.list({
          pageNumber: 0,
          pageSize: 1,
          dateStart: new Date(2016, 5, 1),
          dateEnd: new Date(2016, 5, 1),
        });
      });
    }).then(response => {

      testTransactions(response);
      done();
    }).catch(logJudgeError);
  })
});