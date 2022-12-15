const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require("sequelize");

const app = require('../../api/app');

const { allSellers } = require('../mocks/sellers');
const { allSales, updateSaleResponse } = require('../mocks/sales');

chai.use(sinonChai);
chai.use(chaiHttp);

const tokenSeller = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJmdWxhbmFAZGVsaXZlcnlhcHAuY29tIiwibmFtZSI6IkZ1bGFuYSBQZXJlaXJhIiwicm9sZSI6InNlbGxlciIsImlhdCI6MTY3MTA2NDQ3OSwiZXhwIjoxNjczMTM4MDc5fQ.dZjXv1-JXgp1Lk0OFf6c-WOFKZrL_9wAqmUa6SYg9BQ';

describe ('Testes da rota sellers', () => {
    describe('Visualizar todos os vendedores', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(allSellers);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas os vendedores', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/seller')
                .set('Authorization', tokenSeller)
                .send();
            
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.have.been.deep.equal(allSellers);
        });
    });

    describe('Teste se não existir nenhum vendedor a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum vendedor', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/seller')
                .set('Authorization', tokenSeller)
                .send();

            expect(httpResponse.status).to.equal(404);
            expect(httpResponse.body).to.have.been.deep.equal({ message: 'NO SELLER FOUND'});
        });
    });

    describe('Visualizar as vendas', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(allSales);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas as vendas realizadas pelo vendedor', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/seller/sales')
                .set('Authorization', tokenSeller)
                .send();
            
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.have.been.deep.equal(allSales);
        });
    });

    describe('Teste se não existir nenhuma venda a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/seller/sales')
                .set('Authorization', tokenSeller)
                .send();
            
            expect(httpResponse.status).to.equal(404);
            expect(httpResponse.body).to.have.been.deep.equal({ message: 'NO SALES FOUND FOR THIS SELLER' });
        });
    });

    describe('Atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(updateSaleResponse);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível atualizar o status da venda', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/seller/sales/1')
            .set('Authorization', tokenSeller)
            .send({ status: 'Em Trânsito' });

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.have.been.deep.equal({ message: 'UPDATED' });
        });
    });
    describe('Teste se não for possível atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/seller/sales/1')
            .set('Authorization', tokenSeller)
            .send({ status: 'Entregue' } );

        expect(httpResponse.status).to.equal(405);
        expect(httpResponse.body).to.have.been.deep.equal({ message: 'UPDATE NOT ALLOWED' });
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda inexistente', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/seller/sales/99999999')
            .set('Authorization', tokenSeller)
            .send({ status: 'Em Trânsito' } );
        
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.have.been.deep.equal({ message: 'NOT UPDATED' });
        });
    });
});