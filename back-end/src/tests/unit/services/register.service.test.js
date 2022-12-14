const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { clienteRegister, clienteResponse, clienteAlreadyRegistered, clientWithoutName } = require('../../mocks/users');
const { postUser } = require('../../../api/services/Register.service');
const { Error } = require('sequelize');

describe ('Testes da rota register, camada service', () => {
    describe('Teste se é realizado o cadastro com sucesso', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'create').resolves(clienteResponse);
        });
        afterEach(async () => sinon.restore());
        it('Deve ser feito cadastro com sucesso e retornar um objeto de usuário com as chaves de registro e token', async () => {
            const user = await postUser(clienteRegister);
            expect(user).to.have.keys(clienteResponse);
        });
    });

    describe('Teste se o usuário já existe', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'create').resolves(clienteResponse);
        });
        afterEach(async () => sinon.restore());
        it('Deve ser feito cadastro com sucesso e retornar um objeto de usuário com as chaves de registro e token', async () => {
            try {
                const user = await postUser(clienteAlreadyRegistered);
            } catch (err) {
                expect(err.message).to.be.deep.equal('EMAIL ALREADY EXIST');
            }
        });
    });

    describe('Teste se o usuário já existe', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'create').resolves(undefined);
        });
        afterEach(async () => sinon.restore());
        it('Deve retorna um erro', async () => {
            try {
                const user = await postUser(clientWithoutName);
            } catch (err) {
                expect(err.message).to.be.deep.equal('COULD NOT REGISTER USER');
            }
        });
    });
});