import React from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, setCart } = React.useContext(CartContext);
  const cartItems = [...cart];

  const addProduct = (product) => {
    const cartCopy = [...cart];
    const item = cartCopy?.find((productItem) => productItem?.id === product?.id);
    if (!item) {
      cartCopy.push({
        ...product,
        quantity: 1,
      });
    } else {
      item.quantity += 1;
    }
    setCart(cartCopy);
  };

  const removeProduct = (product) => {
    const cartCopy = [...cart];
    const item = cartCopy?.find((productItem) => productItem?.id === product?.id);

    if (item && item.quantity > 1) {
      item.quantity -= 1;
      setCart(cartCopy);
    } else {
      const filterProduct = cartCopy.filter(
        (productItem) => productItem.id !== product.id,
      );
      setCart(filterProduct);
    }
  };
  const removeQuantity = (product) => {
    const productIndex = cartItems?.findIndex((item) => item?.id === product.id);
    const productQuantityEmpty = cartItems[productIndex].quantity === 0;
    if (productIndex >= 0) {
      const newProduct = {
        ...cartItems[productIndex],
        quantity:
          productQuantityEmpty
            ? 0
            : cartItems[productIndex].quantity - 1,
      };
      cartItems.splice(productIndex, 1, newProduct);
      setCart(cartItems);
    } else {
      setCart([...cartItems, {
        ...product,
        quantity: 0,
      }]);
    }
  };

  const getProduct = (id) => {
    const productIndex = cart?.findIndex((item) => item?.id === id);
    return cartItems[productIndex];
  };

  const putProduct = (id, product) => {
    console.log(id, product);
    return null;
  };

  const deleteProduct = (id) => {
    console.log(id);
    return null;
  };

  const clearCart = () => {
    console.log('clearCart');
    return null;
  };

  const isEmpty = () => {
    console.log('isEmpty');
    return null;
  };

  const totalProducts = () => {
    console.log('totalProducts');
    return null;
  };

  const totalCart = () => {
    console.log('totalCart');
    return null;
  };

  return {
    removeQuantity,
    getProduct,
    putProduct,
    deleteProduct,
    clearCart,
    isEmpty,
    totalProducts,
    totalCart,
    addProduct,
    removeProduct,
  };
};

export default useCart;
