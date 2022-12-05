import React from 'react';
import PropTypes from 'prop-types';
import removeComma from '../../utils/removeComma';
import useCart from '../../hooks/useCart';

function ProductItem({ id, name, price, image, quantity }) {
  const { addProduct, removeProduct, setProduct } = useCart();
  const product = {
    id,
    name,
    price,
    image,
  };

  return (
    <div className="customer_products__element-card">
      <div className="customer_products__element-card_info">
        <div
          data-testid={ `customer_products__element-card-price-${id}` }
          className="customer_products__element-card-price"
        >
          { removeComma(price) }
        </div>
        <div className="customer_products__img-card-bg-image">
          <img
            alt={ name }
            src={ image }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
          />
        </div>
      </div>
      <div className="customer_products__element-card_name-container">
        <h2
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h2>
        <div className="customer_products__button-card">
          <button
            type="button"
            onClick={ () => removeProduct(id) }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            Remover
          </button>
          <input
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            type="number"
            onChange={ (event) => {
              const { value } = event.target;
              setProduct(id, value);
            } }
          />
          <button
            type="button"
            onClick={ () => addProduct(product) }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

ProductItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
}.isRequired;
