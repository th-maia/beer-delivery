const Joi = require('joi');
const CustomHttpError = require('./CustomHttpError');

const salesObject = Joi.object({
  productName: Joi.string().required()
      .messages({
        'string-empty': 'productName is required',
    }),  
  productId: Joi.number().required()
      .messages({
        'number-empty': 'productId is required',
    }),
    quantity: Joi.number().positive().min(1)
      .required()
      .messages({
      'number-empty': 'quantity is required',
      'number-positive': 'must be greater than or equal to 1',
    }),
  });

const saleSchema = Joi.object({
    sellerId: Joi.number().required().messages({
        'number-empty': 'sellerId is required',
    }),
    totalPrice: Joi.number().required().messages({
        'number-empty': 'totalPrice is required',
    }),
    deliveryAddress: Joi.string().required().messages({
        'string-empty': 'deliveryAdress is required',
    }),
    deliveryNumber: Joi.string().required().messages({
        'string-empty': 'deliveryNumber is required',
    }),
    saleDate: Joi.date().required().messages({
        'date-empty': 'saleDate is required',
    }),
    status: Joi.string().required().messages({
        'string-empty': 'status is required',
    }),
    products: Joi.array().items(salesObject).required().messages({
        'array-empty': 'products is required',
    }),
});

const checkBodySale = (req, _res, next) => {
    const validation = saleSchema.validate(req.body);
    if (validation.error) throw new CustomHttpError(422, validation.error.details[0].message);
    next();
};

module.exports = checkBodySale;