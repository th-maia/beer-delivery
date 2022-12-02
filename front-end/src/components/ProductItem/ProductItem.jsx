import React from 'react';
import removeComma from '../../utils/removeComma';
import './ProductItem.styles.css';

function ProductItem({ id, name, price, image }) {
  const [quantity, setQuantity] = React.useState(1);

  const setQuantityInput = (value) => {
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(0);
    }
  };

  const addQuantity = () => {
    const quantityInput = document.getElementById('quantity').value;
    setQuantity(+quantityInput + 1);
  };

  const removeQuantity = () => {
    const quantityRemove = quantity !== 0 && setQuantity(quantity - 1);
    return quantityRemove;
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
          data-testid={ `customer_products__element-card-title-${id}` }>
          {name}
        </h2>
        <div className="customer_products__button-card">
          <button
            type="button"
            onClick={ removeQuantity }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className="
            customer_products__button-card-rm-item customer_products__button-card_style"
          >
            Remover
          </button>
          <input
            value={ quantity }
            min={ 0 }
            id="quantity"
            className="customer_products__input-card-quantity "
            data-testid={ `customer_products__input-card-quantity-${id}` }
            type="number"
            onChange={ (event) => {
              const { value } = event.target;
              setQuantityInput(value);
            } }
          />
          <button
            type="button"
            onClick={ addQuantity }
            className="
            customer_products__button-card-add-item customer_products__button-card_style "
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
