/// <reference path="../build/cs-corporate-sdk.sfx.d.ts"/>
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
    judgeSession.setNextCase('corporate.accounts.list').then(_ => {
      return client.accounts.list({
        pageNumber: 0,
        pageSize: 1,
      });
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns balance of an account', done => {
    judgeSession.setNextCase('corporate.accounts.balance').then(_ => {
      return client.accounts.withId('3520EE975815E478AFED5180CC32647934720EF5').balance.get();
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns transactions of an account', done => {
    judgeSession.setNextCase('corporate.accounts.transactions.list').then(_ => {
      return client.accounts.withId('3520EE975815E478AFED5180CC32647934720EF5').transactions.list({
        pageNumber: 0,
        pageSize: 1,

        // TODO
        dateStart: '2016-06-01T00:00:00+02:00',
        dateEnd: '2016-06-01T00:00:00+02:00',
      });
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });
});