import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Register, Login } from './pages';
import ProductList from './pages/Product/ProductList/ProductList';
import ProductDetail from './pages/Product/ProductDetail/ProductDetail';
import useLocalStorage from './hooks/useLocalStorage';
import Checkout from './pages/Checkout/Checkout';
import OrderDetail from './pages/Order/OrderDetail/OrderDetail';
import OrderList from './pages/Order/OrderList/OrderList';

function App() {
  const navigate = useNavigate();
  const { value } = useLocalStorage('user', '');
  const isLogged = !!value && !!value?.token;

  React.useEffect(() => {
    if (isLogged) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLogged
            ? <Navigate to="/customer/products" />
            : <Navigate to="/login" />
        }
      />
      <Route path="/customer/products" element={ <ProductList /> } />
      <Route path="/customer/products/:id" element={ <ProductDetail /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <OrderList /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetail /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
  );
}

export default App;
