
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

const customerLoginNot = {
    email: 'zebir@email.com',
    password: '$#zebirita#$'
}

const customerErrorPassword = {
    email: 'zebirita@email.com',
    password: '$#ze'
}

const customerErrorEmail = {
    email: 'zebiritaemail.com',
    password: '$#zebirita#$'
}

const customer = {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwNzA3NzUzLCJleHAiOjE2NzI3ODEzNTN9.Ed1sylmghHawx2yojIfOlW_2t8YxkFEuU1GuSl0sl1E'
};

const customerLoginResponse = {
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    role: 'customer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcwNzA3NzUzLCJleHAiOjE2NzI3ODEzNTN9.Ed1sylmghHawx2yojIfOlW_2t8YxkFEuU1GuSl0sl1E'
};

module.exports = { 
    customerObject,
    customer, 
    customerLogin,
    customerLoginResponse,
    customerErrorEmail,
    customerErrorPassword,
    customerLoginNot,
 };