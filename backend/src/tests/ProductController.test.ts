import { Model } from 'sequelize';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import App from '../app';
import Products from '../database/models/ProductModel';
import { IProductUpdate } from 'src/api/interfaces';

const { expect } = chai;
chai.use(chaiHttp);

describe('Test class ProductController', function() {
  afterEach(function() {
    sinon.restore();
  });

  const testApp = new App();

  it('should return all products', async function() {
    const mockedProduct1: Products = {
      "code": 16,
		  "name": "AZEITE  PORTUGUÊS  EXTRA VIRGEM GALLO 500ML",
		  "costPrice": 18.4,
		  "salesPrice": 20.49,
    } as Products;

    const mockedProduct2: Products = {
      "code": 18,
		  "name": "BEBIDA ENERGÉTICA VIBE 2L",
		  "costPrice": 8.09,
		  "salesPrice": 8.99
    } as Products;

    const mockedReturn = [mockedProduct1, mockedProduct2];

    sinon.stub(Model, 'findAll').resolves(mockedReturn);
    
    const response = await chai.request(testApp.app).get('/products').send();

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });

  it('should update product salesPrice', async function() {
    const mockedUpdatedProducts: IProductUpdate[] = [
      {
        "code": 18,
        "salesPrice": 9.50
      }, 
      {
        "code": 20,
        "salesPrice": 11.1
      }, 
    ];

    const mockedReturn = { message: 'Updated'};

    sinon.stub(Model, 'update').resolves();
    
    const response = await chai.request(testApp.app).put('/products').send(mockedUpdatedProducts);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockedReturn);
  });
})
