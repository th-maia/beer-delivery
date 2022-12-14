const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { customer, customerLogin } = require('../../mocks/users');
const loginService = require('../../../api/services/Login.service');
const loginController = require('../../../api/controllers/Login.controller');
const chai = require("chai");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

describe ('Testes da rota login, camada controller', () => {
    describe('Teste se é realizado o login com sucesso', () => {
        beforeEach( async () => {
            sinon.stub(loginService, 'getUser').resolves(customer);
        });
        afterEach( () => sinon.restore());
        it('Deve ser feito login com sucesso e retornar o status 200', async () => {
            const res = {};
            const req = { params: {}, body: customerLogin };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await loginController.login(req, res);

            expect(res.status).to.have.been.calledWith(200);
        });
    });
});