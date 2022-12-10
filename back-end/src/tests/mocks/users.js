const administrator = {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator'
}

const seller = {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller'
}

const customerObject = {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
};

const customerLogin = {
    email: 'zebirita@email.com',
    password: '$#zebirita#$'
}

const customer = {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwNzA3NzUzLCJleHAiOjE2NzI3ODEzNTN9.Ed1sylmghHawx2yojIfOlW_2t8YxkFEuU1GuSl0sl1E'
};

const clienteRegister = {
    "name": "clienteteste",
    "email": "clientetestes@email.com",
    "password": "cliente!1234",
    "role": "customer"
};

const clienteAlreadyRegistered = {
    "name": "clienteteste",
    "email": 'zebirita@email.com',
    "password": "cliente!1234",
    "role": "customer"
};

const clienteResponse = {
    "name": "clienteteste",
    "email": "cliente@email.com",
    "role": "customer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjbGllbnRlQGVtYWlsLmNvbSIsIm5hbWUiOiJjbGllbnRldGVzdGUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzA3MDg1MTYsImV4cCI6MTY3Mjc4MjExNn0.d-vBhKAJPcxCFl3cdgKGgHbJIBeMw-Al5sItPWhLNqg"
};

module.exports = { 
    administrator, 
    seller, 
    customer, 
    customerLogin,
    clienteRegister,
    clienteAlreadyRegistered,
    clienteResponse,
 };