const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { customerLoginResponse, customerLogin } = require('../../mocks/users');
const { getUser } = require('../../../api/services/Login.service');

describe ('Testes da rota login, camada service', () => {
    describe('Teste se é realizado o login com sucesso', () => {
        beforeEach( async () => {
            sinon.stub(Model, 'findOne').resolves(customerLoginResponse);
        });
        afterEach( () => sinon.restore());
        it('Deve ser feito login com sucesso e retornar um objeto de usuário', async () => {
            const user = await getUser(customerLogin.email, customerLogin.password);
            expect(user).to.have.keys(customerLoginResponse);
        });
    });

    describe('Teste se o usuário não existe', () => {
        beforeEach( async () => {
            sinon.stub(Model, 'findOne').resolves(undefined);
        });
        afterEach( () => sinon.restore());
        it('Deve retornar um Not Found', async () => {
            try {
                const user = await getUser(customerLogin.email, customerLogin.password);
            } catch (e) {
                expect(e.message).to.be.deep.equal('NOT FOUND');
            }
        });
    });
});