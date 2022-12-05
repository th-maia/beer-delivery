import React from 'react';
import useCart from '../../hooks/useCart';
import removeComma from '../../utils/removeComma';

function CartButton() {
  const { getCartTotal, products } = useCart();

  return (
    <div
      style={ {
        position: 'fixed',
        bottom: '50px',
        right: '60px',
      } }
      data-testid="customer_products__button-cart"
    >
      <div>
        Ver Carrinho: R$
        <span
          data-testid="customer_products__checkout-bottom-value">
          { removeComma(getCartTotal()) }
        </span>
      </div>
    </div>
  );
}

export default CartButton;
