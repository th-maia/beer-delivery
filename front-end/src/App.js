import React from 'react';
import { Navigate, Route, Routes /* useNavigate */ } from 'react-router-dom';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { Login, Register } from './pages';
import Checkout from './pages/Checkout/Checkout';
import UserList from './pages/Manager/UserList/UserList';
import OrderDetail from './pages/Order/OrderDetail/OrderDetail';
import OrderList from './pages/Order/OrderList/OrderList';
import ProductDetail from './pages/Product/ProductDetail/ProductDetail';
import ProductList from './pages/Product/ProductList/ProductList';

function App() {
  // const navigate = useNavigate();
  const { value } = useLocalStorage('user', '');
  const isLogged = !!value && !!value?.token;

  /* React.useEffect(() => {
    if (isLogged) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []); */

  const appRouter = value?.role === 'administrator'
    ? '/admin/manage'
    : '/customer/products';

  console.log(appRouter);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLogged
            ? <Navigate to={ appRouter } />
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

      <Route path="/admin/manage" element={ <UserList /> } />
    </Routes>
  );
}

export default App;
