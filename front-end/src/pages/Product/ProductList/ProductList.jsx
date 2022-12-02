import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import ProductItem from '../../../components/ProductItem/ProductItem';
import api from '../../../services/api';
import './ProductList.styles.css';

function ProductList() {
  const [products, setProducts] = React.useState([]);

  const fetchProducts = React.useCallback(async () => {
    api.get('/products').then((response) => {
      setProducts(response.data);
      console.log(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {products?.map(({ id, name, price, url_image }) => (
          <ProductItem
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            image={ url_image }
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;
