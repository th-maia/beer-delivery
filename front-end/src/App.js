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
import SellerOrderList from './pages/Seller/SellerOrders/SellerOrderList';
import SellerOrderDetail from './pages/Seller/SellerOrderDetails/SellerOrderDetails';
import routesCheck from './helpers/Routes.helper';

function App() {
  const { value } = useLocalStorage('user', '');
  const isLogged = !!value && !!value?.token;
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      const route = routesCheck(userInfo?.role);
      setRole(route);
    }
  }, []);

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
            ? <Navigate to={ role } />
            : <Navigate to="/login" />
        }
      />
      <Route path="/customer/products" element={ <ProductList /> } />
      <Route path="/customer/products/:id" element={ <ProductDetail /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <OrderList /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetail /> } />
      <Route path="/seller/orders" element={ <SellerOrderList /> } />
      <Route path="/seller/orders/:id" element={ <SellerOrderDetail /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />

      <Route path="/admin/manage" element={ <UserList /> } />
    </Routes>
  );
}

export default App;
