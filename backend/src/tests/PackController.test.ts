import { Model } from 'sequelize';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import App from '../app';
import Packs from '../database/models/PacksModel';

const { expect } = chai;
chai.use(chaiHttp);

describe('Test class PackController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('should return all packs', async function() {
    const mockedPack1: Packs = {
      "id": 1,
      "packId": 1000,
      "productId": 18,
      "qty": 6,
    } as Packs;

    const mockedPack2: Packs = {
      "id": 2,
      "packId": 1010,
      "productId": 24,
      "qty": 1,
    } as Packs;

    const mockedReturn = [mockedPack1, mockedPack2];

    sinon.stub(Model, 'findAll').resolves(mockedReturn);
    
    const response = await chai.request(testApp.app).get('/packs').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });
})
