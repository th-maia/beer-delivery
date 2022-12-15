const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { describe } = require("mocha");

const { Model } = require("sequelize");
const {
  cliente2Register,
  cliente2Response,
  cliente2AlreadyRegistered,
} = require("../../mocks/users");
const registerService = require("../../../api/services/Register.service");
const registerController = require("../../../api/controllers/Register.controller");

chai.use(sinonChai);

describe("Testes da rota register, camada controller", () => {
  beforeEach(() => {
    sinon
    .stub(registerService, "postUser")
    .onCall(0)
    .resolves(cliente2Response)
    .onCall(1)
    .resolves("EMAIL ALREADY EXIST")
  });
  afterEach(() => sinon.restore());

  it("Deve ser feito o cadastro com sucesso e retornar o status 201", async () => {
    const res = {};
    const req = { params: {}, body: cliente2Register };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await registerController.register(req, res);

    // expect(res.status.calledWith(201)).to.be.true;
    expect(res.status).to.have.been.calledWith(201);
  });

  it("Deve ser retornar o erro 409 pois o email já existe", async () => {
    try {
    const res = {};
    const req = { params: {}, body: cliente2AlreadyRegistered };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await registerController.register(req, res);
    } catch (err) {
        expect(err.message).to.be.deep.equal('EMAIL ALREADY EXIST');
    }
  });
});
