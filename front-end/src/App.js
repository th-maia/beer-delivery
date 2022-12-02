import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ProductList from './pages/Product/ProductList/ProductList';
import ProductDetail from './pages/Product/ProductDetail/ProductDetail';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [value] = useLocalStorage('user', '');
  const isLogged = !!value && !!value?.token;

  return (
    <BrowserRouter>
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
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
