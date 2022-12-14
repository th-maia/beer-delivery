const clienteRegister = {
    "name": "clienttestintegraton",
    "email": "clientetestint@email.com",
    "password": "cliente!1234",
    "role": "customer"
};

const clienteWithoutName = {
    "email": "clientetestint@email.com",
    "password": "cliente!1234",
    "role": "customer"
};

const clienteNameError = {
    "name": "cliente",
    "email": "cliente1testes@email.com",
    "password": "cliente!1234",
    "role": "customer"
};


const clienteEmailError = {
    "name": "cliente1teste",
    "email": "cliente1teemail.com",
    "password": "cliente!1234",
    "role": "customer"
};

const clientePasswordError = {
    "name": "cliente1teste",
    "email": "cliente1testes@email.com",
    "password": "cli",
    "role": "customer"
};

const clienteAlreadyRegistered = {
    "name": "clienteteste",
    "email": 'zebirita@email.com',
    "password": "cliente!1234",
    "role": "customer"
};

const clienteResponse = {
    "name": "clienttestintegraton",
    "email": "clientetestint@email.com",
    "role": "customer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjbGllbnRlQGVtYWlsLmNvbSIsIm5hbWUiOiJjbGllbnRldGVzdGUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA3MDg1MTYsImV4cCI6MTY3Mjc4MjExNn0.d-vBhKAJPcxCFl3cdgKGgHbJIBeMw-Al5sItPWhLNqg"
};

module.exports = { 
    clienteRegister,
    clienteWithoutName,
    clienteAlreadyRegistered,
    clienteResponse,
    clienteNameError,
    clienteEmailError,
    clientePasswordError,
 };