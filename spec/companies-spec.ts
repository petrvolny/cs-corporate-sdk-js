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

      expect(response.regNum).toBe('49624911');
      expect(response.taxNum).toBe('CZ49624911');
      expect(response.legalForm).toBe('331');
      expect(response.legalFormI18N).toBe('Přísp. org. zř. úz.sam.cel');
      expect(response.name).toBe('ZÁKLADNÍ ŠKOLA.FAKULTNÍ ŠKOLA PEDAGOGICKÉ FAKULTY UK');
      
      expect(response.companyProfile.cnbType).toBe('180');
      expect(response.companyProfile.cnbTypeI18N).toBe('Příspěvkové a jiné organiz. v působ. územních samospr. celků');
      expect(response.companyProfile.industryCategory).toBe('853110');
      expect(response.companyProfile.industryCategoryI18N).toBe('Sekundární všeobecné vzdělávání');
      expect(response.companyProfile.sector).toBe('1313000');
      expect(response.companyProfile.sectorI18N).toBe('1313000_MÍSTNÍ VLÁD. INSTIT.');

      expect(response.relationshipType.relationshipType).toBe('47');
      expect(response.relationshipType.relationshipTypeI18N).toBe('Řídící osoba');

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

      expect(response.empId).toBe(583876);
      expect(response.personalNumber).toBe('583876');
      expect(response.titleB).toBe('Ing.');
      expect(response.name).toBe('Martina');
      expect(response.surname).toBe('Bardonová');
      expect(response.fullName).toBe('Ing. Martina Bardonová');
      expect(response.gender).toBe('F');
      expect(response.employeeManagerId).toBe(582107);
      expect(response.isManager).toBe(false);
      expect(response.isBlocked).toBe(false);
      expect(response.segment).toBe('MAM');
      expect(response.contact.loginName).toBe('CEN83876');
      expect(response.contact.costUnit).toBe(40700162);

      expect(response.department.id).toBe(40000970);
      expect(response.department.departmentCode).toBe('UP_459');
      expect(response.department.nameI18N).toBe('Univerzální pob. Praha 2(Jugoslávská 19)');
      expect(response.department.headId).toBe(584607);
      expect(response.department.parentId).toBe(40004618);
      expect(response.department.cacheIdentifier).toBe(40000970);
      
      expect(response.department.company.companyCode).toBe('CS');
      expect(response.department.company.nameI18N).toBe('Česká spořitelna, a.s.');
      expect(response.department.company.nameI18N_EN).toBe('Česká spořitelna, a.s. - english');
      expect(response.department.company.departmentPrefix).toBe(4000);
      expect(response.department.company.displayCode).toBe('CS');
      expect(response.department.company.manuallyUpdated).toBe(false);
      expect(response.department.company.departmentExists).toBe(true);
      expect(response.department.company.cacheIdentifier).toBe('CS');
      
      expect(response.teamId).toBe('010004MAM006');

      expect(response.position.id).toBe(40000856);
      expect(response.position.positionCode).toBe('ADV1');
      expect(response.position.descriptionI18N).toBe('poradce');
      expect(response.position.companyCode).toBe('CS');
      expect(response.position.cacheIdentifier).toBe(40000856);

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

      expect(response.empId).toBe(583876);
      expect(response.agreement).toBe(false);
      expect(response.mimeType).toBe('image/jpeg');
      expect(response.types.length).toBe(1);
      expect(response.types[0]).toBe('BW');
      expectDate(response, {
        agreementDate: '2016-12-12',
      });

      done();
    }).catch(logJudgeError);
  });
});