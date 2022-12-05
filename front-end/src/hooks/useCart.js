import React from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const { cart, setCart, products, setProducts } = React.useContext(CartContext);
  const cartItems = [...products];

  const addProduct = (productValue) => {
    const index = cartItems?.findIndex((item) => item?.id === productValue.id);
    // if (index >= 0) {
    //   const newProduct = {
    //     ...cartItems[index],
    //     quantity: cartItems[index].quantity + 1,
    //   };
    //   cartItems.splice(index, 1, newProduct);
    //   setCart(cartItems);
    //   setProducts(cartItems);
    // } else {
    //   setCart([...cartItems, {
    //     ...productValue,
    //     quantity: 1,
    //   }]);
    // }
    cartItems[index].quantity += 1;
    setProducts(cartItems);
  };

  const setProduct = (id, value) => {
    const index = cartItems?.findIndex((item) => item?.id === id);
    // if (index >= 0) {
    //   const newProduct = {
    //     ...cartItems[index],
    //     quantity: cartItems[index].quantity + 1,
    //   };
    //   cartItems.splice(index, 1, newProduct);
    //   setCart(cartItems);
    //   setProducts(cartItems);
    // } else {
    //   setCart([...cartItems, {
    //     ...productValue,
    //     quantity: 1,
    //   }]);
    // }
    cartItems[index].quantity = value;
    setProducts(cartItems);
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
  };

  const getProduct = (id) => {
    const index = cart?.findIndex((obj) => obj.id === id);
    return cart[index];
  };

  const getCartTotal = () => {
    let total = 0;

    for (let i = 0; i < cartItems.length; i += 1) {
      total += cartItems[i].price * cartItems[i].quantity;
    }
    return total;
  };

  return { addProduct, getProduct, removeProduct, setProduct, getCartTotal };
};

export default useCart;
