import React from 'react';
import { CartContext } from '../context/CartContext';
import useLocalStorage from './useLocalStorage';

const useCart = () => {
  const { value, setValue } = useLocalStorage('cart', '');
  const { cart, setCart, products, setProducts } = React.useContext(CartContext);
  const cartItems = [...products];

  React.useEffect(() => {
    console.log(cart);
  }, []);

  const addProduct = (productValue) => {
    const index = cartItems?.findIndex((item) => item?.id === productValue.id);
    cartItems[index].quantity += 1;
    setProducts(cartItems);
    setValue(cartItems);
    setCart(cartItems);
  };

  const setProduct = (id, quantity) => {
    const index = cartItems?.findIndex((item) => item?.id === id);
    cartItems[index].quantity = quantity;
    setProducts(cartItems);
    setValue(cartItems);
    setCart(cartItems);
  };

  const removeProduct = (id) => {
    const index = cartItems?.findIndex((item) => item?.id === id);
    if (cartItems[index].quantity <= 0) {
      cartItems[index].quantity = 0;
    } else {
      cartItems[index].quantity -= 1;
    }
    setCart(cartItems);
    setProducts(cartItems);
    setValue(cartItems);
  };

  const removeProductCart = (id) => {
    const index = cartItems?.findIndex((item) => item?.id === id);
    cartItems.splice(index, 1);
    setCart(cartItems);
    setProducts(cartItems);
    setValue(cartItems);
  };

  const getProduct = (id) => {
    const index = cart?.findIndex((obj) => obj.id === id);
    return cart[index];
  };

  const getProductById = (id) => {
    const index = products?.findIndex((obj) => obj.id === id);
    return products[index];
  };

  const getCartTotal = () => {
    let total = 0;

    for (let i = 0; i < cart.length; i += 1) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  };

  const getCart = () => value.filter((item) => item.quantity >= 1);

  return {
    addProduct,
    getProduct,
    removeProduct,
    setProduct,
    getCartTotal,
    getCart,
    removeProductCart,
    getProductById,
  };
};

export default useCart;
