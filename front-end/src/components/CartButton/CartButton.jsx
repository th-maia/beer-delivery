import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import removeComma from '../../utils/removeComma';

function CartButton() {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={ () => navigate('/customer/checkout') }
      type="button"
      disabled={ !getCartTotal() }
      style={ {
        position: 'fixed',
        bottom: '50px',
        right: '60px',
      } }
      data-testid="customer_products__button-cart"
    >
      <div>
        Ver Carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { getCartTotal()
            && removeComma(parseFloat(getCartTotal()).toFixed(2))}
        </span>
      </div>
    </button>
  );
}

export default CartButton;
