const { expect } = require('chai');
const sinon = require('sinon');
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { describe } = require('mocha');

const { Model } = require('sequelize');
const admService = require('../../../api/services/Adm.service');
const admController = require('../../../api/controllers/Adm.controller');
const { users } = require('../../mocks/users');

chai.use(sinonChai);

describe ('Testes da rota adm, camada controller', () => {
    describe('Visualizar todos os usuários', () => {
        beforeEach(async () => {
            sinon.stub(admService, 'getUsers').resolves(users);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas os usuários', async () => {
            const res = {};
            const req = { headers: {}, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await admController.getAllClients(req, res);

            expect(res.status).to.have.been.calledWith(200);
        });
    });

    describe('Teste se não existir nenhuma usuário a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(admService, 'getUsers').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum usuário', async () => {
            try {
                const res = {};
                const req = { headers: {}, body: {} };
    
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
    
                await admController.getAllClients(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO USERS FOUND');
            }
        });
    });

    describe('É possível deletar um usuário', () => {
        beforeEach(async () => {
            sinon.stub(admService, 'deleteUser').resolves('USER DELETED');
        });
        afterEach(() => admService.deleteUser.restore());
        it('Deve ser possível deletar um usuário', async () => {
            const res = {};
            const req = { params: { id: 1 }, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await admController.deleteUserController(req, res);

            expect(res.status).to.have.been.calledWith(202);
            expect(res.json).to.have.been.calledWith('USER DELETED');
        });
    });

    describe('Teste se não for possível deletar um usuário', () => {
        beforeEach(async () => {
            sinon.stub(admService, 'deleteUser').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for possível deletar um usuário', async () => {
            try {
                const res = {};
                const req = { params: { id: 1 }, body: {} };

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();

                await admController.deleteUserController(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('COULDNT DELETE USER');
            }
        });
    });
});