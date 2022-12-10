const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { getUsers, deleteUser } = require('../../../api/services/Adm.service');
const { users } = require('../../mocks/users');

describe ('Testes da rota adm, camada service', () => {
    describe('Visualizar todos os usuários', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(users);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas os usuários', async () => {
            const allUsers = await getUsers();
            expect(allUsers).to.be.deep.equal(users);
        });
    });

    describe('Teste se não existir nenhuma usuário a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum usuário', async () => {
            try {
                const users = await getUsers();
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO USERS FOUND');
            }
        });
    });

    describe('É possível deletar um usuário', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'destroy').resolves('USER DELETED');
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível deletar um usuário', async () => {
            const response = await deleteUser(1);
            expect(response).to.be.deep.equal('USER DELETED');
        });
    });

    describe('Teste se não for possível deletar um usuário', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'destroy').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for possível deletar um usuário', async () => {
            try {
                const sales = await deleteUser(99);
            } catch (err) {
                expect(err.message).to.be.deep.equal('COULDNT DELETE USER');
            }
        });
    });
});