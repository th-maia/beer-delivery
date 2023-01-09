import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartButton from '../../../components/CartButton/CartButton';
import Navbar from '../../../components/Navbar/Navbar';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { CartContext } from '../../../context/CartContext';
import api from '../../../services/api';
import './ProductList.css';

function ProductList() {
  const { cart, products, setProducts } = React.useContext(CartContext);

  const navigate = useNavigate();
  // const { value } = useLocalStorage('user', '');
  const isLogged = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    if (!isLogged || !isLogged.token) {
      navigate('/login');
    }
  }, []);

  React.useEffect(() => {
    console.log(cart);
  }, [cart]);

  const fetchProducts = React.useCallback(async () => {
    api.get('/products').then((response) => {
      setProducts(response.data.map((item) => ({ ...item, quantity: 0 })));
    }).catch((error) => {
      console.error(error);
    });
  }, [setProducts]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <Navbar
        user="customer"
      />
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
    </div>
  );
}

export default ProductList;
