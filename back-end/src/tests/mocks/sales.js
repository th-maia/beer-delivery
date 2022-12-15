const allSales = [
    {
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "100.00",
      "deliveryAddress": "Rua dos Alfineiros",
      "deliveryNumber": "4",
      "saleDate": "2022-12-01T00:00:00.000Z",
      "status": "Pendente"
    }
];

const newSaleRequest = {
    "sellerId": 2,
    "totalPrice": 100,
    "deliveryAddress": "Rua dos Alfineiros" ,
    "deliveryNumber": "4",
    "saleDate": "2022-12-01",
    "status": "Pendente",
    "products": [
      {
        "productName": "Skol Lata 250ml",
        "productId": 1,
        "quantity": 3
      },
      {
        "productName": "Heineken 600ml",
        "productId": 2,
        "quantity": 4
      },
      {
        "productName": "Antarctica Pilsen 300ml",
        "productId": 3,
        "quantity": 1
      }
    ]
};

const newSaleError = {
  "totalPrice": 100,
  "deliveryAddress": "Rua dos Alfineiros" ,
  "deliveryNumber": "4",
  "saleDate": "2022-12-01",
  "status": "Pendente",
  "products": [
    {
      "productName": "Skol Lata 250ml",
      "productId": 1,
      "quantity": 3
    },
    {
      "productName": "Heineken 600ml",
      "productId": 2,
      "quantity": 4
    },
    {
      "productName": "Antarctica Pilsen 300ml",
      "productId": 3,
      "quantity": 1
    }
  ]
};

const newSaleResponse = {
    "id": 1,
    "userId": 3,
    "sellerId": 2,
    "totalPrice": 100,
    "deliveryAddress": "Rua dos Alfineiros",
    "deliveryNumber": "4",
    "saleDate": "2022-12-01T00:00:00.000Z",
    "status": "Pendente"
};

const updateSaleResponse = {
  "id": 1,
  "userId": 3,
  "sellerId": 2,
  "totalPrice": 100,
  "deliveryAddress": "Rua dos Alfineiros",
  "deliveryNumber": "4",
  "saleDate": "2022-12-01T00:00:00.000Z",
  "status": "Preparando"
};

const productsSale = [
    {
      "saleId": 1,
      "productId": 1,
      "quantity": 3
    },
    {
      "saleId": 1,
      "productId": 2,
      "quantity": 4
    },
    {
      "saleId": 1,
      "productId": 3,
      "quantity": 1
    }
  ];

module.exports = { 
  allSales, 
  newSaleResponse, 
  newSaleRequest, 
  productsSale, 
  updateSaleResponse,
  newSaleError,
 };