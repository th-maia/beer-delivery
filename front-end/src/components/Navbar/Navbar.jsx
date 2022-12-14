import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

function Navbar({
  user,
}) {
  const { value } = useLocalStorage('user', '');
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar_top">
        <div className="container_between">
          <div
            className="customer_products__item"
            style={ { flex: 1, justifyContent: 'flex-start' } }
          >
            <button
              type="button"
              data-testid={ user === 'customer'
                ? 'customer_products__element-navbar-link-products'
                : 'customer_products__element-navbar-link-orders' }
              className="
                customer_products__element-navbar-link-products
                customer_products__element-navbar-link-padding
                customer_products__element-name
                "
              style={ {
                backgroundColor: '#2FC18C',
                color: '#001813',
              } }
              onClick={ () => {
                const route = user === 'customer'
                  ? '/customer/products' : '/seller/orders';
                navigate(route);
              } }
            >
              { user === 'customer' ? 'Produtos' : 'Pedidos' }
            </button>

            {
              user === 'customer'
              && (
                <button
                  data-testid="customer_products__element-navbar-link-orders"
                  style={ {
                    backgroundColor: '#036B52',
                    color: '#F2FFFC',
                  } }
                  type="button"
                  onClick={ () => navigate('/customer/orders') }
                >
                  Meus pedidos
                </button>)
            }

          </div>
          <div className="customer_products__item">
            <h3
              data-testid="customer_products__element-navbar-user-full-name"
              style={ {
                backgroundColor: '#421981',
                color: '#F2FFFC',
              } }
            >
              {value?.name}
            </h3>
            <button
              data-testid="customer_products__element-navbar-link-logout"
              className="
                customer_products__element-navbar-link-logout
                customer_products__element-navbar-link-padding
                customer_products__element-name
                "
              style={ {
                backgroundColor: '#056CF9',
                color: '#F2FFFC',
                border: 'none',
                cursor: 'pointer',
              } }
              type="button"
              onClick={ () => {
                localStorage.clear();
                navigate('/');
              } }
            >
              Sair
            </button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;

Navbar.propTypes = {
  user: PropTypes.string,
}.isRequired;
