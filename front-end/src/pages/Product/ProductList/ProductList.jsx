import React from 'react';
import CartButton from '../../../components/CartButton/CartButton';
import Navbar from '../../../components/Navbar/Navbar';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { CartContext } from '../../../context/CartContext';
import api from '../../../services/api';

function ProductList() {
  const { cart, products, setProducts } = React.useContext(CartContext);

  React.useEffect(() => {
    console.log(cart);
  }, [cart]);

  const fetchProducts = React.useCallback(async () => {
    api.get('/products').then((response) => {
      setProducts(response.data.map((item) => ({ ...item, quantity: 0 })));
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  React.useEffect(() => {
    console.log(products);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {products?.map(({ id, name, price, quantity, urlImage }) => (
          <ProductItem
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            image={ urlImage }
            quantity={ quantity }
          />
        ))}
        <CartButton />
      </div>
    </>
  );
}

export default ProductList;
