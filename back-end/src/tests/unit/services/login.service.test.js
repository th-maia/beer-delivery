const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { customer, customerLogin } = require('../../mocks/users');
const { getUser } = require('../../../api/services/Login.service');

describe ('Testes da rota login, camada service', () => {
    describe('Teste se é realizado o login com sucesso', () => {
        beforeEach( async () => {
            sinon.stub(Model, 'findOne').resolves(customer);
        });
        afterEach( () => sinon.restore());
        it('Deve ser feito login com sucesso e retornar um objeto de usuário', async () => {
            const user = await getUser(customerLogin.email, customerLogin.password);
            expect(user).to.have.keys(customer);
        });
    });
});