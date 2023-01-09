import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import removeComma from '../../utils/removeComma';
import './CartButton.css';

function CartButton() {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <button
      onClick={ () => navigate('/customer/checkout') }
      type="button"
      className="cartButton"
      disabled={ !getCartTotal() }
      style={ {
        position: 'fixed',
        bottom: '50px',
        right: '60px',
      } }
      data-testid="customer_products__button-cart"
    >
      <div className="cart">
        <img src="https://cdn.discordapp.com/attachments/938669134890278937/1062098230319517716/Buy.png" alt="cart" />
        <span data-testid="customer_products__checkout-bottom-value">
          R$
          {' '}
          { getCartTotal()
            && removeComma(parseFloat(getCartTotal()).toFixed(2))}
        </span>
      </div>
    </button>
  );
}

export default CartButton;
