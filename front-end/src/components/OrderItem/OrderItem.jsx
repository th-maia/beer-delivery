import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import removeComma from '../../utils/removeComma';

function OrderItem({
  orderId,
  status,
  date,
  price,
  user,
}) {
  return (
    <Link
      to={
        user === 'customer'
          ? `/customer/orders/${orderId}`
          : `/seller/orders/${orderId}`
      }
    >
      <div>
        <div>
          Pedido
          <span
            data-testid={
              user === 'customer'
                ? `customer_orders__element-order-id-${orderId}`
                : `seller_orders__element-order-id-${orderId}`
            }
          >
            {orderId}
          </span>
        </div>
        <div>
          <span
            data-testid={
              user === 'customer'
                ? `customer_orders__element-delivery-status-${orderId}`
                : `seller_orders__element-delivery-status-${orderId}`
            }
          >
            {status}
          </span>
        </div>
        <div>
          <span
            data-testid={
              user === 'customer'
                ? `customer_orders__element-order-date-${orderId}`
                : `seller_orders__element-order-date-${orderId}`
            }
          >
            {format(new Date(date), 'dd/MM/yyyy')}
          </span>
          <span
            data-testid={
              user === 'customer'
                ? `customer_orders__element-card-price-${orderId}`
                : `seller_orders__element-card-price-${orderId}`
            }
          >
            {removeComma(price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  orderId: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.string,
}.isRequired;
