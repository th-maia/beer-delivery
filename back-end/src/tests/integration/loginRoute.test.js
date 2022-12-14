const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');

const app = require('../../api/app')
const { customerLogin, customerErrorEmail, customerErrorPassword, customerLoginResponse } = require('../mocks/login');

chai.use(sinonChai);
chai.use(chaiHttp);

describe('Teste da rota de Login', () => {
    describe('Teste quando o campo de email não possui o formato correto email@email.com', () => {
        it('Deve retornar o status 400 com a mensagem de "WRONG EMAIL OR PASSWORD"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(customerErrorEmail);
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'WRONG EMAIL OR PASSWORD' });
        });
    });
    describe('Teste quando o campo de password com menos de 6 caracteres', () => {
        it('Deve retornar o status 400 com a mensagem de "WRONG EMAIL OR PASSWORD"', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(customerErrorPassword);
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'WRONG EMAIL OR PASSWORD' });
        });
    });
    describe('Teste quando o fizer login com sucesso', () => {
        it('Deve retornar o status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send(customerLogin);
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.have.keys(customerLoginResponse);
        });
    });
});