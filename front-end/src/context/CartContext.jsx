import React from 'react';
import PropTypes from 'prop-types';

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const controllers = React.useMemo(() => ({
    cart,
    setCart,
    products,
    setProducts,
  }), [cart, setCart, products, setProducts]);

  return (
    <CartContext.Provider value={ controllers }>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
