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

  it('returns list of companies', done => {
    judgeSession.setNextCase('corporate.companies.list').then(_ => {
      return client.companies.list();
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns company detail', done => {
    judgeSession.setNextCase('corporate.companies.get.simple').then(_ => {
      return client.companies.withId('49624911').get();
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns list of campaings', done => {
    judgeSession.setNextCase('corporate.companies.campaigns.list').then(_ => {
      return client.companies.withId('321').campaigns.list();
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns list of relationship managers', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.list').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.list({
        filter: 'ALL',
      });
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns detail of relationship manager', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.simple').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.withId('583876').get();
    }).then(response => {
      done();
    }).catch(logJudgeError);
  })

  it('downloads photo of relationship manager', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.photo').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.withId('583876').photo.download({
        type: 'BW',
      });
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });

  it('returns info about relationship manager photo', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.photo.info').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.withId('583876').photo.info.get();
    }).then(response => {
      done();
    }).catch(logJudgeError);
  });
});