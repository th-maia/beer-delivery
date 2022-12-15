const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');
const app = require('../../api/app');


chai.use(sinonChai);
chai.use(chaiHttp);

const port = process.env.PORT || 3001;

describe('Teste do servidor', () => {
  it('Deve executar a aplicação na porta especificada', () => {
    app.listen(port);

    setTimeout(() => {
      expect(app.listening).to.be.ok;
    }, 1000);
  });
});

describe('Test route', () => {
  it('should return a success message', async () => {
    const httpResponse = await chai
                .request(app)
                .get('/');
    expect(httpResponse.statusCode).to.be.equal(200);
    expect(httpResponse.text).to.be.deep.equal('O servidor está funcionando corretamente!');
  });
});