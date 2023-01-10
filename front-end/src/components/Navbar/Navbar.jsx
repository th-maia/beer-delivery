import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import './Navbar.css';

function Navbar({
  user,
}) {
  const { value } = useLocalStorage('user', '');
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container_between">
        <div className="left_item_header">
          <img className="logoNavbar" src="https://cdn.discordapp.com/attachments/938669134890278937/1062068447988695141/Logo.png" alt="Logotipo beer delivery" />
          <button
            type="button"
            className="header_button"
            data-testid={ user === 'customer'
              ? 'customer_products__element-navbar-link-products'
              : 'customer_products__element-navbar-link-orders' }
            onClick={ () => {
              const route = user === 'customer'
                ? '/customer/products' : '/seller/orders';
              navigate(route);
            } }
          >
            {user === 'customer' ? 'Produtos' : 'Pedidos'}
          </button>
          {
            user === 'customer'
            && (
              <button
                className="header_button"
                data-testid="customer_products__element-navbar-link-orders"
                type="button"
                onClick={ () => navigate('/customer/orders') }
              >
                Meus pedidos
              </button>)
          }
          <div className="customer_products__item">
            <b data-testid="customer_products__element-navbar-user-full-name">
              {value?.name}
            </b>
          </div>
        </div>
        <button
          data-testid="customer_products__element-navbar-link-logout"
          className="header_sair"
          type="button"
          onClick={ () => {
            localStorage.clear();
            navigate('/');
          } }
        >
          <img src="https://cdn.discordapp.com/attachments/938669134890278937/1062430664856707144/Logout.png " alt="exit" width="20px" />
        </button>
      </div>
      <Outlet />
    </header>
  );
}

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.string,
}.isRequired;
