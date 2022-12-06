import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [value] = useLocalStorage('cart', '');
  const [cart, setCart] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const controllers = React.useMemo(() => ({
    cart,
    setCart,
    products,
    setProducts,
  }), [cart, setCart, products, setProducts]);

  React.useEffect(() => {
    setCart(value ?? []);
  }, []);

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
