import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import ProductItem from '../../../components/ProductItem/ProductItem';
import api from '../../../services/api';

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
        {products?.map(({ id, name, price, urlImage }) => (
          <ProductItem
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            image={ urlImage }
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;
