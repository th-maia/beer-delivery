const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require("sequelize");

const app = require('../../api/app');
const { 
    clienteRegister,
    clienteAlreadyRegistered,
    clienteResponse,
    clienteNameError,
    clienteEmailError,
    clientePasswordError,
    clienteWithoutName,
} = require('../mocks/register');

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Teste da rota de Register', () => {
    describe('Teste quando o campo de email não possui o formato correto email@email.com', () => {
        it('Deve retornar o status 400 com a mensagem de "WRONG EMAIL OR PASSWORD"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/register')
                .send(clienteEmailError);
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'WRONG EMAIL OR PASSWORD' });
        });
    });
    describe('Teste quando o campo de password com menos de 6 caracteres', () => {
        it('Deve retornar o status 400 com a mensagem de "WRONG EMAIL OR PASSWORD"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/register')
                .send(clientePasswordError);
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'WRONG EMAIL OR PASSWORD' });
        });
    });
    describe('Teste quando o campo de name com menos de 12 caracteres', () => {
        it('Deve retornar o status 400 com a mensagem de "INCORRECT NAME"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/register')
                .send(clienteNameError);
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'INCORRET NAME' });
        });
    });
    describe('Teste quando o email do usuário ja é cadastrado', () => {
        it('Deve retornar o status 409 com a mensagem de "EMAIL ALREADY EXIST"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/register')
                .send(clienteAlreadyRegistered);
            expect(httpResponse.status).to.equal(409);
            expect(httpResponse.body).to.be.deep.equal({ message: 'EMAIL ALREADY EXIST' });
        });
    });
    describe('Teste quando não possuir nome do usuário na requisição', () => {
        beforeEach(() => sinon.stub(Model, 'create').resolves(undefined));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 500 com a mensagem de "COULD NOT REGISTER USER"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/register')
                .send(clienteRegister);
            expect(httpResponse.status).to.equal(500);
            expect(httpResponse.body).to.be.deep.equal({ message: 'COULD NOT REGISTER USER' });
        });
    });
    describe('Teste quando o fizer register com sucesso', () => {
        beforeEach(() => sinon.stub(Model, 'create').resolves(clienteResponse));
        afterEach(() => sinon.restore());
        it('Deve retornar o status 201', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/register')
                .send(clienteRegister);
            expect(httpResponse.status).to.equal(201);
            expect(httpResponse.body).to.have.keys(clienteResponse);
        });
    });
});