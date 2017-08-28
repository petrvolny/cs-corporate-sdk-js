/// <reference path="../node_modules/cs-core-sdk/dist/cs-core-sdk.sfx.d.ts"/>

import * as CSCoreSDK from 'cs-core-sdk';
const corporate = require('../build/cs-corporate-sdk.node.js');
let judge: CSCoreSDK.Judge = null;
let judgeSession: CSCoreSDK.JudgeSession = null;
let client: CSCorporateSDK.CorporateClient = null;
const expectDate = CSCoreSDK.TestUtils.expectDate;
const logJudgeError = CSCoreSDK.TestUtils.logJudgeError;
const fs = require('fs');
const _ = require('lodash');
const path = require('path');

function testFile(response, fileName = 'test-pdf.pdf') {
  if (fs) {
      const file = fs.readFileSync(path.join(__dirname, fileName));
      expect(_.isEqual(file.toString(), response.toString())).toBe(true);
  }
  expect(response).toBeTruthy();
  const str = String.fromCharCode.apply(null, new Uint8Array(response));;
  expect(str.length).toBe(2761);
}

const testCompanyDetail = response => {
  expect(response.regNum).toBe('49624911');
  expect(response.taxNum).toBe('CZ49624911');
  expect(response.legalForm).toBe('331');
  expect(response.legalFormI18N).toBe('Přísp. org. zř. úz.sam.cel');
  expect(response.name).toBe('ZÁKLADNÍ ŠKOLA.FAKULTNÍ ŠKOLA PEDAGOGICKÉ FAKULTY UK');
  expect(response.campaigns).toBeDefined();
  expect(response.relationshipManagers).toBeDefined();
  expect(response.campaigns).toBeDefined();
  expect(response.relationshipManagers).toBeDefined();

  expect(response.companyProfile.cnbType).toBe('180');
  expect(response.companyProfile.cnbTypeI18N).toBe('Příspěvkové a jiné organiz. v působ. územních samospr. celků');
  expect(response.companyProfile.industryCategory).toBe('853110');
  expect(response.companyProfile.industryCategoryI18N).toBe('Sekundární všeobecné vzdělávání');
  expect(response.companyProfile.sector).toBe('1313000');
  expect(response.companyProfile.sectorI18N).toBe('1313000_MÍSTNÍ VLÁD. INSTIT.');

  expect(response.relationshipType.relationshipType).toBe('47');
  expect(response.relationshipType.relationshipTypeI18N).toBe('Řídící osoba');
}

const testCampaigns = response => {
  expect(response.items.length).toBe(1);

  const item = response.items[0];
  expect(item.id).toBe(123);
  expect(item.name).toBe('Campaign');
  expect(item.channel).toBe('ATM');
  expect(item.comment).toBe('Campaign comment');
  expect(item.targetListId).toBe(111);
  expectDate(item, {
    endDate: '2014-11-26T00:00:00+01:00',
  });
}

const testRelationshipManagers = response => {
  expect(response.items.length).toBe(2);

  const item = response.items[0];
  const employee = item.employees[0];

  expect(item.id).toBe('1-NPJ');
  expect(item.name).toBe('Poradce MM 1');
  expect(item.primaryFlag).toBe(true);
  expect(item.employees.length).toBe(9);
  expect(employee.empId).toBe(583876);
  expect(employee.firstName).toBe('Martina');
  expect(employee.lastName).toBe('Bardonová');
  expect(employee.primaryFlag).toBe(false);
  expect(employee.get).toBeDefined();
  expect(employee.photo).toBeDefined();
}

const testRelationshipManagerDetail = response => {
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
  expect(response.photo).toBeDefined();

  expect(response.department.id).toBe(40000970);
  expect(response.department.departmentCode).toBe('UP_459');
  expect(response.department.nameI18N).toBe('Univerzální pob. Praha 2(Jugoslávská 19)');
  expect(response.department.headId).toBe(584607);
  expect(response.department.parentId).toBe(40004618);

  expect(response.department.company.companyCode).toBe('CS');
  expect(response.department.company.nameI18N).toBe('Česká spořitelna, a.s.');
  expect(response.department.company.nameI18N_EN).toBe('Česká spořitelna, a.s. - english');
  expect(response.department.company.departmentPrefix).toBe(4000);
  expect(response.department.company.displayCode).toBe('CS');
  expect(response.department.company.manuallyUpdated).toBe(false);
  expect(response.department.company.departmentExists).toBe(true);

  expect(response.teamId).toBe('010004MAM006');

  expect(response.position.id).toBe(40000856);
  expect(response.position.positionCode).toBe('ADV1');
  expect(response.position.descriptionI18N).toBe('poradce');
  expect(response.position.companyCode).toBe('CS');
}

describe("Corporate SDK", function () {
  let originalTimeoutInterval = null;

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

      expect(response.items.length).toBe(5);

      const item = response.items[0];
      expect(item.legalForm).toBe('101');
      expect(item.legalFormI18N).toBe('Pod.FO tuz.nezaps.OR');
      expect(item.name).toBe('Kateřina Vávrová');
      expect(item.companyProfile.cnbType).toBe('440');
      expect(item.companyProfile.cnbTypeI18N).toBe('Fyzická osoba');
      expect(item.companyProfile.industryCategory).toBe('855900');
      expect(item.companyProfile.industryCategoryI18N).toBe('Ostatní vzdělávání j. n.');
      expect(item.companyProfile.sector).toBe('1420000');
      expect(item.companyProfile.sectorI18N).toBe('1420000_OSTATNÍ OSOBY SAM. V.Č');
      expect(item.relationshipType.relationshipType).toBe('AA');
      expect(item.relationshipType.relationshipTypeI18N).toBe('Vazba FO/FOp dle RČ-jednoznačná');
      expect(item.get).toBeDefined();
      expect(item.campaigns).toBeDefined();
      expect(item.relationshipManagers).toBeDefined();

      done();
    }).catch(logJudgeError);
  });

  it('returns company detail', done => {
    judgeSession.setNextCase('corporate.companies.get.simple').then(_ => {
      return client.companies.withId('49624911').get();
    }).then(response => {
      testCompanyDetail(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns company detail through convenience method', done => {
    judgeSession.setNextCase('corporate.companies.list').then(_ => {
      return client.companies.list();
    }).then(response => {

      return judgeSession.setNextCase('corporate.companies.get.simple').then(_ => {
        return response.items[1].get();
      });
    }).then(response => {
      testCompanyDetail(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns company detail through convenience get method on list', done => {
    judgeSession.setNextCase('corporate.companies.list').then(_ => {
      return client.companies.list();
    }).then(response => {

      return judgeSession.setNextCase('corporate.companies.get.simple').then(_ => {
        return response.items[1].get();
      });
    }).then(response => {
      testCompanyDetail(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns list of campaigns', done => {
    judgeSession.setNextCase('corporate.companies.campaigns.list').then(_ => {
      return client.companies.withId('321').campaigns.list();
    }).then(response => {
      testCampaigns(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns list of relationship managers through convenience getter', done => {
    judgeSession.setNextCase('corporate.companies.list').then(_ => {
      return client.companies.list();
    }).then(response => {

      return judgeSession.setNextCase('corporate.companies.relationshipmanagers.list').then(_ => {
        return response.items[1].relationshipManagers.list({
          filter: 'ALL',
        });
      });
    }).then(response => {
      testRelationshipManagers(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns list of relationship managers', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.list').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.list({
        filter: 'ALL',
      });
    }).then(response => {
      testRelationshipManagers(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns detail of relationship manager', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.simple').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.withId('583876').get();
    }).then(response => {
      testRelationshipManagerDetail(response);

      done();
    }).catch(logJudgeError);
  });

  it('returns detail of relationship manager through convenience method', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.list').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.list({
        filter: 'ALL',
      });
    }).then(response => {
      testRelationshipManagers(response);

      return judgeSession.setNextCase('corporate.companies.relationshipmanagers.simple').then(_ => {
        return response.items[0].employees[0].get();
      });
    }).then(response => {
      testRelationshipManagerDetail(response);

      done();
    }).catch(logJudgeError);
  });

  it('downloads photo of relationship manager', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.photo').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.withId('583876').photo.download({
        type: 'BW',
      });
    }).then(response => {
      testFile(response, 'webapi.base64');
      done();
    }).catch(logJudgeError);
  });

  it('downloads photo of relationship manager through convenience method', done => {
    judgeSession.setNextCase('corporate.companies.relationshipmanagers.list').then(_ => {
      return client.companies.withId('49624911').relationshipManagers.list({
        filter: 'ALL',
      });
    }).then(response => {
      testRelationshipManagers(response);

      return judgeSession.setNextCase('corporate.companies.relationshipmanagers.photo').then(_ => {
        return response.items[0].employees[0].photo.download({
          type: 'BW',
        });
      });
    }).then(response => {
      testFile(response, 'webapi.base64');
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